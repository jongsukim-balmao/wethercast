require("dotenv").config();

var express = require("express");
var app = express();
// EXPRESS : 서버를 만들기위해 DOWN 받은 PACKAGE에서 EXPRESS를 호출함 //
// /weather : 받은 정보를 저장하기 위한  SERVER에서 /WEATHER라는 WEB SITE로 경로로 들어갈때 마다  OPEN API가 호출 된다 //
app.get("/weather", function (req: any, res: any) {
  const { numOfRows, pageNo, base_date, base_time, nx, ny } =
    req.query;
  const serviceKey = process.env.SERVICE_KEY;
 // web site에서 들어온 REQUIRE요청을 처리한다. GET 방식으로 REQUIRE된 QUERY를 받은 정보((? 다음의  Query key =value의 내용을 저장하기 위한 변수 선언 //
  var api_url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?";
  var request = require("request");
  var options = {
    url: api_url,
    qs: { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny },
  };
   // 접수한 require 정보를 답하기 위해 API에 해당 정보를 요청한다 //
  request.get(options, function (error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});
//http://127.0.0.1:3000/weather : WEB SERVER를 실행하기 위한 PORT를 설정, 진입시 APP을 //
//호출하게 되는 PAGE SITE를 표시함 //
app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:3000/weather?serviceKey=serviceKey&numOfRows=10&pageNo=1&base_date=20241028&base_time=0600&nx=61&ny=125 app listening on port 3000!"
  );
});
