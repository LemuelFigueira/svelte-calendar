<script lang="ts">
	import BiRightArrow from 'svelte-icons-pack/bi/BiRightArrow';
	import BiLeftArrow from 'svelte-icons-pack/bi/BiLeftArrow';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import {
		month,
		monthDays,
		monthNames,
		monthNumberDays,
		weekDays,
		year
	} from '../stores/calendar';

	function createArrayBySpecificLength(length: number, fillWithZero?: boolean) {
		return new Array(length).fill(null).map((_, i) => (fillWithZero ? 0 : i + 1));
	}

	function generateMonthNumberDays(month: number) {
		const year = new Date().getFullYear();

		const firstDayNumber = new Date(year, month, 1).getDay();

		const aux = createArrayBySpecificLength(firstDayNumber, true);
		const monthDaysList = createArrayBySpecificLength(monthDays[month]);

		return [].concat(aux, monthDaysList);
	}

	function increaseYear() {
		year.update((y) => y + 1);
	}

	function decreaseYear() {
		year.update((y) => y - 1);
	}
</script>

<main>
	<div class="header">
		<button class:hover={true} class:cursor-pointer={true} class="month">
			<span>
				{monthNames[$month]}
			</span>
		</button>
		<div class="year-selector">
			<button
				class:cursor-pointer={true}
				class:hover={true}
				class="decrease"
				on:click={decreaseYear}
			>
				<Icon className="icon" src={BiLeftArrow} />
			</button>
			<span class="value">
				{$year}
			</span>
			<button
				class:cursor-pointer={true}
				class:hover={true}
				class="increase"
				on:click={increaseYear}
			>
				<Icon className="icon" src={BiRightArrow} />
			</button>
		</div>
	</div>
	<div class="days">
		<div class="name-days">
			{#each weekDays as wDay}
				<span>
					{`${wDay}`.slice(0, 2)}
				</span>
			{/each}
		</div>
		<div class="number-days">
			{#each $monthNumberDays as mDay}
				<span class:cursor-pointer={mDay > 0} class:hover={mDay > 0}>
					{mDay > 0 ? mDay : ''}
				</span>
			{/each}
		</div>
	</div>
</main>

<style lang="scss">
	main {
		max-width: 300px;

		color: var(--clr-font);

		box-shadow: var(--lm-shadow-active);
		padding: 0.5rem 1rem;
	}

	.days {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		gap: 1rem;

		& span {
			border-radius: var(--br);
		}
	}

	.number-days {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(7, 2rem);

		& span {
			text-align: center;
		}
	}

	.name-days {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(7, 2rem);

		& span {
			text-align: center;
			user-select: none;
		}
	}

	.cursor-pointer {
		cursor: pointer;
	}

	.hover:hover {
		background: var(--input-hover);
		color: var(--clr-gray100);

		:global svg {
			fill: var(--clr-gray100) !important;
		}
	}

	.header {
		display: flex;
		justify-content: space-between;

		gap: 1rem;

		padding: 0.5rem;

		width: 100%;

		.month {
			font-size: large;
			font-weight: bold;

			text-align: center;

			backdrop-filter: brightness(0.9);
			border-radius: var(--br);

			padding: 0 1rem;
		}

		.year-selector {
			display: flex;
			justify-content: space-between;
			align-items: center;

			gap: 1rem;

			.value {
				font-size: large;

				text-align: center;
			}

			button {
				display: flex;
				align-items: center;

				border-radius: var(--br);
				padding: 0.3rem;
			}

			:global .icon {
				width: 0.8rem;
				aspect-ratio: 1;

				fill: var(--clr-font);
			}
		}
	}
</style>
