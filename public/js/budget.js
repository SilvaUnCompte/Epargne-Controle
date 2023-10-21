const email = '<%=Session["email"]%>'

const checking_account_list = document.getElementById("selected-checking-account");
const savings_account_list = document.getElementById("selected-savings-account");

const selected_mounth = document.getElementById("selected-mounth");
const budget_account_chart = document.getElementById('budget-account-chart');
const checking_account_info = document.getElementById("checking-account-info");

const account_expected_savings = document.getElementById("account-expected-savings");
const account_additional_expenditure = document.getElementById("account-additional-expenditure");
const additional_expenditure_fieldset = document.getElementById("additional-expenditure-fieldset");

let selected_account;
let budget_chart;
let savings_chart;
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
                    mode: 'index',
                },
                scales: {
                    x: {
                        type: 'time',
                    },
                },
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                }
            }
        });

    budget_chart = new Chart(
        document.getElementById('budget-account-chart'),
        {
            type: 'pie',
            options: {
                // animation: {
                //     animateRotate: true,
                // },
                animation: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            },
        }
    );

    selected_mounth.valueAsDate = new Date();
    checking_account_list.addEventListener("change", update_checking_account_chart);
    selected_mounth.addEventListener("change", update_checking_account_chart);
    account_expected_savings.addEventListener("change", update_checking_account_chart);
    account_additional_expenditure.addEventListener("change", update_checking_account_chart);

    savings_account_list.addEventListener("change", update_savings_account_chart);
    account_expected_savings.addEventListener("change", update_savings_account_chart);
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

            if (savings_accounts_list.length == 0) {
                new_popup("There is no savings account yet", "info");
                document.getElementsByClassName("analytics-form")[1].disabled = true;
                return;
            }
            else {
                savings_accounts_list.forEach(account => {
                    savings_account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
                });
            }

            if (checking_accounts_list.length == 0) {
                new_popup("There is no checking account yet", "info");
                document.getElementsByClassName("analytics-form")[0].disabled = true;
            }
            else {
                checking_accounts_list.forEach(account => {
                    checking_account_list.innerHTML += `<option value="${account.id_account}">${account.label}</option>`;
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
                    new_popup("There is no operation yet", "info");
                }

                let expected_savings = parseInt(account_expected_savings.value == "" ? 0 : account_expected_savings.value)
                let additional_expenditure = parseInt(account_additional_expenditure.value == "" ? 0 : account_additional_expenditure.value);

                operations.push({ ["amount"]: -additional_expenditure, ["category"]: 5 });

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

                // Update chart data
                let data = {
                    labels: ["Remains", "Savings", "Groceries", "Leisure", "House", "Health", "Clothing & Needed", "Other"],
                    datasets: [
                        {
                            data: sum_per_categories.map(categorie => categorie.amount),
                            hoverOffset: 4
                        }
                    ]
                };

                budget_chart.data = data;
                budget_chart.update();
                budget_chart.resize();
            }
            else {
                new_popup("Error getting operations", "error");
            }
        };
        xhr.send();
    }
    else {
        document.getElementById("budget-account-div").style.filter = "saturate(15%)";
        selected_mounth.disabled = true;
        account_expected_savings.disabled = true;
        additional_expenditure_fieldset.disabled = true;
    }
}

function update_savings_account_chart() { }

// function get_operations(id_account, start, end) {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", `/database/api/get_operations_by_account.php?id_account=${id_account}&start=${start}&end=${end}]`, true);
//     xhr.onload = () => {
//         if (xhr.status == 200) {
//             operations = JSON.parse(xhr.responseText);
//             if (operations.length == 0) {
//                 new_popup("There is no operation yet", "info");
//             }
//             console.log(operations);
//             return operations;
//         }
//         else {
//             new_popup("Error getting operations", "error");
//         }
//     };
//     xhr.send();
// }

// function update_checking_chart() {
//     update_savings_chart()
//     categories_chart_container.parentNode.style.display = "block";

//     // sum of all operations this month
//     let total = operations.reduce((acc, operation) => acc + operation.amount, 0);
//     // sum of all operations by category in array of object
//     let sum_per_categories = [];
//     for (let i = 0; i < 6; i++) {
//         sum_per_categories[i] = { ["type"]: i, ["amount"]: operations.reduce((acc, operation) => operation.category == i ? acc + operation.amount : acc, 0) };
//     }
//     // set amount abs
//     sum_per_categories.forEach(category => category.amount = Math.abs(category.amount));

//     let data = { // 0 = Groceries, 1 = leisure, 2 = rent & utilities, 3 = health, 4 = clothing & needed, 5 = other
//         labels: ["Groceries", "Leisure", "House", "Health", "Clothing & Needed", "Other"],
//         datasets: [
//             {
//                 label: 'TEXT A METTRE',
//                 data: sum_per_categories.map(categorie => categorie.amount),
//                 hoverOffset: 4
//             }
//         ]
//     };

//     categories_chart.data = data;
//     categories_chart.update();
//     categories_chart.resize();
// }

// function update_savings_chart() {
//     categories_chart_container.parentNode.style.display = "none";

//     let data = {
//         labels: operations.map(operation => operation.date),
//         datasets: [
//             {
//                 label: selected_account.label,
//                 data: operations.map(operation => ({ ["x"]: operation.date, ["y"]: operation.new_sold })),
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 fill: "start",
//                 pointStyle: false,
//                 borderWidth: 2,
//                 pointHoverRadius: 15
//             }
//         ]
//     };

//     log_chart.data = data;
//     data.datasets[0].data.push({ ["x"]: analytics_end.value, ["y"]: operations[operations.length - 1].new_sold });

//     log_chart.update();
//     log_chart.resize();
// }