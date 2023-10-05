const email = document.getElementById("email").value;
const datasheet = document.getElementById("datasheet");
let accounts = [];
const nb_operations = 14;

onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;
            // function createChart()

            var xhr2 = new XMLHttpRequest();
            xhr2.open("GET", "/database/api/get_operations_by_accounts.php?accounts=" + accounts + "&limit=" + nb_operations, true);
            xhr2.onload = () => {
                if (xhr2.status == 200) {
                    operations = JSON.parse(xhr2.responseText);

                    for (let i = 0; i < nb_operations; i++) {
                        if (operations[i].regularity > 0) {
                            datasheet.children[nb_operations-i-1].style.color = "grey";
                            datasheet.children[nb_operations-i-1].style.fontStyle = "italic";
                        }
                        else if (operations[i].amount > 0) {
                            datasheet.children[nb_operations-i-1].children[2].style.color = "green";
                        }
                        datasheet.children[nb_operations-i-1].children[0].innerHTML = operations[i].date;
                        datasheet.children[nb_operations-i-1].children[1].innerHTML = operations[i].label;
                        datasheet.children[nb_operations-i-1].children[2].innerHTML = (operations[i].amount > 0 ? "+" : "") + operations[i].amount.toFixed(2) + " €";
                        datasheet.children[nb_operations-i-1].children[3].innerHTML = operations[i].category == 0 ? "Groceries" : operations[i].category == 1 ? "Leisure" : operations[i].category == 2 ? "Rent" : operations[i].category == 3 ? "Health" : operations[i].category == 4 ? "Shopping" : "Other";
                    }
                }
                else {
                    alert("Error getting operations");
                }
            }
            xhr2.send();
        }
        else {
            alert("Error getting accounts");
        }
    };
    xhr.send();
}

const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: -10 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
];

new Chart(
    document.getElementById('overview-checking-account'),
    {
        type: 'bar',
        options: {
            animation: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count),
                    hoverOffset: 4
                }
            ]
        }
    }
);
new Chart(
    document.getElementById('overview-savings-account'),
    {
        type: 'bar',
        options: {
            animation: true,
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count),
                    hoverOffset: 4
                }
            ]
        }
    }
);
new Chart(
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
                    display: true
                },
                tooltip: {
                    enabled: true
                }
            }
        },
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count),
                    hoverOffset: 4
                }
            ]
        }
    }
);