(()=>{
    //今日の日付データを変数”today”に格納
    const today = new Date();

    //年月日曜日を取得
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const week = today.getDay();
    const day = today.getDate();
    

    //open時間("日〜土")
    const open = new Array("9:00",false,"10:00","10:00",false,"10:00","9:00");

    const week_ja = new Array("日","月","火","水","木","金","土");

    //htmlのid"today"に書き出す
    document.getElementById("today").textContent = year+"/"+month+"/"+day+"("+week_ja[week]+")";

    //今日のopen時間
    const today_open = open[today.getDay()];
    const [open_hh,open_mm] = today_open.split(":");
    const pre_time = "00:20";
    const [pre_hh,pre_mm] = pre_time.split(":");
    
    const ready_H = open_hh-pre_hh+(open_mm-pre_mm)/60.0;
    const ready_hh = Math.floor(ready_H);
    const ready_mm = ready_H*60%60;
    const ready_time = ready_hh+":"+ready_mm;
    const $open = document.getElementById("open");

    if(today_open){
        $open.textContent = "今日は"+today_open+"open!!"+ready_time+"までに準備";
    } else {
        $open.textContent = "今日は定休日";
    };
 
    //水温
    const $water = document.getElementById("water");
    const $wbo = document.getElementById("water_boiler_on");
    $('#js-btn').click(function(){
        //w_ready_M分にボイラーON
        const w_difference = 30.5-$water.value;
        const w_H = ready_H-w_difference;
        const w_M = Math.round(w_H*60);
        const w_hh = Math.floor(w_H);
        const w_mm = w_M%60;
        const w_time = w_hh+":"+w_mm;
        //$wbo.innerHTML = w_time;
        if(w_difference>0){
            $wbo.innerHTML = w_time+"に水温ボイラーON";
        // }else if($water.value==""){
        //     $wbo.innerHTML = "水温が入力されていません";
        }else{
            $wbo.innerHTML = "ノーボイラー";
        }
    });
    
    
    //室温
    const $room = document.getElementById("room");
    const $rbo = document.getElementById("room_boiler_on");
    $("#js-btn").click(function(){
        const get_need_H = (num)=>{
            return (30.0-num)*0.5;
        };
        const need_H = get_need_H($room.value);
        const r_H = ready_H-need_H;
        const r_M = Math.round(r_H*60);
        const r_hh = Math.floor(r_H);
        const r_mm = r_M%60;
        const r_time = r_hh+":"+r_mm;

        $rbo.innerHTML = r_time+"に室温ボイラーON";
    });

    //予想最高気温
    const $ex_max = document.getElementById("expected_max");
    const $thermo = document.getElementById("thermo");
    $("#js-btn").click(function(){
        const thermo = (num)=>{
            if(num>=25.0){
                return "OFF";
            }else if(num>=20.0){
                return "OFF29.0°c ON28.0°c";
            }else if(num>=15.0){
                return "OFF29.5°c ON28.5°c";
            }else if(num>=10.0){
                return "OFF30.0°c ON29.0°c";
            }else{
                return "OFF30.5°c ON29.5°c";
            }
        };
        $thermo.innerHTML = "室温ボイラーサーモ設定"+thermo($ex_max.value);
    });
    //エアコン
    const $ex_min = document.getElementById("expected_min");
    const $AC = document.getElementById("air_conditioner");
    $("#js-btn").click(function(){
        const AC_set = (num)=>{
            if(num<4.0){
                return "エアコン 暖房 26°c";
            }else if(num<8.0){
                return "エアコン 暖房 25°c";
            }else if(num>11.0 && num<28.0){
                return "";
            }else if(num<31.0){
                return "エアコン 冷房 26°c";
            }else{
                return "エアコン 冷房 25°c";
            }
        };
        $AC.innerHTML = AC_set($ex_max.value)+AC_set($ex_min.value);
        //$AC.innerHTML = "エアコン設定は"+AC_set($ex_min.value);

    });

})();
