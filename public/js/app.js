/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
app = angular.module('moneyabcs', ["ngRoute"]);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : '../index.html',
            controller  : 'moneycontroller'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : '../contactus.html',
            controller  : 'contactController'
        })

    	.when('/dashboard', {
        	templateUrl : '../dashboard.html',
        	controller  : 'dashboardController'
    });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.controller('contactController', function($scope) {
	alert("M contact");
    //$scope.message = 'Contact us! JK. This is just a demo.';
});





var searchTopics = [ {"search_topics_1":"Finance%20Planning"}, {"search_topics_2":"Career%20Planning"}, {"search_topics_3":"Financial%20Planners"}, {"search_topics_4":"Financial%20Goals"}, {"search_topics_5":"Time%20Value%20of%20Money"}, {"search_topics_6":"Money%20Management"}, {"search_topics_7":"Financial%20Record%20System"}, {"search_topics_8":"Personal%20Financial%20Statements"}, {"search_topics_9":"Budgeting"}, {"search_topics_10":"Savings"}, {"search_topics_11":"Payment%20Methods"}, {"search_topics_12":"Bank%20Currency"}, {"search_topics_13":"Insurance%20Companies"}, {"search_topics_14":"Private%20Insurance%20Companies"}, {"search_topics_15":"Financial%20Advisors"},{"search_topics_16":"Career%20Choice"}, {"search_topics_17":"Employment%20Search"}, {"search_topics_18":"Employee%20Benefits"}, {"search_topics_19":"Career%20Development"}, {"search_topics_20":"Taxes"}, {"search_topics_21":"Tax%20Refunds"}, {"search_topics_22":"Tax%20Advance%20Loans"}, {"search_topics_23":"Federal%20Income%20Taxes"}, {"search_topics_24":"Tax%20Deductions"}, {"search_topics_25":"Tax%20Credits"}, {"search_topics_26":"Tax%20Planning"}, {"search_topics_27":"Tax%20Preparers"}, {"search_topics_28":"Tax%20Advisors"}, {"search_topics_29":"Major%20Purchases"}, {"search_topics_30":"Bankers"}, {"search_topics_31":"Consumer%20Credit"}, {"search_topics_32":"Types%20of%20Credit"}, {"search_topics_33":"Revolving%20Loans"}, {"search_topics_34":"Open%20Ended%20Loans"}, {"search_topics_35":"Close%20Ended%20Loans"}, {"search_topics_36":"Revolving%20Loans"}, {"search_topics_37":"Credit%20Capacity"}, {"search_topics_38":"Debt%20History"}, {"search_topics_39":"Applying%20for%20Credit"}, {"search_topics_40":"Interest%20Rates"}, {"search_topics_41":"Credit%20History"}, {"search_topics_42":"Credit%20Scores"}, {"search_topics_43":"Credit%20Counseling"}, {"search_topics_44":"Consumer%20Rights"}, {"search_topics_45":"Predatory%20Lending%20Practices%20"}, {"search_topics_46":"Bank%20Corruption"}, {"search_topics_47":"Title%20Loans"}, {"search_topics_48":"Debt%20Collection"}, {"search_topics_49":"Bankruptcy"}, {"search_topics_50":"Chapter%2011%20Bankruptcy"}, {"search_topics_51":"Pawn%20Shops"}, {"search_topics_52":"Tax%20Advance%20Loans"}, {"search_topics_53":"Payday%20Loans"}, {"search_topics_54":"Rent%20to%20Own"}, {"search_topics_55":"Tax%20Refund%20Anticipation%20Loans"}, {"search_topics_56":"Real%20Estate%20Brokers"}, {"search_topics_57":"Housing"}, {"search_topics_58":"Home%20Buying"}, {"search_topics_59":"Property%20Providers"}, {"search_topics_60":"Brokers%20Price%20Opinio%20BPO"}, {"search_topics_61":"Mortgages"}, {"search_topics_62":"Renting"}, {"search_topics_63":"Homeowners%20Insurance"}, {"search_topics_64":"Property%20Insurance"}, {"search_topics_65":"Mortgage%20Insurance"}, {"search_topics_66":"Renters%20Insurance"}, {"search_topics_67":"Car%20Shopping"}, {"search_topics_68":"Auto%20Loans"}, {"search_topics_69":"Home%20Selling"}, {"search_topics_70":"Liability%20Insurance"}, {"search_topics_71":"Auto%20Insurance"}, {"search_topics_72":"Health%20Plans"}, {"search_topics_73":"Home%20Health%20Care"}, {"search_topics_74":"Health%20Maintenance%20Organizations%20HMOs"}, {"search_topics_75":"Preferred%20Provider%20Organization%20PPOs"}, {"search_topics_76":"Medical%20Service%20Plans"}, {"search_topics_77":"Health%20Insurance"}, {"search_topics_78":"Medical%20Insurance"}, {"search_topics_79":"Medicare"}, {"search_topics_80":"Medicaid"}, {"search_topics_81":"Bodily%20Injury%20Insurance"}, {"search_topics_82":"Short%20Term%20Disability%20Insurance%20"}, {"search_topics_83":"Long%20Term%20Disability%20Insurance%20"}, {"search_topics_84":"Whole%20Life%20Insurance"}, {"search_topics_85":"Turned%20Life%20Insurance"}, {"search_topics_86":"Short%20Term%20Insurance"}, {"search_topics_87":"Term%20Life%20Insurance"}, {"search_topics_88":"Annuities"}, {"search_topics_89":"Insurance%20Beneficiaries%20"}, {"search_topics_90":"Child%20Custody"}, {"search_topics_91":"Custody"}, {"search_topics_92":"Investments"}, {"search_topics_93":"Investment%20Goals"}, {"search_topics_94":"Investment%20Strategies"}, {"search_topics_95":"Investment%20Income"}, {"search_topics_96":"Investment%20Growth"}, {"search_topics_97":"Investment%20Equity"}, {"search_topics_98":"Investment%20Risks"}, {"search_topics_99":"Investment%20Alternatives"}, {"search_topics_100":"Asset%20Allocation"}, {"search_topics_101":"Diversification"}, {"search_topics_102":"Modern%20Markets"}, {"search_topics_103":"Capital%20Markets"}, {"search_topics_104":"Stocks"}, {"search_topics_105":"Mutual%20Funds"}, {"search_topics_106":"Real%20Estate"}, {"search_topics_107":"Real%20Estate%20Investment%20Trusts%20REITs"}, {"search_topics_108":"Common%20Stock"}, {"search_topics_109":"Preferred%20Stock"}, {"search_topics_110":"Corporate%20Bonds"}, {"search_topics_111":"Government%20Bonds"}, {"search_topics_112":"Municipal%20Bonds"}, {"search_topics_113":"Convertible%20Bonds"}, {"search_topics_114":"Exchange%20Traded%20Funds"}, {"search_topics_115":"Index%20Funds"}, {"search_topics_116":"Precious%20Metals"}, {"search_topics_117":"Collectibles"}, {"search_topics_118":"Gold"}, {"search_topics_119":"Stock%20Brokers"}, {"search_topics_120":"Investment%20Bankers"}, {"search_topics_121":"Financial%20Analysts"}, {"search_topics_122":"Retirement"}, {"search_topics_123":"Retirement%20Planning"}, {"search_topics_124":"Retirement%20Housing"}, {"search_topics_125":"Retirement%20Income"}, {"search_topics_126":"Retirement%20Living%20Expenses"}, {"search_topics_127":"Social%20Security"}, {"search_topics_128":"Pensions"}, {"search_topics_129":"Public%20Pensions"}, {"search_topics_130":"Employer%20Pensions"}, {"search_topics_131":"Personal%20Retirement%20Plans"}, {"search_topics_132":"Individual%20Retirement%20Accounts"}, {"search_topics_133":"Roth%20Individual%20Retirement%20Accounts"}, {"search_topics_134":"401%20A"}, {"search_topics_135":"401%20B"}, {"search_topics_136":"401%20K"}, {"search_topics_137":"403%20B"}, {"search_topics_138":"457"}, {"search_topics_139":"Thrift%20Savings%20Plan%20TSP"}, {"search_topics_140":"Retirement%20Employment"}, {"search_topics_141":"Wills"}, {"search_topics_142":"Power%20of%20Attorney"}, {"search_topics_143":"Letter%20of%20Lest%20Instruction"}, {"search_topics_144":"Trusts"}, {"search_topics_145":"Trustees"}, {"search_topics_146":"Estate"}, {"search_topics_147":"Probate"}, {"search_topics_148":"Lawyers"},{"search_topics_149":"debit%20collection"},{"search_topics_150" : "home%20owners%20insurance"},{"search_topics_151" : "estate%20planning"},{"search_topics_152" : "credit%20card"},{"search_topics_153" : "Personal%20Financial%20Planning"},{"search_topics_154" : "Credit%20and%20Loans"},{"search_topics_155" : "Your%20Health%20and%20Life"},{"search_topics_156" : "Investing"},{"search_topics_157" : "Planning%20for%20Retirement%20"},{"search_topics_158":"Wills"}, {"search_topics_159":"Power%20of%20Attorney"}, {"search_topics_160":"Letter%20of%20Lest%20Instruction"}];
app.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('error', function(){
			var index;
			for(var loopVar = 0;loopVar < 160;loopVar++){
				index = loopVar + 1;
				if(angular.element(this) && (searchTopics[loopVar]["search_topics_" + index] == angular.element(this).attr("topic").replace(/ /g,"%20"))){
					angular.element(this).attr("src", "./images/defaultImg/search_" + index + "/" + Math.ceil(Math.random()*3) + ".png");
				}
			}
			angular.element(this).attr("set","yes");
		});
		element.on('load', function (event) {
			var index;
			if(angular.element(this)[0].width <= 80 && angular.element(this).attr("set") == "no"){
				for(var loopVar = 0;loopVar < 160;loopVar++){
					index = loopVar + 1;
					if(searchTopics[loopVar]["search_topics_" + index] == angular.element(this).attr("topic").replace(/ /g,"%20")){
						angular.element(this).attr("src", "./images/defaultImg/search_" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					}
				}
				angular.element(this).attr("set","yes");
			} else if(angular.element(this).attr("set") == "no"){
				exp = angular.element(this).attr("src");
				switch(exp){
					case "http://assets.nerdwallet.com/img/nw-logos/NW-default_og-image.jpg" :
					angular.element(this).attr("src", "./images/defaultImg/search_152/" + Math.ceil(Math.random()*5) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "//g.foolcdn.com/assets/images/fool/tmf-logo.png" :
					angular.element(this).attr("src", "./images/defaultImg/search_134" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "https://assets.bwbx.io/markets/public/images/marketdata-quoteshare-image-31c2f97627.png" :
					angular.element(this).attr("src", "./images/defaultImg/search_118" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "https://www.consumer.ftc.gov/sites/default/files/styles/related_multimedia_thumbs/public/videos/thumbnails/video-0078_payday-lending_thumb.png?itok=aMwUgBl3" :
					angular.element(this).attr("src", "./images/defaultImg/search_53" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break
					case "http://i.cdn.turner.com/money/.element/img/1.0/misc/1.gif" :
					angular.element(this).attr("src", "./images/defaultImg/search_134" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "https://static01.nyt.com/images/icons/t_logo_291_black.png":
					angular.element(this).attr("src", "./images/defaultImg/search_84" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
				}
			}
        });
    }
  };
});


app.controller("moneycontroller",function($scope,$http,$sce,$window){
	//alert("Inside Controller");


    "use strict";
    $scope.uName = localStorage.getItem("uName");
    $scope.email = localStorage.getItem("email");
    $scope.showpage = "default";
    $scope.showTour = true;
    $scope.donarSuccess = false;
	// tab link fix
	$scope.changeShowPage = function changeShowPage(value){
        $window.location.href = '/index.html';
        localStorage.setItem('valuePage', value);
        $scope.showpage = value;
	$scope.donarSuccess = false;
        //alert(value);





    };
    if(localStorage.getItem('valuePage')!=null){
        $scope.showpage = localStorage.getItem('valuePage');
        //console.log(localStorage.getItem('valuePage'));
        localStorage.setItem('valuePage', "default");
    }
	//fix tab links

    $scope.showpagefunc = function(obj){

        $scope.showpage = obj.target.attributes.showpage.value;
    };
    ///Only after Loggin
    // $scope.saved_articles
    if(($scope.uName != undefined) && ($scope.uName != "")) {
        // console.log($scope.uName);
        $http.post('/api/getProfile', {emailId: $scope.uName }).success(function (res) {

            $scope.saved_articles = res[0].title;
            $scope.saved_resources = res[0].restitle;
        });
        // $scope.profile
        $http.post('/api/getUserProfile', {username: $scope.uName}).success(function (res) {
            $scope.profile = res.local;
        });


        $scope.deleteSavedArticlesfunc = function (index) {
            // console.log("Clicked..........");
            // console.log(index);
            // console.log($scope.saved_articles.title[index].title);
            var id = $scope.saved_articles[index]._id;
            if (confirm("Confirm Deletion")) {
                $scope.saved_articles.splice(index, 1);
                $.post("/api/deleteProfile", {emailId: $scope.uName, id: id})
                    .done(function (data) {
                        console.log("Deleted: " + data);
                    });
            }
        }

        $scope.deleteSavedResourcesfunc = function (index) {

            var id = $scope.saved_resources[index]._id;
            if (confirm("Confirm Deletion")) {
                $scope.saved_resources.splice(index, 1);
                $.post("/api/deleteResourceProfile", {emailId: $scope.uName, id: id})
                    .done(function (data) {
                        console.log("Deleted: " + data);
                    });
            }
        }
    }
    //store donar information
    $scope.donar_master = {};
    $scope.update_donar = function(donar) {

       $scope.donar_master = angular.copy(donar);
       $http.post("/addDonation", $scope.donar_master).success(function(res) {
	    $scope.donarSuccess = true;
            if(res.status==200){
                $scope.donarSuccess = true;
            }

        });
       console.log($scope.donar_master);
    };

    $scope.searchParam = "";
    var SelLayout = "";
    if((localStorage.getItem("SelectedLayout")) && (localStorage.getItem("SelectedLayout") != "")){
        SelLayout = localStorage.getItem("SelectedLayout");
        //apply selected class to which ever
        $('#schema div').removeClass("selectedLayout");
        $('#id-'+SelLayout).addClass("selectedLayout");
    }
    else {
        SelLayout = "col-md-3";
        //apply selected class to typical 4col
        $('#schema div').removeClass("selectedLayout");
        $('#id-col-md-3').addClass("selectedLayout");
    }
    $scope.SelectedLayout = SelLayout;
    $scope.emailArticleToFriend = function(event){
        var str = event.target.id.split("_")[1];
        if(str <= 2){
            $scope.emailArticle = $scope.articleFeatured[str-1];
        } else {
            console.log($scope.article[str-3])
            $scope.emailArticle = $scope.article[str-3];
        }
        console.log($scope.emailArticle)
        /*$http.post('/send',{articleTitle : profile.iframeLink}).success(function(res){
         console.log("email sent")

         });*/
    }

    $scope.sendMail = function(){
        if($scope.senderEmail == ""){
            //error handling block (print err msg in #mailer)
        } else {
            console.log($scope.recieverEmail)
            $http.post('/send',{emailArticle : $scope.emailArticle,receiver : $scope.recieverEmail,sender : localStorage.getItem("uName")}).success(function(res){
                console.log(res)
            });
        }
    }
    // email the resources
    $scope.emailArticlesToFriend = function(event){
        var str = event.target.id.split("_")[1];
        console.log($scope.resources);
        $scope.emailArticle = { };
        $scope.emailArticle = {title:" "};
        $scope.emailArticle.title = $scope.resources[str-1].webUrl;
        console.log($scope.emailArticle.title)
    }

    // $scope.imgUrlSanitzation = function(index, url){
    //     // if((url == undefined) || (url.includes("s4.reutersmedia.net/resources_v2/images/rcom-default.png") || url.includes("assets.bwbx.io/images/izrptLrH5AWw/v1/320x180.jpg") || url.includes("wsj.net/mw5/content/logos/mw_logo_social.png") || (url == "")))
    //     // {
    //     //   if(index == undefined)
    //     //   {
    //     //     return "images/defaultImg/search_157/" + Math.ceil(Math.random()*5) + ".png"
    //     //   }
    //     //   return "images/defaultImg/search_" + index + "/" + Math.ceil(Math.random()*5) + ".png"
    //     // }
    //     return url;
    // }

    //contact mail
    $scope.contactMail = function(){
        /*alert("email");
         alert($scope.email);*/
        if($scope.subject == ""){

            //error handling block (print err msg in #mailer)
        }
        else if($scope.subject == "General Customer Service"){
            console.log($scope.subject)
            $http.post('/send1',{subject : $scope.subject,email:$scope.email,message:$scope.message,name:$scope.name,sender : localStorage.getItem("uName")}).success(function(res){
                alert(console.log(res));
            });
        }
        else if($scope.subject == "suggestions"){
            console.log($scope.subject)
            $http.post('/send1',{subject : $scope.subject,email:$scope.email,message:$scope.message,name:$scope.name,sender : localStorage.getItem("uName")}).success(function(res){
                alert(console.log(res));
            });
        }
        else {
            console.log($scope.subject)
            $http.post('/send1',{subject : $scope.subject,email:$scope.email,message:$scope.message,name:$scope.name,sender : localStorage.getItem("uName")}).success(function(res){
                alert(console.log(res));
            });
        }
        $scope.email=" ";
        $scope.subject=" ";
        $scope.name=" ";
        $scope.message=" ";
        var test = new cAlert("You query has been successfully sent.<p> We will get back to you as early as possible", "success",20);
        test.alert();
    }
    $scope.getUserProfile = function(){
        $http.post('/api/getProfile',{emailId : $window.localStorage.getItem("uName")}).success(function(res){
            $scope.loginProfile = res;
            console.log("*****************************************");
            console.log(res);
            console.log("*****************************************");
        });
    }
    $scope.setSearch = function(param){
        $scope.searchParam = param;
    }

    $scope.searchArticle = function(className) {
        var searchKey = document.getElementsByClassName(className)[0].value;
        //alert(searchKey)
        // console.log(searchKey);
        // console.log($scope.searchParam);
        $("#resourceLoadMore").hide(); //CHECK this

        $http.post("/searchSample", {name: searchKey }).success(function(res) {
            //alert(res)
            // debugger;
            if(res.data.length > 0){
                var uniqueNames = [];
                $.each(res.data, function(i, el){
                    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                });
                res.data = uniqueNames;
                $(".searchHide").hide();
                $("#articleLoadMore").hide();
                $("#news-section").css("display","block");
                $("#articlesSearchHead").css("display","block");
                // if($scope.searchParam == ""){
                //     $("#sub_resources").css("display","block");
                // } else {
                //     $("#sub_resources").css("display","none");
                // }
                for(var i=0;i<res.data.length;i++){
                    res.data[i].indexTopic = res.data[i].topicName;
                }
                $scope.totalRes = res.data;

                $scope.article = $scope.totalRes.splice(0,res.data.length);
                for(var i=0;i<res.data.length;i++){
                    url = $scope.article[i].iframeLink;
                    $scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
                    $scope.article[i].indexTopic = res.data[i].topicName;
                }

                console.log($scope.article)
            } else {
                //print error message that data is not found
                //$scope.err = res.errMsg;
                try{
                    var test = new cAlert("No search results found for articles!", "success",3);
                    test.alert();
                    var tempbackup = $scope.backUp;
                    $("#news-section").css("display","block");
                    $("#articlesSearchHead").css("display","block");
                    $scope.article = tempbackup.splice(0,12);
                }catch(e){
                    console.log(e)
                }
            }
        });

        var resourcedata = [];
        $scope.resources = $scope.resourcesBackup;
        $scope.resources.filter(function(el) {
            if(el.category) {
                var categories = el.category.split(",");
                for (var i = 0; i < categories.length; i++) {
                    categories[i] = categories[i].trim();
                    //alert(el.type.split("/")[1] +" "+  $scope.searchParam.toLowerCase()+".png");
                    console.log(searchKey.trim() + " == " + categories[i].trim());
                    if (searchKey.trim() == categories[i].trim()) // && el.type.split("/")[1] == $scope.searchParam.toLowerCase()+".png") IGNORED SINCE WE ARE REMOVING SEARCH BY ARTICLE/PRESENTATION/VIDEO
                    {
                        resourcedata.push(el)
                    }
                }
            }
        });
        //console.log("resourcedata");
        // console.log(resourcedata.length);
        if(resourcedata.length > 0){

            // $("#resourceHolder").hide();
            $("#sub_resources").css("display","block");
            $("#resourcesSearchHead").css("display","block");
            // $("#news-section").css("display","none");
            //console.log($scope.resources);
            $scope.resources = resourcedata;
        } else {
            try{
                var test = new cAlert("No search results found for resources!", "success",3);
                test.alert();
                var tempbackup = $scope.resourcesBackup;
                $("#sub_resources").css("display","block");
                $("#resourcesSearchHead").css("display","block");
                $scope.resources = tempbackup.splice(0,12);
            }catch(e){
                console.log(e)
            }
        }


        // if($scope.searchParam == "" || $scope.searchParam == "Articles"){
        //
        //     $http.post("/searchSample", {name: searchKey }).success(function(res) {
        //     	//alert(res)
        //         if(res.data.length > 0){
        //             var uniqueNames = [];
        //             $.each(res.data, function(i, el){
        //                 if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
        //             });
        //             res.data = uniqueNames;
        //             $(".searchHide").hide();
        //             $("#articleLoadMore").hide();
        //             $("#news-section").css("display","block");
        //             if($scope.searchParam == ""){
        //                 $("#sub_resources").css("display","block");
        //             } else {
        //                 $("#sub_resources").css("display","none");
        //             }
        //             for(var i=0;i<res.data.length;i++){
        //                 res.data[i].indexTopic = res.data[i].topicName;
        //             }
        //             $scope.totalRes = res.data;
        //
        //             $scope.article = $scope.totalRes.splice(0,res.data.length);
        //             for(var i=0;i<res.data.length;i++){
        //                 url = $scope.article[i].iframeLink;
        //                 $scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
        //                 $scope.article[i].indexTopic = res.data[i].topicName;
        //             }
        //
        //             console.log($scope.article)
        //         } else {
        //             //print error message that data is not found
        //             //$scope.err = res.errMsg;
        //             try{
        //                 var test = new cAlert("No search results found for articles!", "success",3);
        //                 test.alert();
        //             }catch(e){
        //                 console.log(e)
        //             }
        //         }
        //     });
        // } else {
        //     var data = [];
        //     $scope.resources = $scope.resourcesBackup;
        //     $scope.resources.filter(function(el) {
        //         var categories = el.category.split(",");
        //         for(var i=0;i<categories.length;i++){
        //             categories[i] = categories[i].trim();
        //             //alert(el.type.split("/")[1] +" "+  $scope.searchParam.toLowerCase()+".png");
        //             if(searchKey.trim() == categories[i].trim() && el.type.split("/")[1] == $scope.searchParam.toLowerCase()+".png"){
        //                 data.push(el)
        //             }
        //         }
        //     });
        //     console.log(data);
        //     if(data.length > 0){
        //         $("#sub_resources").css("display","block");
        //         $("#news-section").css("display","none");
        //         console.log($scope.resources)
        //         $scope.resources = data;
        //     } else {
        //         try{
        //             var test = new cAlert("No search results found for resources!", "success",3);
        //             test.alert();
        //         }catch(e){
        //             console.log(e)
        //         }
        //     }
        //
        // }

    }
    var setData = function(res,sort_type){
        console.log("Set Data.....................................");
        console.log(sort_type);
        var url = "";
        if(!localStorage.getItem("fromEmailArticle") || localStorage.getItem("fromEmailArticle") == "") {

            if((sort_type) && (sort_type === "Date"))
            {
                //sort res based on date
                res = res.sort(function (a, b) {
                    return new Date(b.date) - new Date(a.date);
                });
            }
            else
            {
                //sort res based on rank
                res = res.sort(function (a, b) {
                    return b.rank - a.rank;
                });
            }

            //push old data into array rear side
            var tempRes;
            for(var i=0;i<11;i++){
                // console.log(res[i].daysInLead);
                if(res[i].daysInLead >= 5){
                    console.log(res[i]);
                    tempRes = res.splice(i,1);
                    console.log(res[i]);
                    console.log(tempRes);
                    //console.log(res)
                    res.push(tempRes[0]);
                    console.log(res);
                }
            }

        }
        // console.log(res);
        //imgUrlSanitzation
        for(var i=0;i<res.length;i++)
        {
          if((res[i] != undefined) && (res[i].imgUrl.includes("s4.reutersmedia.net/resources_v2/images/rcom-default.png") || res[i].imgUrl.includes("assets.bwbx.io/images/izrptLrH5AWw/v1/320x180.jpg") || res[i].imgUrl.includes("wsj.net/mw5/content/logos/mw_logo_social.png") || (res[i].imgUrl == "")))
          {
            if(res[i].index == undefined)
            {
              res[i].imgUrl = "images/defaultImg/search_157/" + Math.ceil(Math.random()*5) + ".png"
            }
            else {
              res[i].imgUrl = "images/defaultImg/search_" + res[i].index + "/" + Math.ceil(Math.random()*5) + ".png"
            }

          }
        }

        // if((url == undefined) || (url.includes("s4.reutersmedia.net/resources_v2/images/rcom-default.png") || url.includes("assets.bwbx.io/images/izrptLrH5AWw/v1/320x180.jpg") || url.includes("wsj.net/mw5/content/logos/mw_logo_social.png") || (url == "")))
        // {
        //   if(index == undefined)
        //   {
        //     return "images/defaultImg/search_157/" + Math.ceil(Math.random()*5) + ".png"
        //   }
        //   return "images/defaultImg/search_" + index + "/" + Math.ceil(Math.random()*5) + ".png"
        // }

        $scope.backUp = res;
        $scope.totalRes = res;
        ($scope.totalRes.length > 11 ? "" : $scope.hideShowMore = !$scope.hideShowMore);
        // console.log($scope.totalRes === res);
        // console.log("---------------");

        $scope.articleFeatured = $scope.totalRes.splice(0,3);
        $scope.article = $scope.totalRes.splice(0,12);
        console.log($scope.articleFeatured);
        console.log($scope.article);
        /*for(var i=0;i<8;i++){
         url = $scope.article[i].iframeLink;
         $scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
         $scope.article[i].iframeLinkTemp = $scope.article[i].iframeLink
         }*/
        $(".sidebar_icons").show();
    }
    $scope.logOutProfile = function(){
        //alert("sdfsdjfn");
        localStorage.setItem("uName", "");
        localStorage.setItem("articleTopics", "");
        localStorage.setItem("SelectedLayout", "");
        localStorage.setItem("organisation","");
        $window.location.href = "/logout";
    }

    var checkDuplicateObj = function(str) {
        debugger;
        if(str === "Articles")
        {
            // console.log($scope.loginProfile[0].title.length);
            // console.log("--");
            // console.log($scope.profiles.title);
            for (var i = 0; i < $scope.loginProfile[0].title.length; i++) {
                if ($scope.loginProfile[0].title[i].title === $scope.profiles.title) {
                    return true;
                }
            }
            return false;
        }
        else if(str === "Resources")
        {
            // console.log($scope.loginProfile[0].restitle.length);
            // console.log("--");
            // console.log($scope.resprofiles.title);
            for (var i = 0; i < $scope.loginProfile[0].restitle.length; i++) {
                if ($scope.loginProfile[0].restitle[i].title === $scope.resprofiles.title) {
                    return true;
                }
            }
            return false;
        }
        else
        {
            console.log("Invalid Arguments");
        }


    }

    $scope.addme = function(event){
        var test = new cAlert("Article has been added to your profile", "success",20);
        test.alert();


        $scope.profiles={};
        $scope.resprofiles={};
        event.preventDefault();
        //alert(event.target.id);

        //articleFeatured = top row 3
        //artcile rest of row

        // console.log(event.target);
        // console.log(event.target.attributes.sectype.value);
        if(event.target.attributes.sectype.value === "article")
        {
            var selectedArticleMyProfile;
            if(event.target.id <= 3){
                selectedArticleMyProfile = $scope.articleFeatured[event.target.id-1];
            } else {
                selectedArticleMyProfile = $scope.article[event.target.id-4];
            }

            console.log(selectedArticleMyProfile);
            $scope.profiles = selectedArticleMyProfile;
            //profile=$scope.profiles;
            //compare and see if selected article is present in $scope.loginProfile
            //if its there, dont do anything, else add to existing list
            console.log("$scope.loginProfile ============");
            console.log($scope.loginProfile);


            //Check  for duplicate


            //add to scope variable
            var newObj;
            if($scope.loginProfile.length > 0){
                //check if duplicates are there
                var boolVal = checkDuplicateObj("Articles");
                if(!boolVal){
                    console.log("new article is being appended to collection");
                    $scope.loginProfile[0].title.push($scope.profiles);
                    newObj = $scope.loginProfile;
                    //$scope.loginProfile = newObj;

                    console.log(newObj);
                } else {
                    console.log("duplicate found!!!!!!!!!!");
                    return;
                }
            } else {
                newObj = [{
                    emailId:$window.localStorage.getItem("uName"),
                    title:[$scope.profiles],
                    restitle: []
                }];
                $scope.loginProfile = newObj;
            }
            console.log(newObj);

            //updating Saved_articles
            if($scope.saved_articles)
            {
                $scope.saved_articles.push($scope.profiles);
            }

            //update DB
            $http.post('/api/updateProfileArticle',{emailId: $scope.loginProfile[0].emailId, articles: $scope.profiles}).success(function(res){
                console.log("pushing new article to db - profile collection");
                console.log(res);
                // var result = res;
            });





        }
        else if(event.target.attributes.sectype.value === "resource")
        {
            var selectedResourceMyProfile;
            if(event.target.id <= 3){
                selectedResourceMyProfile = $scope.resourceFeatured[event.target.id-1];
            } else {
                selectedResourceMyProfile = $scope.resources[event.target.id-4];
            }

            console.log(selectedResourceMyProfile);
            $scope.resprofiles = selectedResourceMyProfile;
            console.log("$scope.loginProfile ============");
            console.log($scope.loginProfile);


            //Check  for duplicate
            //add to scope variable
            var newObj;
            if($scope.loginProfile.length > 0){
                //check if duplicates are there
                var boolVal = checkDuplicateObj("Resource");
                if(!boolVal){
                    console.log("new article is being appended to collection");
                    $scope.loginProfile[0].restitle.push($scope.resprofiles);
                    newObj = $scope.loginProfile;
                    console.log(newObj);
                } else {
                    console.log("duplicate found!!!!!!!!!!");
                    return;
                }
            } else {
                newObj = [{
                    emailId:$window.localStorage.getItem("uName"),
                    title: [],
                    restitle:[$scope.resprofiles]

                }];
                $scope.loginProfile = newObj;
            }
            console.log(newObj);

            //updating scope of saved_resources
            if($scope.saved_resources)
            {
                $scope.saved_resources.push($scope.resprofiles);
            }

            //update DB
            $http.post('/api/updateProfileResource',{emailId: $scope.loginProfile[0].emailId, resources: $scope.resprofiles}).success(function(res){
                console.log("pushing new article to db - profile collection");
                console.log(res);
            });

        }
        else
        {
            console.log("Unknown sectype from page");
        }



    }
    //var getgoogleDrive = function(){
//		$http.get('/googleDrive')
    //      .success(function(data) {
    //          console.log(data);
    //      });
//	}
    $scope.getCustomizedArticles = function(){
        var SelectedLayout = $("#SelectedLayout").val();
        localStorage.setItem("SelectedLayout",SelectedLayout);
        $scope.SelectedLayout = SelectedLayout;
        if($(".selected-topics .tag").text().length > 0){
            var selectedStr=$(".selected-topics .tag").text().substr(1);
            selectedStr = selectedStr.replace(/x  /g,',');
            var test = new cAlert("Your customized values are save.", "success",20);
            test.alert();
            localStorage.setItem("articleTopics",selectedStr);
            // $http.post('/api/setPersonalize',{username : localStorage.getItem("uName"),selectedlayout : SelectedLayout,selectedtopics : selectedStr}).success(function(res){
            //     console.log(res)
            // });
            getFeaturedArticles($scope);
        } else{
            var test = new cAlert("No Articles selected.", "danger",20);
            test.alert();
            localStorage.setItem("articleTopics","");
            // $http.post('/api/setPersonalize',{username : localStorage.getItem("uName"),selectedlayout : SelectedLayout,selectedtopics : ""}).success(function(res){
            //     console.log(res)
            // });
        }
    }
    $scope.resetCustomized = function(){
        //update local storage default MAY BE REMOVED IF USING PERSISTENT STORAGE
        localStorage.setItem("articleTopics","");
        localStorage.setItem("SelectedLayout","col-md-3");
        $scope.SelectedLayout = "col-md-3";

        localStorage.setItem("articleTopics","");
        var test = new cAlert("Your topic selection has been cleared.", "danger",20);
        test.alert();
        // //update Db for restoring to default
        // $http.post('/api/setPersonalize',{username : localStorage.getItem("uName"),selectedlayout : "col-md-3",selectedtopics : ""}).success(function(res){
        //     console.log(res)
        // });
        getFeaturedArticles($scope);
    }

    var getFeaturedArticles = function($scope){
        console.log("getFeaturedArticles.......................................................");
        //purpose
        //articleTopics - ???
        //fromEmailArticle - ???

        $scope.func = function(){

            if(!localStorage.getItem("uName") || localStorage.getItem("uName") == ""){
                $("#login").css('display','block')

            } else {
                $scope.getUserProfile();
                $("#loggedin").css('display','block')
            }
            //if(!localStorage.getItem("fromEmailArticle") || localStorage.getItem("fromEmailArticle") == ""){
            var articleTopics = localStorage.getItem("articleTopics");
            console.log(articleTopics);
            if(articleTopics){
                console.log("If...");
                $http.post("/article/chosenTopics", {articleTopics : localStorage.getItem("articleTopics") }).success(function(res) {
                    console.log(res);
                    for(var i=0;i<res.length;i++){
                        res[i].indexTopic = res[i].topicName;
                    }
                    if(localStorage.getItem("fromEmailArticle") && localStorage.getItem("fromEmailArticle") != ""){
                        var searchKey = $('<textarea />').html(localStorage.getItem("fromEmailArticle")).text();
                        $http.post("/searchArticle", {name: searchKey }).success(function(result) {
                            console.log(result);
                            var articlesdata;
                            if(result.data.length > 0){
                                result.data[0].indexTopic = result.data[0].topicName;
                                articlesdata = res.filter(function(el) {
                                    return el.title !== result.data[0].title;
                                });
                                articlesdata.unshift(result.data[0]);
                                setData(articlesdata,"Date");
                                localStorage.setItem("fromEmailArticle","")
                            }
                        })
                    } else {
                        if(res.length > 0){
                            setData(res,"Date");
                        } else {
                            try{
                                var test = new cAlert("There are no articles for your chosen topic!", "success",3);
                                test.alert();
                            }catch(e){
                                console.log(e)
                            }
                        }
                    }
                });
            } else {
                console.log("else...");
                $http.get("/article/featured").success(function(res){
                    if(localStorage.getItem("fromEmailArticle") && localStorage.getItem("fromEmailArticle") != ""){
                        var featuredData = res;
                        console.log(featuredData);
                        var searchKey = $('<textarea />').html(localStorage.getItem("fromEmailArticle")).text();
                        console.log(searchKey);
                        $http.post("/searchArticle", {name: searchKey }).success(function(res) {
                            console.log(res.data[0]);
                            console.log(res.data.length);
                            var articlesdata;
                            if(res.data.length > 0){
                                res.data[0].indexTopic = (res.data[0].topicName ?  res.data[0].topicName : res.data[0].indexTopic);
                                console.log(res.data);
                                articlesdata = featuredData.filter(function(el) {
                                    return el.title !== res.data[0].title;
                                });
                                console.log(articlesdata);
                                articlesdata.unshift(res.data[0]);
                                setData(articlesdata,"Date");
                                localStorage.setItem("fromEmailArticle","")
                            }
                        })
                    } else {
                        console.log("inside featured");
                        //console.log(res.splice(0,11));
                        setData(res,"Date");
                    }
                });
            }
            /*}  else {
             $http.get("/article/featured").success(function(res){
             var featuredData = res;
             console.log(featuredData)
             var searchKey = $('<textarea />').html(localStorage.getItem("fromEmailArticle")).text();
             $http.post("/searchArticle", {name: searchKey }).success(function(res) {
             console.log(res)
             if(res.data.length > 0){
             res.data[0].indexTopic = res.data[0].topicName;
             johnRemoved = featuredData.filter(function(el) {
             return el.title !== res.data[0].title;
             });
             johnRemoved.unshift(res.data[0])
             setData(johnRemoved);
             localStorage.setItem("fromEmailArticle","")
             }
             })
             });

             } */


        }
        $scope.func();
    }

    $scope.sortByDate = function(){
        console.log(res);
        var res = $scope.article.concat($scope.articleFeatured);
        res.sort(function(a,b){
            var aa = new Date(a.date);
            aa = (aa == "Invalid Date" ? 0 : aa);
            console.log(aa);
            var bb = new Date(b.date);
            bb = (bb == "Invalid Date" ? 0 : bb);
            console.log(bb);
            return bb - aa;
        });
        //imgUrlSanitzation
        for(var i=0;i<res.length;i++)
        {
          if((res[i] != undefined) && (res[i].imgUrl.includes("s4.reutersmedia.net/resources_v2/images/rcom-default.png") || res[i].imgUrl.includes("assets.bwbx.io/images/izrptLrH5AWw/v1/320x180.jpg") || res[i].imgUrl.includes("wsj.net/mw5/content/logos/mw_logo_social.png") || (res[i].imgUrl == "")))
          {
            if(res[i].index == undefined)
            {
              res[i].imgUrl = "images/defaultImg/search_157/" + Math.ceil(Math.random()*5) + ".png"
            }
            else {
              res[i].imgUrl = "images/defaultImg/search_" + res[i].index + "/" + Math.ceil(Math.random()*5) + ".png"
            }

          }
        }
        $scope.articleFeatured = res.splice(0,3);
        $scope.article = res.splice(0,12);
    }

    getFeaturedArticles($scope);
$scope.refreshData = function(){

    if(($scope.uName != undefined) && ($scope.uName != ""))
    {
            // console.log($scope.uName);
            $http.post('/api/getProfile', {emailId: $scope.uName }).success(function (res) {
                console.log("Response "+res[0]);
                $scope.saved_articles = res[0].title;
                console.log($scope.saved_articles);
                $scope.saved_resources = res[0].restitle;
            });

            // $scope.profile
            $http.post('/api/getUserProfile', {username: $scope.uName}).success(function (res) {
                $scope.profile = res.local;
            });


            $scope.deleteSavedArticlesfunc = function (index) {
                // console.log("Clicked..........");
                // console.log(index);
                // console.log($scope.saved_articles.title[index].title);
                var id = $scope.saved_articles[index]._id;
                if (confirm("Confirm Deletion")) {
                    $scope.saved_articles.splice(index, 1);
                    $.post("/api/deleteArticleProfile", {emailId: $scope.uName, id: id})
                        .done(function (data) {
                            console.log("Deleted: " + data);
                        });
                }
            }

            $scope.deleteSavedResourcesfunc = function (index) {

                var id = $scope.saved_resources[index]._id;
                if (confirm("Confirm Deletion")) {
                    $scope.saved_resources.splice(index, 1);
                    $.post("/api/deleteResourceProfile", {emailId: $scope.uName, id: id})
                        .done(function (data) {
                            console.log("Deleted: " + data);
                        });
                }
            }
    }
}


    //getgoogleDrive();
    $scope.loadMore = function(){
        //var arr = $scope.totalRes.splice(0,9);
        var arr = ($scope.totalRes.length >= 12 ? $scope.totalRes.splice(0,12) : $scope.totalRes.splice(0,$scope.totalRes.length));
        console.log($scope.totalRes.length);
        for(var i=0;i < arr.length;i++){
            $scope.article.push(arr[i]);
        }
        ($scope.totalRes.length == 0 ? $scope.hideShowMore = !$scope.hideShowMore : "");
    }
    $scope.formData = {};

//$http.get('/resources.json').success(function (data){
    $http.get('/resourcesList').success(function (data){
        $scope.allresources = data;
        $scope.resourcesBackup = $scope.allresources;
        $scope.resourceFeatured = $scope.allresources.splice(0,3);
        $scope.resources = ($scope.allresources.length >= 12 ? $scope.allresources.splice(0,12) : $scope.allresources.splice(0,$scope.allresources.length));

    }).error(function(data) {
        console.log('Error: ' + data);
    });
    console.log($scope.resources);

    $scope.loadMoreResources = function(){
        //var arr = $scope.totalRes.splice(0,9);
        var arrResources = ($scope.allresources.length >= 12 ? $scope.allresources.splice(0,12) : $scope.allresources.splice(0,$scope.allresources.length));
        console.log($scope.allresources.length);
        for(var i=0;i < arrResources.length;i++){
            $scope.resources.push(arrResources[i]);
        }
        ($scope.allresources.length == 0 ? $scope.hideShowMoreResources = !$scope.hideShowMoreResources : "");
    }

    // when landing on the page, get all todos and show them
    $http.get("/api/todos")
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post("/api/todos", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.createFinance = function() {
        $http.post("/api/finance", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.newssortby = "Date";
    $scope.onNewsSortChange = function(sortby){
        console.log(sortby);
        $http.get("/article/featured").success(function(res){
            if((sortby) && (sortby === "Date"))
            {
                setData(res,sortby);
            }
            else {
                setData(res);
            }
        });
    }

    $scope.advSearch = {};
    $scope.updateAdvSearchResult = function () {
        var searchKey = $scope.advSearch.searchTerm;
        var contentType = $scope.advSearch.contentType;
        //alert(searchKey)
        // console.log(searchKey);
        // console.log($scope.searchParam);
        $("#resourceLoadMore").hide(); //CHECK this

        $http.post("/searchArticles", {name: searchKey }).success(function(res) {
            //alert(res)
            // debugger;
            if(res.data.length > 0){
                var uniqueNames = [];
                $.each(res.data, function(i, el){
                    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
                });
                res.data = uniqueNames;
                $(".searchHide").hide();
                $("#articleLoadMore").hide();
                $("#news-section").css("display","block");
                $("#articlesSearchHead").css("display","block");
                // if($scope.searchParam == ""){
                //     $("#sub_resources").css("display","block");
                // } else {
                //     $("#sub_resources").css("display","none");
                // }
                for(var i=0;i<res.data.length;i++){
                    res.data[i].indexTopic = res.data[i].topicName;
                }
                $scope.totalRes = res.data;

                $scope.article = $scope.totalRes.splice(0,res.data.length);
                for(var i=0;i<res.data.length;i++){
                    url = $scope.article[i].iframeLink;
                    $scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
                    $scope.article[i].indexTopic = res.data[i].topicName;
                }

                console.log($scope.article)
            } else {
                //print error message that data is not found
                //$scope.err = res.errMsg;
                try{
                    var test = new cAlert("No search results found for articles!", "success",3);
                    test.alert();
                    var tempbackup = $scope.backUp;
                    $("#news-section").css("display","block");
                    $("#articlesSearchHead").css("display","block");
                    $scope.article = tempbackup.splice(0,12);
                }catch(e){
                    console.log(e)
                }
            }
        });

        $http.post("/searchResources", {name: searchKey,filterType:contentType }).success(function(res) {
            //alert(res)
            // debugger;
            if(res.data.length > 0){
                $scope.resources = res.data;
                $("#sub_resources").css("display","block");
                $("#resourcesSearchHead").css("display","block");
                console.log("__________the data______________");
                console.log($scope.resources );

            } else {
                //print error message that data is not found
                //$scope.err = res.errMsg;
                try{
                    var test = new cAlert("No search results found for articles!", "success",3);
                    test.alert();
                    var tempbackup = $scope.resourcesBackup;
                    $("#sub_resources").css("display","block");
                    $("#resourcesSearchHead").css("display","block");
                    $scope.resources = tempbackup.splice(0,12);
                }catch(e){
                    console.log(e)
                }
            }
        });
    };
	/*moneyController($scope,$http,$sce,$window);*/
});


app.controller("MoneyController",function($http,$scope){
	$http.get('/api/username')
        .success(function(data) {
            $scope.user = data;
            console.log(data);
        });

});

app.controller('dashboardController', function($scope,$compile) {
    dashboardController($scope,$compile);
    //$scope.message = 'Contact us! JK. This is just a demo.';
});



/*Dashboard Code Start*/
$(function() {
    $('#navTabs div div').click(function(ev) {
        $('#navTabs div div').removeClass('active');
        $('#'+this.id).addClass('active');
        $('.tabclass').hide();
        var id = this.id+1;
        $('#'+id).toggle();
        $("#myCarousel5").carousel();
    });

});

$(function () {
    $('.carousel slide').carousel({
        interval:2000,
        pause: "false"
    });
    $('.glyphicon-play').click(function () {
        var parid = $(this).parent().parent().parent().attr('id');
        $('#'+parid).carousel('cycle');
    });
    $('.glyphicon-pause').click(function () {
        var parid = $(this).parent().parent().parent().attr('id');
        $('#'+parid).carousel('pause');
    });
});

/*Dashboard Code End*/
