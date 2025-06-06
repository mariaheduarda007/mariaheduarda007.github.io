<script>
	import Display from './components/Display.svelte'
	import Keyboard from './components/Keyboard.svelte'

	let name = ""
</script>

<Display bind:value={name}  />
<Keyboard bind:value={name}/>


<style>
	
	
</style>