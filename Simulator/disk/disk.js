
var x=3,mxval;
function myFunction() {
    x=x+1;
    var h1 = document.getElementsByTagName("input")[x];
    var att = document.createAttribute("class");
    att.value = "tdm-abc";
    h1.setAttributeNode(att);
}


var fcfs_btn_count = 0, sstf_btn_count = 0, scan_btn_count = 0, cscan_btn_count = 0, look_btn_count = 0, clook_btn_count = 0;

function optchecked(btn)
{
	let value = btn.value;
	if(value === "fcfs")
		fcfs_btn_count = fcfs_btn_count + 1;
	if(value === "sstf")
		sstf_btn_count = sstf_btn_count + 1;
	if(value === "scan")
		scan_btn_count = scan_btn_count + 1;
	if(value === "cscan")
		cscan_btn_count = cscan_btn_count + 1;
	if(value === "look")
		look_btn_count = look_btn_count + 1;
	if(value === "clook")
		clook_btn_count = clook_btn_count + 1;
	if(btn.getAttribute("class") == "btn btn-outline-secondary")
		btn.setAttribute("class","btn btn-dark");
	else
		btn.setAttribute("class","btn btn-outline-secondary");
}


function calculate()
{
	var calc_min = parseInt(document.getElementsByTagName("input")[1].value);
	var calc_max = parseInt(document.getElementsByTagName("input")[2].value);

	if(calc_max <= calc_min)
	{
		alert("Invalid cylinder numbers");
		return;
	}
	
	var fcfsv=0,sstfv=0,scanv=0,cscanv=0,lookv=0,clookv=0;

	if(fcfs_btn_count % 2 == 1)
	{
		fcfsv = calculate_fcfs();
		if(fcfsv == -10)
			return;
	}

	if(sstf_btn_count % 2 == 1)
	{
		sstfv = calculate_sstf();
		if(sstfv == -10)
			return;
	}

	if(scan_btn_count % 2 == 1){
			scanv = calculate_scan();
			if(scanv == -10)
				return;
		}
		
	if(cscan_btn_count % 2 == 1){
		cscanv = calculate_cscan();
		if(cscanv == -10)
			return;
	}
		
	if(look_btn_count % 2 == 1){
		lookv = calculate_look();
		if(lookv == -10)
			return;
	}
		
	if(clook_btn_count % 2 == 1){
		clookv = calculate_clook();
		if(clookv == -10)
			return;
	}
	var f = document.getElementById("s_graph");
	var att = document.createAttribute("class");
	att.value = "s_show";
	f.setAttributeNode(att);
	show_graph(fcfsv,sstfv,scanv,cscanv,lookv,clookv);
}

function show_graph_section(){
	var f = document.getElementById("graph_section");
	var att = document.createAttribute("class");

	att.value = "s_show";		//s_show is not defined
	f.setAttributeNode(att);
}
var dp_fcfs = []; var dp_sstf = [];  var dp_scan = []; var dp_cscan = []; var dp_look = [];  var dp_clook = [];
var fcfs_values=[]; var sstf_values=[]; var scan_values = []; var cscan_values=[]; var look_values = []; var clook_values = []; 

function calculate_fcfs()
	{
	
		var i;
		var sum=0;
		var diff;
		var z;
		var y_i = -1;
		
 		var head = parseInt(document.getElementsByTagName("input")[0].value);
 		var fcfs_max = parseInt(document.getElementsByTagName("input")[2].value);
 		var fcfs_min = parseInt(document.getElementsByTagName("input")[1].value);
 		
 		if(head > fcfs_max)
 		{
 			alert("Please insert a valid Head value. Current Head value is larger than the largest cylinder.");
 			return -10;
 		}

 		if(head < fcfs_min)
 		{
 			alert("Please insert a valid Head value. Current Head value is smaller than the smallest cylinder.");
 			return -10;
 		}
 		y_i++;
 		fcfs_values.push(head);
		for(i=3;i<=x;++i)
		{
			y_i++;
			z = parseInt(document.getElementsByTagName("input")[i].value);
			if(z > fcfs_max)
			{
				alert("Input " + z + " is greater than the last cylinder");
				return -10;
			}

			if(z < fcfs_min)
			{
				alert("Input " + z + " is smaller than the first cylinder");
				return -10;
			}
			fcfs_values.push(z);
			diff = head - z;
			if(diff < 0)
			{
				diff = diff * (-1);
			}
			sum = sum + diff;
			head = z;
		}
		allocate_fcfs();
		return sum;
	}


