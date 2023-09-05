<script>
import { ConicGradient } from '@skeletonlabs/skeleton';

const conicStops = [
	{ color: 'transparent', start: 0, end: 25 },
	{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
];
</script>

<div class="my-24 m-auto flex justify-center">
  <ConicGradient stops={conicStops} spin ></ConicGradient>
</div>