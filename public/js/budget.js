const email = '<%=Session["email"]%>'

const checking_account_list = document.getElementById("selected-checking-account");
const savings_account_list = document.getElementById("selected-savings-account");

const selected_mounth = document.getElementById("selected-mounth");
const budget_account_chart = document.getElementById('budget-account-chart');
const checking_account_info = document.getElementById("checking-account-info");

const account_expected_savings = document.getElementById("account-expected-savings");
const account_additional_expenditure = document.getElementsByClassName("account-additional-expenditure");
const additional_expenditure_fieldset = document.getElementById("additional-expenditure-fieldset");
const selected_duration = document.getElementById("selected-duration");

let selected_account;
let budget_chart;
let savings_chart;
let additional_expenditure_acc;
let expected_savings;
let accounts = [];

window.addEventListener('resize', () => {
    budget_chart.resize();
    savings_chart.resize();
});

onload = () => {
    fill_account_lists();

    savings_chart = new Chart(
        document.getElementById('savings-account-chart'),
        {
            type: 'line',
            options: {
                interaction: {
                    intersect: false,
                    axis: 'x',
                    mode: 'index',
                },
                scales: {
                    x: {
                        type: 'time',
                        ticks: {
                            color: function (context) {
                                return context.tick.value > Date.now() ? 'darkgrey' : context.tick.value > selected_mounth.valueAsDate ? 'blue' : 'dark';
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
                                return " " + context.parsed.y + " €";
                            },
                            title: function (context) {
                                return new Date(context[0].parsed.x).toLocaleDateString("fr-FR");
                            }
                        },
                    }
                }
            }
        });

    budget_chart = new Chart(
        budget_account_chart,
        {
            type: 'pie',
            options: {
                animation: {
                    // animation: {
                    //     animateRotate: true,
                    // },
                    animation: false,
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (value) {
                                return " " + value.parsed + " €";
                            }
                        },
                    },
                }
            },
            data: {
                labels: ["Remains", "Savings", "Groceries", "Leisure", "Rente", "Health", "Clothing & Needed", "Other"],
                datasets: [
                    {
                        data: [20, 20, 13, 7, 0, 0, 0, 0],
                        backgroundColor: ['#36a2eb', '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#B552D7', '#c9cbcf', '#9966ff'],
                        hoverOffset: 4
                    }
                ]
            }
        }
    );

    selected_mounth.valueAsDate = new Date();
    checking_account_list.addEventListener("change", update_checking_account_chart);
    selected_mounth.addEventListener("change", update_checking_account_chart);
    account_expected_savings.addEventListener("change", update_checking_account_chart);

    savings_account_list.addEventListener("change", update_savings_account_chart);
    selected_duration.addEventListener("change", update_savings_account_chart);
}

function fill_account_lists() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;
            accounts_list = JSON.parse(xhr.responseText);

            checking_accounts_list = accounts_list.filter(account => account.type == 0);
            savings_accounts_list = accounts_list.filter(account => account.type == 1);

            if (checking_accounts_list.length == 0) {
                new_popup("There is no checking account yet", "info");
                document.getElementsByClassName("analytics-form")[0].disabled = true;
            }
            else {
                checking_accounts_list.forEach(account => {
                    checking_account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
                });
            }
            
            if (savings_accounts_list.length == 0) {
                new_popup("There is no savings account yet", "info");
                document.getElementsByClassName("analytics-form")[1].disabled = true;
            }
            else {
                savings_accounts_list.forEach(account => {
                    savings_account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
                });
            }
        }
        else {
            new_popup("Error getting accounts", "error");
        }
    };
    xhr.send();
}

