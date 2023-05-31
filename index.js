let comments = [];

loadComments();

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

function saveComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem("comments"))
    comments = JSON.parse(localStorage.getItem("comments"));
  showComments();
}

function showComments() {
  let commentField = document.getElementById("comment-field");
  let out = "";
  comments.forEach(function (item) {
    out += `<p class="text-right small"><em>${timeConverter(
      item.time
    )}</em></p> `;
    out += `<p class="alert alert-primary">${item.name}</p> `;
    out += `<p class="alert alert-success">${item.body}</p> `;
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
