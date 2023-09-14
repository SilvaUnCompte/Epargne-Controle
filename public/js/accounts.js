const email = document.getElementById("email").value;
const datasheet = document.getElementById("datasheet");
let accounts = [];

onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/database/api/get_accounts_by_user.php?email=" + email, true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            accounts = xhr.responseText;
            
            array.forEach(accounts => {
                // Create a new row
            });
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