function update_checking_account_chart() {
    if (checking_account_list.value > 0) {
        document.getElementById("budget-account-div").style.filter = "none";
        selected_mounth.disabled = false;
        account_expected_savings.disabled = false;
        additional_expenditure_fieldset.disabled = false;

        let start = selected_mounth.value + "-01";
        let end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        end.setDate(end.getDate() - 1);
        end = end.toISOString().split('T')[0];

        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${checking_account_list.value}&start=${start}&end=${end}]`, true);
        xhr.onload = () => {
            if (xhr.status == 200) {
                operations = JSON.parse(xhr.responseText);
                if (operations.length == 0) {
                    new_popup("There is no operation this mounth", "info");
                }

                expected_savings = parseInt(account_expected_savings.value == "" ? 0 : account_expected_savings.value)


                // add additional expenditure
                let additional_expenditure = document.getElementsByClassName("account-additional-expenditure");
                additional_expenditure_acc = 0;
                for (let i = 0; i < additional_expenditure.length; i++) { additional_expenditure_acc += parseInt(additional_expenditure[i].value == "" ? 0 : additional_expenditure[i].value); }
                document.getElementById("total-add-expenditure").innerHTML = -additional_expenditure_acc;
                operations.push({ ["amount"]: -additional_expenditure_acc, ["category"]: 5 });

                // sum of all operations this mounth
                let income = operations.reduce((acc, operation) => (operation.amount > 0) ? acc + operation.amount : acc, 0);
                let expenses = operations.reduce((acc, operation) => (operation.amount < 0) ? acc + operation.amount : acc, 0);
                let remains = income + expenses - expected_savings;

                operations.push({ ["amount"]: -expected_savings, ["category"]: -1 });

                // sum of all operations by category in array of object
                let sum_per_categories = [];
                sum_per_categories[0] = { ["type"]: -2, ["amount"]: (remains > 0) ? remains : 0 };
                for (let i = -1; i < 6; i++) {
                    sum_per_categories[i + 2] = { ["type"]: i, ["amount"]: operations.reduce((acc, operation) => (operation.category == i && operation.amount < 0) ? acc - operation.amount : acc, 0) };
                }

                document.getElementById("account-incomes").value = income;
                document.getElementById("account-expenses").value = expenses;
                document.getElementById("account-remains").value = remains;
                document.getElementById("account-remains").style.color = ((parseInt(remains) >= 0) ? "" : "red");

                // Update chart data
                let data = {
                    labels: ["Remains", "Savings", "Groceries", "Leisure", "Rente", "Health", "Clothing & Needed", "Other"],
                    datasets: [
                        {
                            data: sum_per_categories.map(categorie => categorie.amount),
                            backgroundColor: ['#36a2eb', '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#B552D7', '#c9cbcf', '#9966ff'],
                            hoverOffset: 4
                        }
                    ]
                };

                budget_chart.data = data;
                budget_chart.update();

                update_savings_account_chart();
            }
            else {
                new_popup("Error getting operations", "error");
            }
        };
        xhr.send();
    }
    else {
        document.getElementById("budget-account-div").style.filter = "";
        selected_mounth.disabled = true;
        account_expected_savings.disabled = true;
        additional_expenditure_fieldset.disabled = true;
    }
}

function update_savings_account_chart() {
    let years_view = selected_duration.value = selected_duration.value == "" ? 1 : selected_duration.value;
    years_view = years_view > 60 ? 60 : years_view < 1 ? 1 : parseInt(years_view);
    selected_duration.value = years_view;

    let start = new Date(selected_mounth.value + "-01");
    let end = new Date(selected_mounth.value + "-01");

    start.setFullYear(start.getFullYear() - 1);
    let start_str = start.toISOString().split('T')[0];

    end.setFullYear(end.getFullYear() + years_view);
    let end_str = end.toISOString().split('T')[0];

    let xhr = new XMLHttpRequest();
    xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${savings_account_list.value}&start=${start_str}&end=${end_str}]`, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            operations = JSON.parse(xhr.responseText);

            // Security if there is no operation at the start of the chart
            let xhr2 = new XMLHttpRequest();
            xhr2.open("GET", `/database/api/get_amount_at_date.php?id_account=${savings_account_list.value}&date=${start_str}]`, false);
            xhr2.onload = () => {
                if (xhr2.status == 200) {
                    operations.unshift({ ["date"]: start_str, ["new_sold"]: parseInt(xhr2.responseText) });
                }
                else {
                    new_popup("Error getting operations", "error");
                }
            };
            xhr2.send();

            let index = new Date(selected_mounth.value + "-01");
            index.setMonth(index.getMonth() + 1);

            while (index <= end) {
                if (operations[operations.length - 1].date > index.toISOString().split('T')[0]) {
                    for (let i = 0; i < operations.length; i++) {
                        if (operations[i].date > index.toISOString().split('T')[0]) {
                            operations.splice(i, 0, { ["date"]: index.toISOString().split('T')[0], ["new_sold"]: operations[i - 1].new_sold += expected_savings });
                            for (let j = i + 1; j < operations.length; j++) {
                                operations[j].new_sold += expected_savings;
                            }
                            break;
                        }
                    }
                } else {
                    operations.push({ ["date"]: index.toISOString().split('T')[0], ["new_sold"]: (operations[operations.length - 1].new_sold += expected_savings) });
                }
                index.setMonth(index.getMonth() + 1);
            }

            let data = {
                labels: operations.map(operation => operation.date),
                datasets: [
                    {
                        stepped: true,
                        data: operations.map(operation => ({ ["x"]: operation.date, ["y"]: operation.new_sold })),
                        borderColor: 'rgb(132, 99, 255)',
                        backgroundColor: 'rgba(132, 99, 255, 0.2)',
                        fill: "start",
                        pointStyle: false,
                        borderWidth: 2,
                        pointHoverRadius: 15
                    }
                ]
            };

            savings_chart.data = data;
            data.datasets[0].data.push({ ["x"]: end, ["y"]: operations[operations.length - 1].new_sold });

            savings_chart.update();
            savings_chart.resize();
        }
        else {
            new_popup("Error getting operations", "error");
        }
    };
    xhr.send();
}

function add_expenditure() {

    let new_expenditure = document.createElement("div");
    new_expenditure.classList.add("additional-expenditure");
    new_expenditure.innerHTML = `
        <div class="row-field">
            <div>
                <input type="text" name="label-additional-expenditure" class="label-additional-expenditure"
                    placeholder="Label">
                <input type="number" name="account-additional-expenditure" class="account-additional-expenditure" onchange="update_checking_account_chart()" placeholder="Amount">€
            </div>
            <img src="/assets/images/trash.png" class="button" alt="delete" class="card-button"
                onclick="remove_expenditure(this)">
        </div>
    `;

    document.getElementById("additional-expenditure-section").appendChild(new_expenditure);
}

function remove_expenditure(self) {
    self.parentNode.remove();
    update_checking_account_chart();
}