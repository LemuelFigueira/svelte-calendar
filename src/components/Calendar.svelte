<script lang="ts">
	import BiRightArrow from 'svelte-icons-pack/bi/BiRightArrow';
	import BiLeftArrow from 'svelte-icons-pack/bi/BiLeftArrow';

	import Icon from 'svelte-icons-pack/Icon.svelte';

	import {
		changePicker,
		decreaseYear,
		increaseYear,
		monthNames,
		monthDaysAsNumber,
		weekDays,
		whichPicker,
		year,
		selectMonth,
		getMonthNumberByName,
		monthName
	} from '../stores/calendar';
	import { t } from '../i18n';
</script>

<main>
	{#if $whichPicker === 'days'}
		<div class="date-picker">
			<div class="header">
				<button
					class:hover={true}
					class:cursor-pointer={true}
					class="month"
					on:click={changePicker}
				>
					<span>
						{$t($monthName)}
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
							{`${$t(wDay)}`.slice(0, 3)}
						</span>
					{/each}
				</div>
				<div class="number-days">
					{#each $monthDaysAsNumber as mDay}
						<span class:cursor-pointer={mDay > 0} class:hover={mDay > 0}>
							{mDay > 0 ? mDay : ''}
						</span>
					{/each}
				</div>
			</div>
		</div>
	{:else if $whichPicker === 'month'}
		<div class="month-picker">
			{#each monthNames as monthName}
				<button
					class:hover={true}
					class:cursor-pointer={true}
					class="month"
					on:click={() => selectMonth(getMonthNumberByName(monthName))}
				>
					<span>
						{$t(monthName)}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		align-items: center;
		justify-content: center;

		color: var(--clr-font);

		box-shadow: var(--lm-shadow-active);
		padding: 0.5rem 1rem;

		border: 0.5px var(--clr-primary);
		border-top: 0;

		border-style: outset;

		border-radius: var(--br);
	}

	.days {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;

		gap: 1rem;

		& span {
			border-radius: var(--br);
		}
	}

	.number-days {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(7, auto);

		& span {
			text-align: center;
		}
	}

	.name-days {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(7, auto);

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

	.month-picker {
		display: grid;

		grid-template-columns: repeat(3, auto);

		overflow: hidden;

		button {
			width: 100%;

			border-radius: var(--br);

			padding: 0.5rem;

			& span {
				font-size: medium;
				font-weight: 700;
			}
		}
	}
</style>
