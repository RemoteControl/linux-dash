   
    /*******************************
            Abstracted Functions
    *******************************/
    
    // Gets data from provided url 
    // and updates DOM element (element variable)
    function generate_os_data(url, element){
        $.get( url, function( data ) {
          $(element).text(data);
        } );
    }
    
    // If dataTable with proved ID (table_id)
    // exists, destroy it. Obliterate it. 
    // Leave no evidence.
    function destroy_dataTable(table_id){
        var table = $('#'+table_id);
        
        var ex = document.getElementById(table_id);
        if ( $.fn.DataTable.fnIsDataTable( ex ) ) {
    		table.hide().dataTable().fnClearTable();                         
        	table.dataTable( ).fnDestroy();
    	}
    }
    
    // Function and variables to refresh page data &
    // counter on top right of page 
    var page_refresh_counter = $('#page_data_refresh');
    function page_data_refresh_tick(){
        
        if (Number( page_refresh_counter.text() )==0){ 
            refresh_all();
            page_refresh_counter.fadeOut().text(20).fadeIn();
            setTimeout(function(){ page_data_refresh_tick(); },1000);
            return false; 
        }
        else{
            setTimeout(function(){
                page_refresh_counter.text( Number(page_refresh_counter.text())-1);
                page_data_refresh_tick();
            },1000);
        }
    }
    
    
    
    /*******************************
            Data Call Functions
    *******************************/
    
    function get_ps(){
        
        $.get( "sh/ps.php", function( data ) {
           
        	destroy_dataTable('ps_dashboard');
			$('#filter-ps').val('').off('keyup');
        	
            var psTable = $('#ps_dashboard').dataTable({
                "aaData": data,
                "aoColumns": [
                    { "sTitle":"USER","mDataProp":null },
                    { "sTitle":"PID","mDataProp":null },
                    { "sTitle":"%CPU","mDataProp":null },
                    { "sTitle":"%MEM","mDataProp":null },
                    { "sTitle":"VSZ","mDataProp":null },
                    { "sTitle":"RSS","mDataProp":null },
                    { "sTitle":"TTY","mDataProp":null },
                    { "sTitle":"STAT","mDataProp":null },
                    { "sTitle":"START","mDataProp":null },
                    { "sTitle":"TIME","mDataProp":null },
                    { "sTitle":"COMMAND","mDataProp":null }
                ],
                "bPaginate": true,
                "sPaginationType": "full_numbers",
                "bFilter": true,
                "sDom": "lrtip",
                "bAutoWidth": false,
                "bInfo": false
            }).fadeIn();
			
			$('#filter-ps').on('keyup',function(){
                psTable.fnFilter(this.value);
            });
        }, "json" );
        
    }
    
    function get_users(){
        
        $.get( "sh/users.php", function( data ) {
          
            destroy_dataTable('users_dashboard');
            
            $('#users_dashboard').dataTable({
                "aaData": data,
                "aoColumns": [
                    { "sTitle":"Type","mDataProp":null },
                    { "sTitle":"User","mDataProp":null },
                    { "sTitle":"Home","mDataProp":null }
                ],
                 "aaSorting": [[ 0, "desc" ]],
                "iDisplayLength": 5,
                "bPaginate": true,
                "sPaginationType": "full_numbers",
                "bFilter": false,
                "bAutoWidth": false,
                "bInfo": false
            }).fadeIn();
        
        }, "json" );
        
     $('select[name="users_dashboard_length"]').val('5');
    }
    
    function get_online(){
        
        $.get( "sh/online.php", function( data ) {
          
            destroy_dataTable('online_dashboard');
            
            $('#online_dashboard').dataTable({
                "aaData": data,
                "aoColumns": [
                    { "sTitle":"Who","mDataProp":null },
                    { "sTitle":"From","mDataProp":null },
                    { "sTitle":"Login At","mDataProp":null },
                    { "sTitle":"Idle","mDataProp":null }
                ],
                 "aaSorting": [[ 0, "desc" ]],
                "iDisplayLength": 5,
                "bPaginate": true,
                "sPaginationType": "full_numbers",
                "bFilter": false,
                "bAutoWidth": false,
                "bInfo": false
            }).fadeIn();
        
        }, "json" );
        
     $('select[name="online_dashboard_length"]').val('5');
    }
    
    function get_ram(){
        $.get( "sh/mem.php", function( data ) {
          var ram_total = data[1];
          var ram_used = parseInt( (data[2]/ram_total)*100);
          var ram_free = parseInt( (data[3]/ram_total)*100);
          
          $('#ram-total').text(ram_total);
          $('#ram-used').text(data[2]);
          $('#ram-free').text(data[3]);
          
          $('#ram-free-per').text( ram_free );
          $('#ram-used-per').text( ram_used );
          
        }, "json" );
    }

    function get_df(){
        
        $.get( "sh/df.php", function( data ) {
          
            var table = $('#df_dashboard');
            
            var ex = document.getElementById('df_dashboard');        
            if ( $.fn.DataTable.fnIsDataTable( ex ) ) {
        		table.hide().dataTable().fnClearTable();                         
            	table.dataTable( ).fnDestroy();
            	 
        	}
        	
            table.dataTable({
                "aaData": data,
                "aoColumns": [
                    { "sTitle":"Filesystem","mDataProp":null },
                    { "sTitle":"Size","mDataProp":null },
                    { "sTitle":"Used","mDataProp":null },
                    { "sTitle":"%Avail","mDataProp":null },
                    { "sTitle":"Use%","mDataProp":null },
                    { "sTitle":"Mounted","mDataProp":null }
                ],
                "bPaginate": false,
                "bFilter": false,
                "bAutoWidth": true,
                "bInfo": false
            }).fadeIn();
          
        }, "json" );
    }
    
    function get_whereis(){
        
        $.get( "sh/whereis.php", function( data ) {
          
            var table = $('#whereis_dashboard');
            
            var ex = document.getElementById('whereis_dashboard');        
            if ( $.fn.DataTable.fnIsDataTable( ex ) ) {
                table.hide().dataTable().fnClearTable();                         
                table.dataTable( ).fnDestroy();
            }
            
            table.dataTable({
                "aaData": data,
                "aoColumns": [
                    { "sTitle":"Software","mDataProp":null },
                    { "sTitle":"Installation","mDataProp":null }
                ],
                "bPaginate": false,
                "bFilter": false,
                "aaSorting": [[ 1, "desc" ]],
                "bAutoWidth": false,
                "bInfo": false
            }).fadeIn();
        
        }, "json" );
    }
    
    function get_os_info(){ 
        generate_os_data('sh/issue.php','#os-info');
        generate_os_data('sh/hostname.php','#os-hostname');
        generate_os_data('sh/uptime.php','#os-uptime');
    }
    
    function get_ip(){
        $.get( 'sh/ip.php', function( data ) {
            
            destroy_dataTable('ip_dashboard');
            
            $('#ip_dashboard').dataTable({
                "aaData": data,
                "aoColumns": [
                    { "sTitle":"Interface","mDataProp":null },
                    { "sTitle":"IP","mDataProp":null }
                ],
                "bPaginate": false,
                "bFilter": false,
                "bAutoWidth": true,
                "bInfo": false
            }).fadeIn();
            
        }, 'json' );
    }

    function get_ispeed(){
        var rate = $('#ispeed-rate');

        // 0 = MB
        // 1 = KB
        var AS = 1;

        $.get("sh/speed.php?as=" + AS, function (data) {
          rate.text(data);
        });

        var lead = rate.next(".lead");

        if (AS == 0) lead.text("MB/s");
        if (AS == 1) lead.text("KB/s");
    }

    /* 
        Function that calls all the other functions which refresh
        each individual widget
    */
   function refresh_all(){
        get_ram();
        get_ps();
        get_df();
        get_os_info();
        get_users();
        get_online();
        get_whereis();
        get_ip();
        get_ispeed();
    }
    
    // Initialize Page function calls
    refresh_all();
    //page_data_refresh_tick();
    