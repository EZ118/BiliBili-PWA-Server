<?php  

$html = file_get_contents('https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3');  
echo $html;
?>