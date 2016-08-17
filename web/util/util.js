// /**
//  * Created by qinkaizhu on 16/8/17.
//  */
// // define(function()
// //     {
// //         return {
// //             getRequestParams:function(url){
// //                 var theRequest = new Object();
// //                 if (url.indexOf("?") != -1) {
// //                     var str = url.substr(1);
// //                     strs = str.split("&");
// //                     for(var i = 0; i < strs.length; i ++) {
// //                         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
// //                     }
// //                 }
// //                 return theRequest;
// //             },
// //             syntaxHighlight:function(json) {
// //
// //             }
// //         }
// //     }
// // );
//
// define(function()
//     {
//         return {
//             getRequestParams:function(url){
//                 var theRequest = new Object();
//                 if (url.indexOf("?") != -1) {
//                     var str = url.substr(1);
//                     strs = str.split("&");
//                     for(var i = 0; i < strs.length; i ++) {
//                         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
//                     }
//                 }
//                 return theRequest;
//             },
//             syntaxHighlight:function(json){
//                 if (typeof json != 'string') {
//                     json = JSON.stringify(json, undefined, 2);
//                 }
//                 json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
//                 return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
//                     var cls = 'number';
//                     if (/^"/.test(match)) {
//                         if (/:$/.test(match)) {
//                             cls = 'key';
//                         } else {
//                             cls = 'string';
//                         }
//                     } else if (/true|false/.test(match)) {
//                         cls = 'boolean';
//                     } else if (/null/.test(match)) {
//                         cls = 'null';
//                     }
//                     return '<span class="' + cls + '">' + match + '</span>';
//                 });
//             }
//         }
//     }
// );