function calculate_sstf()
	{
		var in_arr = [];
		var diff;
		var sum = 0;
		var y_i = 0;

		var head = parseInt(document.getElementsByTagName("input")[0].value);
 		var sstf_max = parseInt(document.getElementsByTagName("input")[2].value);
 		var sstf_min = parseInt(document.getElementsByTagName("input")[1].value);
		if(head > sstf_max)
 		{
 			alert("Please insert a valid Head value. Current Head value is larger than the largest cylinder.");
 			return -10;
 		}

 		if(head < sstf_min)
 		{
 			alert("Please insert a valid Head value. Current Head value is smaller than the smallest cylinder.");
 			return -10;
 		}
 		sstf_values.push(head);
		in_arr.push(head);
		for(var i = 3;i <= x; ++i)
		{
			var z= parseInt(document.getElementsByTagName("input")[i].value);
			if(z > sstf_max)
			{
				alert("Input " + z + " is greater than the last cylinder");
				return -10;
			}

			if(z < sstf_min)
			{
				alert("Input "+ z +" is smaller than the first cylinder");
				return -10;
			}
			in_arr.push(z);
		}
		var sstf_min = 9999;
		var done = [];		//a new empty array
		var flag;
		for(i = 0;i < x - 2; ++i)		
			done.push(0);


		for(var j=1; j<=x-2; ++j)
		{
			y_i++;
			for(var i=1;i<=x-2;++i)
			{
				diff = head - in_arr[i];
				
				if(diff < 0)
					diff = diff *(-1);

				if((diff < sstf_min) && (done[i-1] == 0))
				{
					sstf_min = diff;
					flag = i;					
				}
			}
			sum = sum + sstf_min;
			head = in_arr[flag];
			sstf_values.push(in_arr[flag]);
			done[flag-1] = 1;
			sstf_min=9999;
		}
		allocate_sstf();
		return sum;
	}
	
	function calculate_scan()
	{
		var in_arr=[];
		var sum=0;
		var y_i = 0;

		var head = parseInt(document.getElementsByTagName("input")[0].value);
 		var scan_max = parseInt(document.getElementsByTagName("input")[2].value);
 		var scan_min = parseInt(document.getElementsByTagName("input")[1].value);
		if(head > scan_max)
 		{
 			alert("Please insert a valid Head value. Current Head value is larger than the largest cylinder.");
 			return -10;
 		}

 		if(head < scan_min)
 		{
 			alert("Please insert a valid Head value. Current Head value is smaller than the smallest cylinder.");
 			return -10;
 		}
		scan_values.push(head);
		
		var scan_max = document.getElementsByTagName("input")[2].value;
		
		for(var i = 3;i <= x; ++i)
		{
			var z = parseInt(document.getElementsByTagName("input")[i].value);
			if(z > scan_max)
			{
				alert("input " + z + " is greater than the last cylinder");
				return -10;
			}

			if(z < scan_min)
			{
				alert("input " + z + " is smaller than the first cylinder");
				return -10;
			}
			in_arr.push(z);
		}
		in_arr.sort(function(a, b){return a - b});
		var temp;
		var i,j,flag;

		for(i = in_arr.length - 1;i >= 0; --i)	
		{			
			var p = parseInt(in_arr[i]);
			if(p < head)
			{
				flag = i + 1;
				break;
			}
		}
		if((head-in_arr[flag-1]) >= (in_arr[flag]-head)){
			sum = sum + (scan_max - head);
			var p_i;
			for(j=flag;j<in_arr.length;++j)
			{
				y_i++;
				p_i = parseInt(in_arr[j]);
				scan_values.push(p_i);
			}			
		
			y_i++;
			scan_values.push(scan_max);

			for(j=flag-1; j>=0 ;--j)
			{
				y_i++;
				p_i = parseInt(in_arr[j]);
				scan_values.push(p_i);
			}
			var int = parseInt(in_arr[0]);
			sum = sum + (scan_max - int);
			allocate_scan();
			return sum;
		}

	else{
		sum=sum+(head-scan_min);
		var p_i;
		for(j=flag-1;j>=0;j--){
			y_i++;
			p_i = parseInt(in_arr[j]);
			scan_values.push(p_i);
		}
		y_i++;
		scan_values.push(scan_min);
		for(j=flag;j<in_arr.length;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			scan_values.push(p_i);
		}
		var int = parseInt(in_arr[in_arr.length-1]);
		sum=sum+(int-scan_min);
		allocate_scan();
		return sum;
	}
	}

	function calculate_cscan()
	{
		var in_arr=[];
		var sum=0;
		var y_i = 0;
		var head = parseInt(document.getElementsByTagName("input")[0].value);
 		var cscan_max = parseInt(document.getElementsByTagName("input")[2].value);
 		var cscan_min = parseInt(document.getElementsByTagName("input")[1].value);
		if(head > cscan_max)
 		{
 			alert("Please insert a valid Head value. Current Head value is larger than the largest cylinder.");
 			return -10;
 		}

 		if(head < cscan_min)
 		{
 			alert("Please insert a valid Head value. Current Head value is smaller than the smallest cylinder.");
 			return -10;
 		}
		cscan_values.push(head);
		
		var cscan_max = document.getElementsByTagName("input")[2].value;
		
		for(var i=3;i<=x;++i)
		{
			var z= parseInt(document.getElementsByTagName("input")[i].value);
			if(z > cscan_max)
			{
				alert("input " + z + " is greater than the last cylinder");
				return -10;
			}

			if(z < cscan_min)
			{
				alert("input " + z + " is smaller than the first cylinder");
				return -10;
			}
			in_arr.push(z);
		}

		//sort the inputs
		in_arr.sort(function(a, b){return a - b});
				
		var temp;
		var i,j,flag;

		for(i=in_arr.length-1;i>=0;--i)	
		{			
			var p = parseInt(in_arr[i]);
			if(p < head)
			{
				flag = i + 1;
				break;
			}
		}

		if((head-in_arr[flag-1])>=(in_arr[flag]-head)){
		sum = sum + (cscan_max - head);
		var p_i;
		for(j=flag;j<in_arr.length;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			cscan_values.push(p_i);
		}
		cscan_values.push(cscan_max);
		for(j=0; j<=flag-1 ;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			cscan_values.push(p_i);
		}

		var int = parseInt(in_arr[flag-1]);
		sum = sum + (int-cscan_min);

		allocate_cscan();
		return sum;
	}
	else {
		sum = sum + (head - cscan_min);
		var p_i;
		for(j = flag - 1; j >= 0 ; --j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			cscan_values.push(p_i);
		}
		cscan_values.push(cscan_min);
		for(j=in_arr.length-1;j>=flag;--j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			cscan_values.push(p_i);
		}
		
		var int = parseInt(in_arr[flag]);
		sum = sum + (cscan_max-int);

		allocate_cscan();
		return sum;
	}
	}

	function calculate_look()
	{
		var in_arr=[];
		var sum=0;
		var y_i=0;
		var head = parseInt(document.getElementsByTagName("input")[0].value);
 		var look_max = parseInt(document.getElementsByTagName("input")[2].value);
 		var look_min = parseInt(document.getElementsByTagName("input")[1].value);
		if(head > look_max)
 		{
 			alert("Please insert a valid Head value. Current Head value is larger than the largest cylinder.");
 			return -10;
 		}

 		if(head < look_min)
 		{
 			alert("Please insert a valid Head value. Current Head value is smaller than the smallest cylinder.");
 			return -10;
 		}
		look_values.push(head);
		var look_max = document.getElementsByTagName("input")[2].value;
		
		for(var i=3;i<=x;++i)
		{
			var z= parseInt(document.getElementsByTagName("input")[i].value);
			if(z > look_max)
			{
				alert("input "+z+" is greater than the last cylinder");
				return -10;
			}

			if(z < look_min)
			{
				alert("input "+z+" is smaller than the first cylinder");
				return -10;
			}
			in_arr.push(z);
		}
	
		//sort the inputs
		in_arr.sort(function(a, b){return a - b});
		in_arr.sort(function(a, b){return a - b});

		var i,j,flag;
		for(i = in_arr.length - 1;i >= 0; --i)	
		{			
			var p = parseInt(in_arr[i]);
			if(p < head)
			{
				flag = i + 1;
				break;
			}
		}

		if((head-in_arr[flag-1]) >= (in_arr[flag]-head)){

		var p_i;
		for(j=flag;j<in_arr.length;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			look_values.push(p_i);
		}

		for(j=flag-1; j>=0 ;--j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			look_values.push(p_i);
		}

		var int = parseInt(in_arr[x-3]);	//last element
		sum = sum + (int - head); 

		var int = parseInt(in_arr[x-3]);
		var int2 = parseInt(in_arr[0]);
		sum = sum + (int - int2);

		allocate_look();
		return sum;
	}
	else{
		var p_i;
		for(j=flag-1; j>=0 ;--j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			look_values.push(p_i);
		}
		for(j=flag;j<in_arr.length;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			look_values.push(p_i);
		}

		var int = parseInt(in_arr[0]);	//last element
		sum = sum + (head - int); 

		var int = parseInt(in_arr[0]);
		var int2 = parseInt(in_arr[x-3]);
		sum = sum + (int2 - int);

		allocate_look();
		return sum;
	}
	}
	
	function calculate_clook()
	{
		var in_arr=[];
		var sum=0;
		var y_i = 0;
		var head = parseInt(document.getElementsByTagName("input")[0].value);
 		var clook_max = parseInt(document.getElementsByTagName("input")[2].value);
 		var clook_min = parseInt(document.getElementsByTagName("input")[1].value);
		if(head > clook_max)
 		{
 			alert("Please insert a valid Head value. Current Head value is larger than the largest cylinder.");
 			return -10;
 		}

 		if(head < clook_min)
 		{
 			alert("Please insert a valid Head value. Current Head value is smaller than the smallest cylinder.");
 			return -10;
 		}
		clook_values.push(head);
		
		var clook_max = document.getElementsByTagName("input")[2].value;
		
		for(var i=3;i<=x;++i)
		{
			var z= parseInt(document.getElementsByTagName("input")[i].value);
			if(z > clook_max)
			{
				alert("input " + z + " is greater than the last cylinder");
				return -10;
			}

			if(z < clook_min)
			{
				alert("input " + z + " is smaller than the first cylinder");
				return -10;
			}
			in_arr.push(z);
		}

		in_arr.sort(function(a, b){return a - b});
		var temp;
		var i,j,flag;

		for(i=in_arr.length-1;i>=0;--i)	
		{			
			var p = parseInt(in_arr[i]);
			if(p < head)
			{
				flag = i+1;
				break;
			}
		}
		if((head-in_arr[flag-1])>=(in_arr[flag]-head)){
			var len = in_arr.length-1;
		var p = parseInt(in_arr[len]);
			sum = sum + (p - head);
		var p_i;
		for(j=flag;j<in_arr.length;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			clook_values.push(p_i);
		}

		for(j=0; j<=flag-1 ;++j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			clook_values.push(p_i);
		}

		var int = parseInt(in_arr[flag-1]);
		var int2 = parseInt(in_arr[0]);
		sum = sum + (int - int2);

		allocate_clook();
		return sum;
	}
	else {
		var len = in_arr.length-1;
		var p=parseInt(in_arr[0]);
		sum = sum + (head-p);
		var p_i;
		for(j=flag-1; j>=0 ;--j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			clook_values.push(p_i);
		}
		for(j=len;j>=flag;--j)
		{
			y_i++;
			p_i = parseInt(in_arr[j]);
			clook_values.push(p_i);
		}

		var int = parseInt(in_arr[len]);
		var int2 = parseInt(in_arr[flag]);
		sum = sum + (int - int2);

		allocate_clook();
		return sum;
	}
	}
	window.onload = function () {
        CanvasJS.addColorSet("myColors",
                [//colorSet Array
                "#DC143C",
                "#008080",
                "orange",
                "#000080",
                "#003300",
                "#663300"                
                ]);
    }

	function show_graph(fcfs_btn_count,sstf_btn_count,scan_btn_count,cscan_btn_count,look_btn_count,clook_btn_count)
	{
		
		var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "RESULTS OF DISK SCHEDULING ALGORITHMS"              
		},
		
		data: [              
		{
			type: "column",				
			dataPoints: [
				{ label: "FCFS",  y: fcfs_btn_count  },
				{ label: "SSTF", y: sstf_btn_count  },
				{ label: "SCAN", y: scan_btn_count  },
				{ label: "CSCAN",  y: cscan_btn_count  },
				{ label: "LOOK",  y: look_btn_count  },
				{ label: "CLOOK",  y: clook_btn_count  }
			]
		}
		],

		axisY:{
			title:"Total Head Movement"
		},

		animationEnabled : true,
		animationDuration :6000,
		colorSet: "myColors"
	});
	chart.render();
	}

	function allocate_fcfs(){
		var d = -1;
		for(var i = 0;i < fcfs_values.length; ++i)
		{
			d++;
			var a = parseInt(fcfs_values[i]);
			dp_fcfs.push([a,d]);
		}
		
	}

	function allocate_sstf(){
		var d = -1;
		for(var i = 0;i < sstf_values.length; ++i)
		{
			d++;
			var a = parseInt(sstf_values[i]);
			dp_sstf.push([a,d]);
		}
	}

	function allocate_scan(){
		var d = -1;
		for(var i = 0;i < scan_values.length; ++i)
		{
			d++;
			var a = parseInt(scan_values[i]);
			dp_scan.push([a,d]);
		}
	}

	function allocate_cscan(){
		var d = -1;
		for(var i = 0;i < cscan_values.length; ++i)
		{
			d++;
			var a = parseInt(cscan_values[i]);
			dp_cscan.push([a,d]);
		}
	}

	function allocate_look(){
		var d = -1;
		for(var i = 0;i < look_values.length; ++i)
		{
			d++;
			var a = parseInt(look_values[i]);
			dp_look.push([a,d]);
		}
	}

	function allocate_clook(){
		var d = -1;
		for(var i = 0;i < clook_values.length; ++i)
		{
			d++;
			var a = parseInt(clook_values[i]);
			dp_clook.push([a,d]);
		}
	}

		var data_fcfs = {
    		values:dp_fcfs
		};

		var data_sstf = {
			values:dp_sstf
		};

		var data_scan = {
			values:dp_scan
		};

		var data_cscan = {
			values:dp_cscan
		};

		var data_look = {
			values:dp_look
		};

		var data_clook = {
			values:dp_clook
		};
	
    
	function fcfsModal()
	{

		var mxval = document.getElementsByTagName("input")[2].value;

    	zingchart.render({
        id:"chartContainer_fcfs",
        output:"svg",
        height:500,
        width:"80%",
        data:{
            "type":"line",
            "title":{
                "text":"FCFS Header Movement"
            },
            "series":[
                data_fcfs
            ]
        },

        "scale-x":{
        	"title":{
        		"text":"Request Track Number"
        	}
        },

        "scale-y":{
        		"title":"Request Number"
        }
    	});
		
	}


	function sstfModal()
	{
		var mxval = document.getElementsByTagName("input")[2].value;
		zingchart.render({
        id:"chartContainer_sstf",
        output:"svg",
        height:500,
        width:"80%",
        data:{
            "type":"line",
            "title":{
                "text":"SSTF Header Movement"
            },
            "series":[
                data_sstf
            ]
        }
    	});
	}

	function scanModal()
	{
		var mxval = document.getElementsByTagName("input")[2].value;
		zingchart.render({
        id:"chartContainer_scan",
        output:"svg",
        height:500,
        width:"80%",
        data:{
            "type":"line",
            "title":{
                "text":"SCAN Header Movement"
            },
            "series":[
                data_scan
            ]
        }
    	});	
	}

	function cscanModal()
	{
		var mxval = document.getElementsByTagName("input")[2].value;
		zingchart.render({
        id:"chartContainer_cscan",
        output:"svg",
        height:500,
        width:"80%",
        data:{
            "type":"line",
            "title":{
                "text":"CSCAN Header Movement"
            },
            "series":[
                data_cscan
            ]
        }
    	});
	}

	function lookModal()
	{
		var mxval = document.getElementsByTagName("input")[2].value;
		zingchart.render({
        id:"chartContainer_look",
        output:"svg",
        height:500,
        width:"80%",
        data:{
            "type":"line",
            "title":{
                "text":"LOOK Header Movement"
            },
            "series":[
                data_look
            ]
        }
    	});
	}

	function clookModal()
	{
		var mxval = document.getElementsByTagName("input")[2].value;
		zingchart.render({
        id:"chartContainer_clook",
        output:"svg",
        height:500,
        width:"80%",
        data:{
            "type":"line",
            "title":{
                "text":"CLOOK Header Movement"
            },
            "series":[
                data_clook
            ]
        }
    	});		
	}