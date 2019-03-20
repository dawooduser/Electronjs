<?php
header('Content-type: application/json');
$form_data = json_decode(file_get_contents("php://input"));
$title = $form_data->item;
$response = AmazonApi($title);
function AmazonApi($search){
try{
$ch = curl_init();
$header = array();
$output = array();
$header[] = "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
$header[] = 'Cookie: x-wl-uid=1vlKm5hBxhHPg37UgkrAPYZZaV0wv+T5knGezWJq0AIEWI30hJYp0XouddMIZeemj1LKAi9fDQq7aoFN+mbvlVYPTBQVLFdzs0aeTGWtiCY0Ay63L0ezPfZRKXQHC
/Wum4ywRviFW9es=; session-id-time=2082787201l; session-id=192-9168386-7231424; ubid-main=187-6710460-8617661
; session-token="+SFC4vDx/BvcD8D1Mdgeo2jtnTD0qPHF5j2nWNwbFGcRyW7/o4LBOmBHJosU5W0SgoAd6lhi0NZWg/6o5WE6o45k
+VCT5a5dgj0tltSEkBT80oWT0CDk+jCDEEhIcxnCe6aqkUn6soFiMJHIsMWujo4qyA6A70PC1xKGKdIFMUm3H0DGSdIMqITs4Mjb1
/1vY6GxnPeh5ncasxl+tUN2dHVwwJbj1ZrmyJdDxSDd8/o="; __utma=194891197.2101747155.1434117141.1434356635.1434362529
.4; __utmz=194891197.1434362529.4.4.utmccn=(referral)|utmcsr=stackoverflow.com|utmcct=/questions/11589556
/retrieving-an-amazon-stores-list-of-products-using-php|utmcmd=referral; x-main="Xi0312Ip8BrjoFoj6Zp9OLxDcU6kCvlm4DExlT5yNgHa2b3htenxvUsF2TZR3
?Fn"; s_pers=%20s_vnum%3D1866356399079%2526vn%253D2%7C1866356399079%3B%20s_invisit%3Dtrue%7C1434364356330
%3B%20s_nr%3D1434362556331-Repeat%7C1442138556331%3B; csm-hit=b-1RHERWP84F8S70KRQ903|1434453087266; preferred-geo
=national; UserPref=O9NYa0FpfOIAcRMnkQf7WL3LyhrjCsMBKgKfVxT4zK8uOTF5KjzPAwmz0DuVnfXhdkinEE1BEMgPn09eHwavl
+Hwl1BOSvjp1ewiG1iCXa0R77FsPOGbpq06MWB0MC7Wwff4gehUEAle5IfyFQqKGh1XvJ4YiMFsR2mwmyzzVJTo0WPGZzvvpCVLFmx22cRVwEi4sX8y
+IfEKu76B4p1GHPdZVo1HIwLooo8CT7lboNUi4Hhn6mhtyGCNEDLvWD8NII48Vd9EkcBjUpiSeNroRjYO9yNkj8SI3xJVI0befNipOfxAzPSnuQqeBpqm99bWArk9ZZl
+EM5QKzoPNJSF0FqVnnYavt4G6F/PHedaJVl8pU0A6N9lBjK6YZRFflyaoEYPtUW+nqK0xqO+YusAMAlhHBuW33KMdtt3i6oufQ4yTDqIgAiQ1ZTXcsb2tcu
; s_dslv=1434370132739; lc-main=en_US; aws-target-visitor-id=1434357190046-572838.22_02; aws-target-data
=%7B%22support%22%3A%221%22%7D; s_fid=7BB6DD9CE8128EC3-2A07290402DD6AF6; s_vn=1465893191447%26vn%3D1
; s_nr=1434370132733-New; s_vnum=1866370132735%26vn%3D1; skin=noskin; b2b-main=0';
$header[] = "Connection: keep-alive";
$header[] = "Content-Type: image/jpeg";

$User_Agent = 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31';
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$header[] = 'User-Agent: '. $User_Agent;
$cookies = 'CookieName1=Value;CookieName2=Value';
$header[] = 'Cookie: '. $cookies;
$url = 'https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords='.$search;
curl_setopt($ch, CURLOPT_URL , $url );
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
// curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17');
curl_setopt($ch , CURLOPT_RETURNTRANSFER, true);
$html = curl_exec($ch);
if($html == FALSE){
    echo "curl error ".curl_error($ch);
}
curl_close($ch);
$DOM = new DOMDocument;


libxml_use_internal_errors(true);
$DOM->loadHTML($html);
$xpath = new DomXPath($DOM);
$class = 'a-fixed-left-grid';    
$divs = $xpath->query("//*[contains(concat(' ', normalize-space(@class), ' '), ' $class ')]");
// $array = array();

$els = $xpath->query('//img[@class="s-access-image cfMarker"]');
foreach($els as  $key=>$value){
         $el = $els->item($key);
        $src = $el->getAttribute('src');
        // echo "<pre>"; print_r($src); echo "</pre>";
        $output[] = array('img'=>$src);
};

$add_title = $xpath->query('//a[@class="a-link-normal s-access-detail-page s-color-twister-title-link a-text-normal"]');
foreach($add_title as  $key=>$grabe_title){
    $kl = $add_title->item($key);
    $srttc = $kl->getAttribute('title');
    $srhhc = $kl->getAttribute('href');
    $output[] = array('title'=>$srttc,'href'=>$srhhc);
};


$price ='/<span class="a-size-base a-color-price s-price a-text-bold"><span class="currencyINR">&nbsp;&nbsp;<\/span>(?P<price>[^>]*)<\/span>/';
preg_match_all($price,$html,$cost);

$out=null;
foreach($divs as $span) {
    $span->nodeValue;
     $array[] =  array('price'=>$span->nodeValue);
    $output[] = array('price'=>$cost);
    // json_encode($out);
};
// $json = array('status'=>1,'info'=>$output,'s'=>$array);

}catch(exception $e) {
   echo $e;
}finally {
    // echo json_encode($out);
    return $out = array_values($output);
}
};
echo json_encode($response);
if($response == null){
    $response = AmazonApi($title);
     echo json_encode($response);
}



?>