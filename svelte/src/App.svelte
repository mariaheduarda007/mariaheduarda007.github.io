<script>
	import Display from './components/Display.svelte'
	import Keyboard from './components/Keyboard.svelte'

	let name = "0"
</script>

<Display display={name}  />
<Keyboard bind:display={name}/>


<style>
	
	
</style>