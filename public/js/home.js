const email = '<%=Session["email"]%>'
const datasheet = document.getElementById("datasheet");
let accounts = [];
let operation_type_list = [];
let pie_labels = [];
let pie_colors = [];

const fake_data = [
    { year: "2010-04-01", count: -10 },
    { year: "2011-05-01", count: 0 },
    { year: "2012-06-01", count: 1 },
    { year: "2013-07-01", count: -2 },
    { year: "2014-08-01", count: 3 },
    { year: "2015-09-01", count: 4 },
    { year: "2016-10-01", count: 10 },
];

window.addEventListener('resize', () => {
    budget_chart.resize();
    savings_chart.resize();
});

let savings_chart = new Chart(
    document.getElementById('overview-savings-account'),
    {
        type: 'line',
        data: {
            labels: fake_data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: fake_data.map(row => row.count),
                    fill: "start",
                    hoverOffset: 4,
                    pointStyle: false,
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    ticks: {
                        color: function (context) {
                            return context.tick.value > Date.now() ? 'darkgrey' : 'dark';
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
            animation: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolution of: Example Account',
                    position: 'top'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return " " + (context.parsed.y).toFixed(2) + " €";
                        },
                        title: function (context) {
                            return new Date(context[0].parsed.x).toLocaleDateString("fr-FR");
                        }
                    },
                }
            }
        }
    }
);

let budget_chart = new Chart(
    document.getElementById('overview-monthly-budget'),
    {
        type: 'pie',
        options: {
            animation: {
                animateRotate: true,
                animateScale: true
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                },
                tooltip: {
                    callbacks: {
                        label: function (value) {
                            return " " + (value.parsed).toFixed(2) + " €";
                        }
                    },
                },
            }
        },
        data: {}
    }
);

onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;

            if (JSON.parse(accounts).length == 0) {
                new_popup("There is no account yet", "info");
                return;
            }

            fill_dataset();
            set_log_charts();
            set_pie_chart();
        }
        else {
            new_popup("Error getting accounts", "error");
        }
    };
    xhr.send();

    set_operation_type_list();
}

function set_operation_type_list() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operation_type_list.php", false);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operation_type_list = JSON.parse(xhr.responseText);

            pie_labels = ["Remains"];
            pie_colors = ["#36a2eb"];
            for (let i = 0; i < 9; i++) {
                pie_labels[i + 1] = operation_type_list[i].title;
                pie_colors[i + 1] = operation_type_list[i].chart_color;
            }
        }
        else {
            new_popup("Error getting operation type list", "error");
        }
    };
    xhr.send();
}

function fill_dataset() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_operations_by_accounts.php?accounts=" + accounts + "&limit=" + 14, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);
            nb_operations = operations.length;

            for (let i = 0; i < nb_operations; i++) {
                if (operations[i].regularity > 0) {
                    datasheet.children[nb_operations - i - 1].style.color = "grey";
                    datasheet.children[nb_operations - i - 1].style.fontStyle = "italic";
                }
                else if (operations[i].amount > 0) {
                    datasheet.children[nb_operations - i - 1].children[2].style.color = "green";
                }
                datasheet.children[nb_operations - i - 1].children[0].innerHTML = operations[i].date;
                datasheet.children[nb_operations - i - 1].children[1].innerHTML = operations[i].label;
                datasheet.children[nb_operations - i - 1].children[2].innerHTML = (operations[i].amount > 0 ? "+" : "") + operations[i].amount.toFixed(2) + " €";
                datasheet.children[nb_operations - i - 1].children[3].innerHTML = operation_type_list[operations[i].category].title;
            }
        }
        else {
            new_popup("Error getting operations", "error");
        }
    }
    xhr.send();
}

function set_log_charts() {

    // get account with highest balance
    let highest_account = JSON.parse(accounts).reduce((prev, current) => (prev.sold > current.sold) ? prev : current);

    let start = new Date();
    let end = new Date(start);

    start.setFullYear(start.getFullYear() - 2);
    let start_str = start.toISOString().split('T')[0];

    end.setFullYear(end.getFullYear() + 1);
    let end_str = end.toISOString().split('T')[0];

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${highest_account.id_account}&start=${start_str}&end=${end_str}]`, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);

            // Security if there is no operation at the start of the chart
            let xhr2 = new XMLHttpRequest();
            xhr2.open("GET", `/database/api/get_amount_at_date.php?id_account=${highest_account.id_account}&date=${start_str}]`, false);
            xhr2.onload = () => {
                if (xhr2.status == 200) {
                    operations.unshift({ ["date"]: start_str, ["new_sold"]: parseInt(xhr2.responseText) });
                }
                else {
                    new_popup("Error getting operations", "error");
                }
            };
            xhr2.send();

            let data = {
                labels: operations.map(operation => operation.date),
                datasets: [
                    {
                        stepped: true,
                        data: operations.map(operation => ({ ["x"]: operation.date, ["y"]: operation.new_sold })),
                        fill: "start",
                        pointStyle: false,
                        borderWidth: 2,
                        pointHoverRadius: 15
                    }
                ]
            };

            savings_chart.data = data;
            data.datasets[0].data.push({ ["x"]: end, ["y"]: operations[operations.length - 1].new_sold });

            savings_chart.options.plugins.title = {
                display: true,
                text: `Evolution of: ${highest_account.label}`,
                position: 'top'
            };

            savings_chart.update();
            savings_chart.resize();
        }
        else {
            new_popup("Error getting operations", "error");
        }
    };
    xhr.send();
}

function set_pie_chart() {
    // get accounts type 0
    let checking_accounts = [];
    for (let i = 0; i < JSON.parse(accounts).length; i++) {
        if (JSON.parse(accounts)[i].type == 0) {
            checking_accounts.push(JSON.parse(accounts)[i]);
        }
    }
    const random_checking_account = checking_accounts[Math.floor(Math.random() * checking_accounts.length)];

    let start = new Date();
    start.setDate(1);
    start = start.toISOString().split('T')[0];

    let end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    end.setDate(end.getDate() - 1);
    end = end.toISOString().split('T')[0];

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${random_checking_account.id_account}&start=${start}&end=${end}]`, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);
            if (operations.length == 0) {
                operations.push({ ["amount"]: 0.01, ["category"]: 5 });
            }

            // sum of all operations this month
            let income = operations.reduce((acc, operation) => (operation.amount > 0) ? acc + operation.amount : acc, 0);
            let expenses = operations.reduce((acc, operation) => (operation.amount < 0) ? acc + operation.amount : acc, 0);
            let remains = income + expenses;

            // sum of all operations by category in array of object
            let sum_per_categories = [];
            sum_per_categories[0] = { ["type"]: -1, ["amount"]: (remains > 0) ? remains : 0 };
            for (let i = 0; i < 9; i++) {
                sum_per_categories[i + 1] = { ["type"]: i, ["amount"]: operations.reduce((acc, operation) => (operation.category == i && operation.amount < 0) ? acc - operation.amount : acc, 0) };
            }

            // Update chart data
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

            budget_chart.options.plugins.title = {
                display: true,
                text: `Monthly budget of: ${random_checking_account.label}`,
                position: 'left'
            };

            budget_chart.data = data;
            budget_chart.update();
        }
        else {
            new_popup("Error getting operations", "error");
        }
    };
    xhr.send();
}