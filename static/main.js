$(document).ready(function(){
    $('.dropbtn').click(function(){
        $('#myDropdown').toggleClass("show");
    });

    $('.single_row').click(function(){
        let fullName = $(this).text().split(' ');
        let firstName = fullName[0];
        let lastName = fullName[1];
        $('#myDropdown').removeClass("show").addClass("hide");

        $.ajax({
            url: '',
            type: 'get',
            contentType: 'application/json',
            data: {
                first_name: firstName,
                last_name: lastName
            },
            success:function(response){
                $('#customer_name').text(firstName + ' ' + lastName);
                renderPieChart(response.sales_2021, response.sales_2022);
                renderLineChart(response.sales_2021, response.sales_2022);
            }
        })
    });

    $('#myInput').on('keyup', function() {
        let searchText = $(this).val().toLowerCase();
        $('.single_row').each(function() {
          var text = $(this).text().toLowerCase();
          if(text.includes(searchText)) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
    });
    let pieChart; 
    let lineChart;
    function renderPieChart(sales_2021, sales_2022) {
        if (pieChart) {
            pieChart.data.labels = ['Sales_2021', 'Sales_2021'];
            pieChart.data.datasets[0].data = [sales_2021, sales_2022];
            pieChart.update(); 
        } else {
            let ctx = document.getElementById('pieChart').getContext('2d');
            pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Sales in 2021', 'Sales in 2022'],
                    datasets: [{
                        label: '2021 vs 2022',
                        data: [sales_2021, sales_2022],
                        backgroundColor: [
                            'rgba(15, 39, 59, 0.5)',
                            'rgba(0, 160, 210, 0.5)'
                        ],
                        borderColor: [
                            'rgba(15, 39, 59, 0.5)',
                            'rgba(0, 160, 210, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
    }
    function renderLineChart(sales_2021, sales_2022) {
        let years = ['2021', '2022']; 
        let salesData = [sales_2021, sales_2022]; 

        let lineChartCtx = document.getElementById('lineChart').getContext('2d');
        if (lineChart) {
            lineChart.data.labels = years;
            lineChart.data.datasets[0].data = salesData;
            lineChart.update(); 
        } else {
            lineChart = new Chart(lineChartCtx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Sales Over the Years',
                        data: salesData,
                        backgroundColor: 'rgba(15, 39, 59, 0.5)',
                        borderColor: 'rgba(15, 39, 59, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }    
});
