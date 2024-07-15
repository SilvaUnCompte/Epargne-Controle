const email = '<%=Session["email"]%>'
const account_list = document.getElementById("selected-account");
const analytics_start = document.getElementById("analytics-start");
const analytics_end = document.getElementById("analytics-end");
const categories_chart_container = document.getElementById('categories-account-chart');
let selected_account;
let operations = [];
let accounts = [];
let pie_labels = [];
let pie_colors = [];
let categories_chart;
let log_chart;

window.addEventListener('resize', () => {
    console.log("resize");
    log_chart.resize();
    categories_chart.resize();
});

function set_operation_type_list() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operation_type_list.php", false);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operation_type_list = JSON.parse(xhr.responseText);

            for (let i = 0; i < 9; i++) {
                pie_labels[i] = operation_type_list[i].title;
                pie_colors[i] = operation_type_list[i].chart_color;
            }
        }
        else {
            new_popup("Error getting operation type list", "error");
        }
    };
    xhr.send();
}

onload = () => {
    fill_account_list();
    set_operation_type_list();

    log_chart = new Chart(
        document.getElementById('log-account-chart'),
        {
            type: 'line',
            options: {
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    x: {
                        type: 'time',
                        ticks: {
                            color: function (context) {
                                return context.tick.value > Date.now() ? 'darkgrey' : 'dark';
                            },
                            callback: function (value) {
                                return new Date(value).toLocaleDateString("fr-FR");
                            }
                        }
                    },
                    y: {
                        ticks: {
                            color: function (context) {
                                return context.tick.value >= 0 ? 'green' : 'red';
                            },
                            callback: function (value) {
                                return value + " €";
                            }
                        }
                    }
                },
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ": " + (context.parsed.y).toFixed(2) + " €";
                            },
                            title: function (context) {
                                return new Date(context[0].parsed.x).toLocaleDateString("fr-FR");
                            }
                        },
                    }
                }
            }
        });

    categories_chart = new Chart(
        categories_chart_container,
        {
            type: 'pie',
            options: {
                animation: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (value) {
                                return " " + value.parsed.toFixed(2) + " €";
                            }
                        },
                    },
                    title: {
                        display: true,
                        text: 'Expenses by category'
                    },
                }
            },
        }
    );

    account_list.addEventListener("change", selected_account_change);
    analytics_start.addEventListener("change", get_operations);
    analytics_end.addEventListener("change", get_operations);
}

function fill_account_list() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;
            accounts_list = JSON.parse(xhr.responseText);

            if (accounts_list.length == 0) {
                new_popup("There is no account yet", "info");
                document.getElementById("analytics-form").disabled = true;
                return;
            }

            accounts_list.forEach(account => {
                account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
            });
        }
        else {
            new_popup("Error getting accounts", "error");
        }
    };
    xhr.send();
}

function selected_account_change() {
    if (account_list.value > 0) {
        analytics_start.disabled = false;
        analytics_end.disabled = false;

        selected_account = accounts_list.find(account => account.id_account == account_list.value);
        today = new Date();

        if (selected_account.type == 0) {
            analytics_start.valueAsDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            analytics_end.valueAsDate = today;
        }
        else {
            analytics_start.valueAsDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
            analytics_end.valueAsDate = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate());
        }

        get_operations();
    }
    else {
        analytics_start.disabled = true;
        analytics_end.disabled = true;
        log_chart.data = {};
        log_chart.update();
        categories_chart.data = {};
        categories_chart.update();
    }
}

function get_operations() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${selected_account.id_account}&start=${analytics_start.value}&end=${analytics_end.value}]`, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);

            // Security if there is no operation at the start of the chart
            let xhr2 = new XMLHttpRequest();
            xhr2.open("GET", `/database/api/get_amount_at_date.php?id_account=${account_list.value}&date=${analytics_start.value}]`, false);
            xhr2.onload = () => {
                if (xhr2.status == 200) {
                    operations.unshift({ ["date"]: analytics_start.value, ["new_sold"]: parseInt(xhr2.responseText) });
                }
                else {
                    new_popup("Error getting operations", "error");
                }
            };
            xhr2.send();

            selected_account.type ? update_saving_chart() : update_checking_chart();
        }
        else {
            new_popup("Error getting operations", "error");
        }
    };
    xhr.send();
}

function update_checking_chart() {
    update_saving_chart()
    categories_chart_container.parentNode.style.display = "block";

    let sum_per_categories = [];
    for (let i = 0; i < 9; i++) {
        sum_per_categories[i] = { ["type"]: i, ["amount"]: operations.reduce((acc, operation) => (operation.category == i && operation.amount < 0) ? acc + operation.amount : acc, 0) };
    }

    let data = {
        labels: pie_labels,
        datasets: [
            {
                data: sum_per_categories.map(categorie => categorie.amount),
                backgroundColor: pie_colors,
                hoverOffset: 4
            }
        ]
    };

    categories_chart.data = data;
    categories_chart.update();
    categories_chart.resize();
}

function update_saving_chart() {
    categories_chart_container.parentNode.style.display = "none";

    let data = {
        labels: operations.map(operation => operation.date),
        datasets: [
            {
                stepped: true,
                label: selected_account.label,
                data: operations.map(operation => ({ ["x"]: operation.date, ["y"]: operation.new_sold })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: "start",
                pointStyle: false,
                borderWidth: 2,
                pointHoverRadius: 15
            }
        ]
    };

    log_chart.data = data;
    data.datasets[0].data.push({ ["x"]: analytics_end.value, ["y"]: operations[operations.length - 1].new_sold });

    log_chart.update();
    log_chart.resize();
}