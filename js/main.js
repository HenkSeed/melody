// Функция проверки, готов ли файл для работы с JS
$(document).ready(function () {
	// При наведении мышки на этаж, его номер появляется на счётчике
	let currentFloor = 2; // Переменная, где хранится значение текущего этажа
	let floorPath = $('.home-image path'); // Каждый отдельный этаж в SVG
	let counterUp = $('.counter-up'); // Кнопка увеличения номера этажа
	let counterDown = $('.counter-down'); // Кнопка уменьшения номера этажа
	let modal = $('.modal');
	let modalCloseButton = $('.modal-close-button');
	let viewFlatsButton = $('.view-flats');

	// Функция открытия/закрытия модального окна через константу
	// const toggleModal = function () {
	// 	modal.toggleClass('is-open');
	// };

	// Открытие модального окна при нажатии на этаж
	floorPath.on('click', toggleModal);

	// Открытие модального окна при нажатии на Кнопку "Смотреть квартиры на этаже"
	viewFlatsButton.on('click', toggleModal);

	// Закрытие модального окна при нажатии на крестик модального окна
	modalCloseButton.on('click', toggleModal);

	// Функция наведения мыши на этаж (подсветка)
	floorPath.on('mouseover', function () {
		floorPath.removeClass('current-floor'); // Удаляем активный класс у этажа
		currentFloor = $(this).attr('data-floor'); // Получаем значение текущего этажа
		$('.counter').text(currentFloor); // Записываем значение этажа в счётчик
	});
	// ---------------------------------------------------------
	// Обработка нажатия стрелки "ВВЕРХ" - смена номера этажа на счётчике
	counterUp.on('click', function () {
		if (currentFloor < 18) {
			currentFloor++;
			// Форматируем номер этажа, делая его всегда из двух цифр
			usCurrentFloor = currentFloor.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGroupping: false,
			});
			$('.counter').text(usCurrentFloor); // Записываем номер этажа в счётчик
			floorPath.removeClass('current-floor');
			// Подсвечиваем текущий этаж при нажатии кнопки "ВВЕРХ"
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor');
		}
	});
	// -----------------------------------------------------------------

	// Обработка нажатия стрелки "ВНИЗ" - смена номера этажа на счётчике
	counterDown.on('click', function () {
		if (currentFloor > 2) {
			currentFloor--;
			usCurrentFloor = currentFloor.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGroupping: false,
			});
			$('.counter').text(usCurrentFloor);
			floorPath.removeClass('current-floor');
			// Подсвечиваем текущий этаж при нажатии кнопки "ВНИЗ"
			$(`[data-floor=${usCurrentFloor}]`).toggleClass('current-floor');
		}
	});
	// -----------------------------------------------------------------

	// Функция открытия/закрытия модального окна
	function toggleModal() {
		modal.toggleClass('is-open');
	}
});
