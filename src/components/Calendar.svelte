<script lang="ts">
	const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const getFebruaryDays = (year: number) => {
		if (year % 4 === 0) {
			return 29;
		}
		return 28;
	};

	const monthDays = [
		31,
		getFebruaryDays(new Date().getFullYear()),
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];

	function createArrayBySpecificLength(length: number, fillWithZero?: boolean) {
		return new Array(length).fill(null).map((_, i) => (fillWithZero ? 0 : i + 1));
	}

	function generateMonthNumberDays(month: number) {
		const year = new Date().getFullYear();

		const firstDayNumber = new Date(year, month, 1).getDay();

		const aux = createArrayBySpecificLength(firstDayNumber, true);
		const monthDaysList = createArrayBySpecificLength(monthDays[2]);

		console.log('aux', aux);
		console.log('monthDays', monthDaysList);

		return [].concat(aux, monthDaysList);
	}
</script>

<main>
	<div class="days">
		<div class="name-days">
			{#each weekDays as wDay}
				<span class:cursor-pointer={true} class:hover={true}>
					{`${wDay}`.slice(0, 2)}
				</span>
			{/each}
		</div>
		<div class="number-days">
			{#each generateMonthNumberDays(2) as mDay}
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
		}
	}

	.cursor-pointer {
		cursor: pointer;
	}

	.hover:hover {
		background: var(--input-hover);
		color: var(--clr-gray100);
	}
</style>
