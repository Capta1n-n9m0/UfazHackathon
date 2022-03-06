const server = "http://192.168.53.216/"

$(document).ready(() => {
    $.fn.dataTable.ext.errMode = function ( settings, helpPage, message ) {
        console.log(message);
    };
    $("#new_farm").ready(function (){
        $("#new_farm").attr("action", `${server}new_farm`)
    })
    $("#update_constant").ready(function (){
        $("#update_constant").attr("action", `${server}update_constant`)
    })
    $("#farmers").DataTable({
        processing: true,
        ajax: {
            url: server + "farms",
            crossDomain: true,
            dataType: 'jsonp',
            dataSrc: ""
        },
        columns: [
            {data: "id"},
            {data: "region"},
            {data: "farmer"},
            {data: "n_fields"},
            {data: "ha"},
            {data: "autumn"},
            {data: "spring"},
            {data: "seeding"},
            {data: "planting"},
            {data: "irrigation"},
            {data: "cultivation"},
            {data: "fertilizing"},
            {data: "topping"},
            {data: "efficiency"},
            {data: "quality"},
            {data: "index"},
        ],
    });
    $("#consts").DataTable({
        processing: true,
        ajax: {
            url: server+"consts",
            crossDomain: true,
            dataType: 'jsonp',
            dataSrc: ""
        },
        columns: [
            {data: "id"},
            {data: "name"},
            {data: "value"},
            {data: "description"}
        ],
    });
    $("#submit").click(function () {
        let data = {}
        data.Region = $("#region").val()
        data.Farmer = {Name: $("#farmer").val()}
        data.NumberOfField = parseFloat($("#n_field").val())
        data.HA = parseFloat($("#ha").val())
        data.AutumnPloughing = {
            AppliedHA: parseFloat($("#autumn_ha").val()),
            Date: $("#autumn_date").val(),
            Depth: parseFloat($("#autumn_depth").val())
        }
        data.SpringPloughing = {
            AppliedHA: parseFloat($("#spring_ha").val()),
            Date: $("#spring_date").val(),
            Depth: parseFloat($("#spring_depth").val())
        }
        data.Seeding = {
            IntervalCM: parseFloat($("#seeding_interval").val()),
            Standart: $("input[name=seeding_standard]:checked").val() === "Yes"
        }
        data.Planting = {
            AppliedHA: parseFloat($("#planting_ha").val()),
            Date: $("#planting_date").val(),
            PlanPopulation: parseFloat($("#planting_population").val())
        }
        data.Irrigation = {
            AppliedHA: parseFloat($("#irrigation_ha").val()),
            NumberOfTimes: parseFloat($("#irrigation_times").val())
        }
        data.Cultivation = {
            AppliedHA: parseFloat($("#cultivation_ha").val()),
            NumberOfTimes: parseFloat($("#cultivation_times").val())
        }
        data.Fertilizing = {
            AppliedHA: parseFloat($("#fertilizing_ha").val()),
            Integrity: $("input[name=fertilizing_ingergety]:checked").val() === "Yes",
            Date: $("#fertilizing_date").val()
        }
        data.Topping = {
            AppliedHA: parseFloat($("#topping_ha").val()),
            Spraying: $("input[name=topping_spray]:checked").val() === "Yes"
        }
        data.Efficiency = {Tons: parseFloat($("#efficiency").val())}
        data.Quality = {Score: parseFloat($("#quality").val())}
        let res = fetch(server+"new_farm",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "no-cors",
            body: JSON.stringify(data)
        }).then(async (response) => {
            return await response.text();
        })
    })



})


