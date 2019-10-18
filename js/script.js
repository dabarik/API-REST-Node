$(document).ready(function () {
    function refresh() {
        $.ajax({
            url: "http://localhost:8080/getprojets",
            success: function (results) {
                var divTasks = document.getElementsByClassName('tasks')[0];
                divTasks.innerHTML = '';
                results.projets.forEach(element => {
                    var id = element.id;
                    var name = element.name.charAt(0).toUpperCase() + element.name.slice(1);
                    var description = element.description.charAt(0).toUpperCase() + element.description.slice(1)

                    var h6 = document.createElement('h6');
                    h6.classList.add('mb-2')
                    h6.classList.add('mt-3')
                    h6.innerHTML = '<h1>' + name + '</h1>';
                    divTasks.appendChild(h6);

                    var div = document.createElement('div');
                    div.textContent = description;
                    divTasks.appendChild(div);

                    var a = document.createElement('a');
                    a.classList = 'text-danger mb-3';
                    a.innerText = 'Supprimer';
                    a.addEventListener('click', function () {
                        $.ajax({
                            url: "http://localhost:8080/deleteProjet/" + id,
                            success: function (results) {
                                refresh();
                            }
                        });
                    })
                    divTasks.appendChild(a);
                });
            }
        });
    }

    refresh();

    $("#sendTask").click(function () {
        var name = $("#name").val();
        var description = $("#description").val();
        $.ajax({
            url: "http://localhost:8080/createProjet/" + name + "/" + description,
            success: function (results) {
                refresh();
            }
        });
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
    })


});