// Функция проверки, готов ли файл для работы с JS
$(document).ready(function () {
	// При наведении мышки на этаж, его номер появляется на счётчике
	let currentFloor = 2; // Переменная, где хранится значение текущего этажа
	let floorPath = $('.home-image path'); // Массив слоёв выделения этажей в файле SVG
	let counterUp = $('.counter-up'); // Кнопка увеличения номера этажа
	let counterDown = $('.counter-down'); // Кнопка уменьшения номера этажа
	let modal = $('.modal'); // Модальное окно
	let modalCloseButton = $('.modal-close-button'); // Кнопка закрытия модального окна
	let viewFlatsButton = $('.view-flats'); // Кнопка "Смотреть квартиры"
	let dataFlats = $('.flats path'); // Все квартиры на плане \ JQuery позволяет обращаться
	let flatLink = $('.flat-link'); // Все квартиры в списке   / сразу ко всем элементам
	let currentFlat; // Сохраняет индекс выбранной на плане квартиры
	let currentLink; // Сохраняет индекс выбранной в списке квартиры
	const flatsLeave = document.querySelectorAll('.flats path'); // Все квартиры на плане
	const listLeave = document.querySelectorAll('.flat-link'); // Все квартиры в списке

	// =====================================================================
	// Убирает выделение квартир в списке, когда указатель мыши покидает план этажа
	flatsLeave.forEach((elem) => {
		elem.addEventListener('mouseleave', () => {
			flatLink.removeClass('flat-link-hover');
		});
	});
	// ---------------------------------------------------------------------

	// =====================================================================
	// Убирает выделение квартир на плане, когда указатель мыши покидает список
	listLeave.forEach((elem) => {
		elem.addEventListener('mouseleave', () => {
			dataFlats.removeClass('flats-hover');
		});
	});
	// ---------------------------------------------------------------------

	// =====================================================================
	// При наведении на плане этажа указателя мыши на квартиру
	// эта же квартира подсвечивается в списке
	dataFlats.on('mouseover', function () {
		// Удаляется класс текущей квартиры (убирается накопление подсветки позиций в списке)
		// При переходе указателя мыши на плане этажа с одной квартиры на другую
		flatLink.removeClass('flat-link-hover');
		// Убирается подсветка на плане этажа, вызванная наведением указателя в списке
		// (когда происходит возврат указателя мыши из списка на план этажа)
		dataFlats.removeClass('flats-hover');
		// Получается номер квартиры и присваивается переменной currentFlat
		currentFlat = $(this).attr('data-flats');
		// Выделяет в списке квартиру, подсвеченную на плане этажа
		$(`[data-link=${currentFlat}]`).toggleClass('flat-link-hover');
	});
	// ---------------------------------------------------------------------

	// =====================================================================
	// При наведение указателя мыши на квартиру в списке квартир этажа
	// эта же квартира подсвечивается на плане этажа
	flatLink.on('mouseover', function () {
		// Удаляется класс текущей квартиры (убирается накопление подсветки квартир
		// на плане этажа) при переходе указателя мыши по списку квартир
		dataFlats.removeClass('flats-hover');
		// Убирается подсветка квартиры в списке, вызванная наведением указателя мыши
		// на плане этажа (когда происходит возврат указателя мыши с плана этажа
		// на список)
		flatLink.removeClass('flat-link-hover');
		// Получается номер квартиры и присваивается переменной currentLink
		currentLink = $(this).attr('data-link');
		// Выделяет на плане этажа квартиру, подсвеченную  в списке
		$(`[data-flats=${currentLink}]`).toggleClass('flats-hover');
	});
	// ---------------------------------------------------------------------

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
			floorPath.removeClass('current-floor'); // Убираем подсветку =старого= этажа
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
			floorPath.removeClass('current-floor'); // Убираем подсветку =старого= этажа
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
