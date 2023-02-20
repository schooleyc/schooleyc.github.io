require([
    "dojo/dom", "dojo/on",
    "esri/tasks/query", "esri/tasks/QueryTask", "dojo/domReady!", "esri/layers/FeatureLayer",
    "esri/smartMapping/statistics/histogram",
    "esri/smartMapping/statistics/summaryStatistics",
    "esri/widgets/Histogram",
    "esri/Color",
    "esri/core/promiseUtils"
  ], function (dom,
    on,
    Query,
    QueryTask,
    FeatureLayer,
    histogram,
    summaryStatistics,
    Histogram,
    Color,
    promiseUtils) {

    var queryTask = new QueryTask("https://arcgis.netl.doe.gov/server/rest/services/Hosted/Pipeling_Pts_ML_WGS84/FeatureServer");

    var query = new Query();
    query.returnGeometry = false;
    query.outFields = [
      "AC_LAB", "ANN_predicted_age_years", "CAT_predicted_age_years", "XGB_predicted_age_years"
    ];

    on(dom.byId("execute"), "click", execute);

    function execute () {
      query.where = "NAME LIKE '" + dom.byId("userinput").value + "%'";
      queryTask.execute(query, showResults);
    }

    function showResults (results) {
      var resultItems = [];
      var resultCount = results.features.length;
      for (var i = 0; i < resultCount; i++) {
        var featureAttributes = results.features[i].attributes;
        for (var attr in featureAttributes) {
          resultItems.push("<b>" + attr + ":</b>  " + featureAttributes[attr] + "<br>");
        }
        resultItems.push("<br>");
      }
      dom.byId("info").innerHTML = resultItems.join("");
    }
  });