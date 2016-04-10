;(function($,window,document,undefined){
     var defaults={
        
        prePage:"上一页",
        nextPage:"下一页",
        totalItems:1,
        pageItems:5,
        maxPages:8,
        pageEvent:exampleFunc,  //当前选取的jquery对象为参数 
     };

     function exampleFunc(jq){
        alert(jq.html());
        return jq;
     }
   
     function Paper($elm,options){

          this.$elm=$elm;
          this.options=options;
          this.init();

     };
  
     var temp=[]; //存储html字符串的数组
     var items=[]; //存取页数的数组
     var a=0;
     var teams=0;
     var totalPages;  //总页数
     var prePage; 
     var nextPage;

     var $elm; //选取的当前dom对象的jquery对象
     var endTeam;
     var maxPages;
     var dispatcher="跳转到";
     var endWord="页";
     Paper.prototype={
           init:function(){
              this.renderHtml();
              this.bindEvent();

           },
           renderHtml:function(){
             if(this.options.totalItems==0){alert('无内容!');}   
               
            var divStr;
            
               if(this.options.totalItems%this.options.pageItems<this.options.pageItems && this.options.totalItems%this.options.pageItems!=0){totalPages=parseInt(this.options.totalItems/this.options.pageItems)+1;}else{totalPages=parseInt(this.options.totalItems/this.options.pageItems);}
             
            teams=parseInt(totalPages/this.options.maxPages); //组数
            endTeam=totalPages%this.options.maxPages; //这个是最后一组的个数
              
            var that=this.options.maxPages;
            //将所有页组数存进二维数组中
            (function(){
                         
                    for(var i=0;i<teams;i++){
                        items[i]=[];
                        for(var j=0;j<that;j++){
                          
                          items[i][j]=j;
                        }
                    }
                    
                    if(endTeam!=0){
                       
                        items[teams]=[];
                        for(var c=0;c<endTeam;c++){
                           
                            items[teams][c]=c;
                        }
                    }
                   
                })();
                
               
               for(var i=0;i<items[0].length;++i){
               divStr="<div class='bg'><a href='#'>"+(a*this.options.maxPages+i+1)+"</a></div>";
                    temp.push(divStr);
                }
               temp.unshift("<div class='start'>"+this.options.prePage+"</div>");
               temp.unshift("<div class='total'>共有"+totalPages+"页</div>");
               temp.push("<div class='end'>"+this.options.nextPage+"</div>");
               temp.push("<div class='bg2'>"+dispatcher+"</div>");
               temp.push("<input class='input' placeholder='1'>");
               temp.push("<div class='bg3'>"+endWord+"</div>");

               this.$elm.html(temp.join(""));

           },
           bindEvent:function(){
              var Pages=this.options.totalItems/this.options.pageItems; //总页数
              var prePage=this.options.prePage;
              var nextPage=this.options.nextPage;
              var $elm=this.$elm;
              var that= this.options;
              maxPages=this.options.maxPages;

             //点击相应某页
            $(".bg").live("click",function(){
                that.pageEvent($(this).children("a"));
                $(this).children("a").css("color","red");
                $(this).siblings().children("a").css("color","#fff");
               
            });

               //点击上一页
            $(".start").live("click",function(){
                if(a>0)a=a-1;
                else return;
                temp=[];
                for(var i=0;i<items[a].length;++i){
                    
                    divStr="<div class='bg'><a href='#'>"+(a*maxPages+1+i)+"</a></div>";
                    temp.push(divStr); 
                }

               temp.unshift("<div class='start'>"+prePage+"</div>");
               temp.unshift("<div class='total'>共有"+totalPages+"页</div>");
               temp.push("<div class='end'>"+nextPage+"</div>");
               temp.push("<div class='bg2'>"+dispatcher+"</div>");
               temp.push("<input class='input' placeholder='1'>");
               temp.push("<div class='bg3'>"+endWord+"</div>");
               $elm.html(temp.join(""));
            });

                 //点击下一页
            $(".end").live("click",function(){
                temp=[]; //temp初始为空数组
                
                if(items[teams]===undefined){  //最后剩余的一组不存在
                      if(a<teams-1)a=a+1;
                      else return;
                for(var i=0;i<items[a].length;++i){
                    
                    divStr="<div class='bg'><a href='#'>"+(a*maxPages+1+i)+"</a></div>";
                    temp.push(divStr); 
                }}else{
                      if(a<teams)a=a+1;
                      else return;
                    for(var i=0;i<items[a].length;++i){
                    
                    divStr="<div class='bg'><a href='#'>"+(a*maxPages+1+i)+"</a></div>";
                    temp.push(divStr);  
                }};
               temp.unshift("<div class='start'>"+prePage+"</div>");
               temp.unshift("<div class='total'>共有"+totalPages+"页</div>");
               temp.push("<div class='end'>"+nextPage+"</div>");
               temp.push("<div class='bg2'>"+dispatcher+"</div>");
               temp.push("<input class='input' placeholder='1'>");
               temp.push("<div class='bg3'>"+endWord+"</div>");
               $elm.html(temp.join(""));
            });
                      //点击跳转
               $(".bg2").live("click",function(){
                  
                     temp=[];
                    var input=$(".input").val();
                  
                    if(isNaN(parseInt(input))==true)  a=1;  //字符类型字符串，包括空字符
                    else{
                       
                        if(input%maxPages===0)  a=parseInt(input/maxPages);
                          else{
                             a=parseInt(input/maxPages)+1;
                             var c=input%maxPages;
                          }
                    }  
                    a=a-1;
                    for(var i=0;i<items[a].length;++i){
                    
                    divStr="<div class='bg'><a href='#'>"+((a)*maxPages+1+i)+"</a></div>";
                    temp.push(divStr); 
                }

                   temp.unshift("<div class='start'>"+prePage+"</div>");
                   temp.unshift("<div class='total'>共有"+totalPages+"页</div>");
                   temp.push("<div class='end'>"+nextPage+"</div>");
                   temp.push("<div class='bg2'>"+dispatcher+"</div>");
                   temp.push("<input class='input' placeholder='1'>");
                   temp.push("<div class='bg3'>"+endWord+"</div>");
                   $elm.html(temp.join(""));
                });
           }
           };


     $.fn.page=function(options){
         var options=$.extend(defaults,options||{});
         return new Paper($(this),options);
     }

  })($,window,document);
