let comments = [];

loadComments();
showNumberComments();

let myText = document.getElementById("message");
let result = document.getElementById("numberOfLetter");
let warning = document.getElementById("warning");
let btn = document.getElementById("comment-add");
// устанавливаем ограничение
let limit = 1000;

// проверяем как выглядят подсчитанные символы в поле ввода
result.textContent = "Макс. 1000 символов";

// устанавливаем само условие
myText.addEventListener("input", function () {
  let textLength = myText.value.length;
  result.textContent = textLength + "/" + limit;
  if (textLength > limit) {
    result.style.color = "red";
    result.style.opacity = "1";
    warning.textContent = "Слишком длинное сообщение";
    btn.setAttribute("disabled", "");
  } else {
    warning.textContent = "";
    result.style.color = "black";
    result.style.opacity = "0.4";
    btn.removeAttribute("disabled");
  }

  if (!textLength) {
    result.textContent = "Макс. 1000 символов";
    result.style.color = "black";
    result.style.opacity = "0.4";
    btn.style.background = "#A2A2A2";
  } else {
    result.textContent = textLength + "/" + limit;
    btn.style.background = "#ABD873";
  }
});

document.getElementById("comment-add").onclick = function () {
  // произошла бедулина, после нажатия на кнопку с типом submit, данные отправляются на сервер, а форма
  // по умолчанию очищается, чтобы этого избежать херачим вот такой метод preventDefault
  // Метод preventDefault () интерфейса Event отменяет событие, если оно отменяемое,
  // без дальнейшего распространения.
  event.preventDefault();
  // вытаскиваем имя пользователя, получаем весь объект, а не его содержимое
  let commentName = document.getElementById("name");

  // вытаскиваем комментарий, получаем весь объект, а не его содержимое
  let commentBody = document.getElementById("message");

  // вытаскиваем значения из объекта с именем пользователя и объекта с комментариями
  // создаем новую переменную comment - объект и вытаскиваем значения и время
  let comment = {
    // берем переменную commentName и читаем, что вложено внутрь input этого элемента формы
    name: commentName.value,

    // берем переменную commentBody и читаем, что вложено внутрь input этого элемента формы
    body: commentBody.value,

    // устанавливаем время коммента Date.now в милисекундах, переводим в секунды /1000 и округляем Math.floor
    time: Math.floor(Date.now() / 1000),
  };

  // очищаем форму
  commentName.value = "";
  commentBody.value = "";

  // элемент comment (с именем пользователя, комментом и временем) добавляем в массив comments
  comments.push(comment);
  // массив comments сохраняем в localstorage
  saveComments();
  // показываем все элементы массива comments в форме HTML в поле comment-field
  showComments();
  showNumberComments();
};

// смотрим какой параметр для сортировки выбран
let someSelect;
let select = document.querySelector("select");
select.addEventListener("change", () => {
  someSelect = select.value;
  arraySorting();
});

// функция для реализации самой сортировки и вывода сообщений

function arraySorting() {
  switch (someSelect) {
    case "date":
      comments.sort((a, b) => -(a.time - b.time));
      console.log(comments);
      break;
    case "grade":
      console.log("Apples are $0.32 a pound.");
      break;
    case "relevance":
      console.log("Bananas are $0.48 a pound.");
      break;
    case "answer":
      console.log("Cherries are $3.00 a pound.");
      break;
  }
}

// функция сохранения массива с комментариями в localstorage
function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

// функция загрузки массива с комментариями из localstorage
function loadComments() {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  showComments();
}

// функция для отображения комментариев (каждого элемента массива comments)
function showComments() {
  let commentField = document.getElementById("comment-field");
  let out = "";
  comments.forEach(function (item) {
    out += `<div class="nameDate"> <span class="nameText">${
      item.name
    }</span> <span class="dateText">${timeConverter(item.time)}</span></div>`;
    // out += `<p class="nameText">${item.name}</p> <p class="dateText">${timeConverter(item.time)}</p>`;
    out += `<p class="messageText">${item.body}</p> `;
    // out += `<div class="grade"><button class="btnMinus"></button></div>`
  });
  commentField.innerHTML = out;
}

// функция для отображения количества комментов
function showNumberComments() {
  let numberComments = document.getElementById("numberOfComments");
  let numberofcom = `<p class="numOfCom"> Комментарии <span class="numSpan">(${comments.length})</span></p>`;
  numberComments.innerHTML = numberofcom;
}

// функция для перевода времени из секунд в номальный формат
function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
