const { createApp, ref, reactive, computed, onMounted } = Vue;

createApp({
	setup() {
		const view = ref('list');
		const workouts = ref([]);
		const history = ref([]);
		const showLibrary = ref(false);
		const libraryFilter = ref('all');
		const library = ref([
			{ id: 'l1', category: 'strength', name: 'Приседания', desc: 'Ноги' },
			{ id: 'l2', category: 'strength', name: 'Жим лежа', desc: 'Грудь' },
			{ id: 'l3', category: 'cardio', name: 'Скакалка', desc: 'Кардио' },
		]);
		const filteredLibrary = computed(() => libraryFilter.value==='all' ? library.value : library.value.filter(e=>e.category===libraryFilter.value));

		const uuid = () => (window.crypto && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(16).slice(2)}`);
		const emptyEx = () => ({ uid: uuid(), name: '', sets: 3, reps: 10, weight: 0, rest: 60 });
		const form = reactive({ id: null, name: '', description: '', exercises: [emptyEx()] });

		const currentWorkout = ref(null);
		const currentExerciseIndex = ref(0);
		const completedSets = ref(0);
		const isRunning = ref(false);
		const seconds = ref(0);
		let timerId = null;

		const currentExercise = computed(() => currentWorkout.value?.exercises[currentExerciseIndex.value] || null);
		const currentProgress = computed(() => { const t=currentExercise.value?.sets||0; return t? Math.min(100, Math.round(completedSets.value/t*100)) : 0; });
		const formattedTime = computed(()=>`${String(Math.floor(seconds.value/60)).padStart(2,'0')}:${String(seconds.value%60).padStart(2,'0')}`);
		const stats = reactive({ totalWorkouts: 0, totalMinutes: 0, favoriteExercise: '', lastWorkout: '' });

		function saveToStorage(){ localStorage.setItem('workouts', JSON.stringify(workouts.value)); localStorage.setItem('history', JSON.stringify(history.value)); }
		function loadFromStorage(){ try{ workouts.value=JSON.parse(localStorage.getItem('workouts')||'[]')||[]; history.value=JSON.parse(localStorage.getItem('history')||'[]')||[]; }catch{ workouts.value=[]; history.value=[]; } }
		function computeStats(){ stats.totalWorkouts=history.value.length; stats.totalMinutes=Math.round(history.value.reduce((s,x)=>s+x.duration,0)/60); stats.lastWorkout=history.value[0]?.name||''; const f={}; workouts.value.forEach(w=>w.exercises.forEach(e=>f[e.name]=(f[e.name]||0)+1)); stats.favoriteExercise=Object.entries(f).sort((a,b)=>b[1]-a[1])[0]?.[0]||''; }

		function openNewWorkout(){ resetForm(); view.value='form'; }
		function openStats(){ computeStats(); view.value='stats'; }
		function closeStats(){ view.value='list'; }
		function closeForm(){ view.value='list'; }

		function addExercise(){ form.exercises.push(emptyEx()); }
		function addExerciseFromLibrary(item){ form.exercises.push({ ...emptyEx(), name:item.name }); showLibrary.value=false; }
		function removeExercise(i){ form.exercises.splice(i,1); }
		function resetForm(){ form.id=null; form.name=''; form.description=''; form.exercises=[emptyEx()]; }
		function saveWorkout(){ if(!form.name.trim()) return alert('Введите название'); const ex=form.exercises.filter(e=>e.name.trim()); if(!ex.length) return alert('Добавьте упражнение'); const w={ id:form.id||uuid(), name:form.name.trim(), description:form.description.trim(), exercises:ex.map(e=>({...e,uid:uuid()})), totalMinutes:Math.round(ex.reduce((s,e)=>s+(e.sets*(e.rest||0))/60,0)) }; if(form.id){ const i=workouts.value.findIndex(x=>x.id===form.id); if(i!=-1) workouts.value[i]=w; } else workouts.value.unshift(w); saveToStorage(); view.value='list'; }
		function editWorkout(i){ const w=workouts.value[i]; if(!w) return; form.id=w.id; form.name=w.name; form.description=w.description||''; form.exercises=w.exercises.map(e=>({...e, uid:e.uid||uuid()})); view.value='form'; }
		function deleteWorkout(i){ if(confirm('Удалить тренировку?')){ workouts.value.splice(i,1); saveToStorage(); } }

		function startWorkout(i){ const w=workouts.value[i]; if(!w) return; currentWorkout.value=JSON.parse(JSON.stringify(w)); currentExerciseIndex.value=0; completedSets.value=0; seconds.value=0; isRunning.value=false; view.value='active'; }
		function selectExercise(i){ currentExerciseIndex.value=i; completedSets.value=0; }
		function completeSet(i){ if(i!==currentExerciseIndex.value) selectExercise(i); if(!currentExercise.value) return; if(completedSets.value < (currentExercise.value.sets||0)) completedSets.value++; if(completedSets.value >= (currentExercise.value.sets||0)){ if(currentExerciseIndex.value < (currentWorkout.value.exercises.length-1)){ currentExerciseIndex.value++; completedSets.value=0; } else endWorkout(); } }
		function startTimer(){ if(isRunning.value) return; isRunning.value=true; timerId=setInterval(()=>seconds.value++,1000); }
		function pauseTimer(){ isRunning.value=false; if(timerId) clearInterval(timerId); timerId=null; }
		function resetTimer(){ pauseTimer(); seconds.value=0; }
		function endWorkout(){ pauseTimer(); if(currentWorkout.value){ history.value.unshift({ id:uuid(), name:currentWorkout.value.name, date:Date.now(), duration:seconds.value }); saveToStorage(); } currentWorkout.value=null; view.value='list'; }

		onMounted(()=>{
			loadFromStorage();
			workouts.value = workouts.value.map(w=>({ ...w, id:w.id||uuid(), exercises:(w.exercises||[]).map(e=>({ ...e, uid:e.uid||uuid() })) }));
			saveToStorage();
		});
		return { view, workouts, form, history, stats, showLibrary, libraryFilter, filteredLibrary, currentWorkout, currentExercise, currentExerciseIndex, completedSets, isRunning, seconds, formattedTime, currentProgress, openNewWorkout, openStats, closeStats, closeForm, addExercise, addExerciseFromLibrary, removeExercise, saveWorkout, editWorkout, deleteWorkout, startWorkout, selectExercise, completeSet, startTimer, pauseTimer, resetTimer, endWorkout };
	}
}).mount('#app');
