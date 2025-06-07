<script>
	import Display from './components/Display.svelte'
	import Keyboard from './components/Keyboard.svelte'

	let name = ""
</script>

<Display bind:display={name}  />
<Keyboard bind:display={name}/>


<style>
	
	
</style>