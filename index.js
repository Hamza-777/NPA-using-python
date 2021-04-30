const maliciousPort = [
  "31",
  "1170",
  "1234",
  "1243",
  "1981",
  "2001",
  "2023",
  "2140",
  "2989",
  "3024",
  "3150",
  "3700",
  "4950",
  "6346",
  "6400",
  "6667",
  "6670",
  "12345",
  "12346",
  "16660",
  "18753",
  "20034",
  "20432",
  "20433",
  "27374",
  "27444",
  "27665",
  "30100",
  "31335",
  "31337",
  "33270",
  "33567",
  "33568",
  "40421",
  "60008",
  "65000"
];

const good = document.getElementById('good');
const danger = document.getElementById('danger');

var malicious_count = 0;

const fetchData = async () => {
  const res = await fetch('dict.json');
  const data = await res.json();
  // const data = fetch('https://alpes.cloud/up/124623d6f46bcaede62ea8f796d66225.json', { mode: 'no-cors'})
  // .then(blob => blob.json())
  // .then(data => {
  //   console.log(data);
  //   return data;
  // })
  // .catch(e => {
  //   console.log(e);
  //   return e;
  // });
  var result = {};
  var count = 0;
  const length = Object.keys(data).length;

  for(let i=0; i<length; i++){

    if (!result[data[i].srcip]) {  
      result[data[i].srcip] = 1;  
    }
      
    ++result[data[i].srcip];
  }

  for(let i=0; i<2341; i++){
    
    if (maliciousPort.includes(data[i].dstport)) {  
      malicious_count = malicious_count + 1;
      count = count + 1;
      // console.log(malicious_count);
    }
  }

  malicious_count = count;
  // console.log(maliciousPort.includes(data[2].dstport));

  var obj =[];

  for(var k in result){
    obj.push({
      ip: String(k),
      count: result[k]
    })
  }

  var chartdata = {
    labels: obj.map((item) => item.ip),
    datasets : [
      {
        label: 'count',
          data: obj.map((item) => item.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
      }
    ]
  };

  var ctx = document.getElementById('my_chart');

  var barGraph = new Chart(ctx, {
    type: 'bar',
    data: chartdata,
  });

  printTable(obj);

  // console.log(data);

  // if(malicious_count) {
  //   setTimeout(()=>alert("You visited a malicious port!! At some point in your browsing"), 2000);
  // }

  checkMalicious();
};

const printTable = (obj) => {
  document.getElementById('table').innerHTML = `
    <tr>
      <th>IP</th>
      <th>Count</th>
    </tr>
  `;
  obj.forEach((item) => {
    let table = `
      
      <tr>
        <td>${item.ip}</td>
        <td>${item.count}</td>
      </tr>
    `;
    document.getElementById('table').innerHTML += table;
  });
};

// fetchData();

function checkMalicious() {
  if(malicious_count) {
    setTimeout(()=>danger.style.display = "block", 2000);
    setTimeout(()=>danger.style.display = "none", 4000);
  } else {
    setTimeout(()=>good.style.display = "block", 2000);
    setTimeout(()=>good.style.display = "none", 4000);
  }
}

document.addEventListener('DOMContentLoaded', fetchData);

// console.log(malicious_count);