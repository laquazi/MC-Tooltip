/*jshint esversion: 6 */
window.addEventListener("load", function () {

    const default_config_load_img = {
        "data-img-width": "32px",
        "data-img-height": "32px",
        "data-img-alt": "*img*",
        "data-img-src": "static/img/placeholder.png",
    };
    const default_config_event = {
        "data-offset-x": 20,
        "data-offset-y": 40,
    };

    function string2element(string) {
        let d = document.createElement('div');
        d.innerHTML = string;
        return d.firstChild;
    }

    function load_template(template_string, parameters_object) {
        for (const k in parameters_object) {
            if (parameters_object.hasOwnProperty(k)) {
                template_string = template_string.replaceAll("{{k}}".replace("k", k), parameters_object[k]);
            }
        }
        return string2element(template_string);
    }

    function create_handler(config) {
        const handler_base = 'minetip=event.currentTarget.querySelector("div");if(event.type=="mousemove"||event.type=="mouseover"){minetip.style.display="block";if(window.innerWidth<event.pageX+config["data-offset-x"]+minetip.offsetWidth){minetip.style.left=event.pageX-config["data-offset-x"]-minetip.offsetWidth+"px"}else{minetip.style.left=event.pageX+config["data-offset-x"]+"px"}if(window.innerHeight<event.pageY-config["data-offset-y"]+minetip.offsetHeight){minetip.style.top=event.pageY-(event.pageY+minetip.offsetHeight-window.innerHeight)+"px"}else{minetip.style.top=event.pageY-config["data-offset-y"]+"px"}}else if(event.type=="mouseout"){minetip.style.display="none"}';
        config["data-offset-x"] = parseInt(config["data-offset-x"]);
        config["data-offset-y"] = parseInt(config["data-offset-y"]);
        return function (event) {
            /* jshint ignore:start */
            return eval("var config=" + JSON.stringify(config) + ";" + handler_base);
            /* jshint ignore:end */
        };
    }

    function setup_element(element) {
        if (!element.hasAttribute("data-listening")) {
            let config_attributes = element.parentElement.attributes;
            let minetip_images = element.querySelectorAll("img");
            let config_event = {};
            for (let c in default_config_event) {
                if (config_attributes.hasOwnProperty(c)) {
                    config_event[c] = config_attributes[c].value;
                } else {
                    config_event[c] = default_config_event[c];
                }
            }
            for (let c = 0; c < minetip_images.length; c++) {
                let image_attributes = minetip_images[c].attributes;
                let config_load_img = {};
                for (let d in default_config_load_img) {
                    if (image_attributes.hasOwnProperty(d.replace("data-img-", ""))) {
                        config_load_img[d] = image_attributes[d.replace("data-img-", "")].value;
                    } else if (config_attributes.hasOwnProperty(d)) {
                        config_load_img[d] = config_attributes[d].value;
                    } else {
                        config_load_img[d] = default_config_load_img[d];
                    }
                }
                for (let d in config_load_img) {
                    if (config_load_img.hasOwnProperty(d)) {
                        minetip_images[c].setAttribute(d.replace("data-img-", ""), config_load_img[d]);
                    }
                }
            }
            let handler = create_handler(config_event);
            element.addEventListener("mouseover", handler);
            element.addEventListener("mouseout", handler);
            element.addEventListener("mousemove", handler);
            element.setAttribute("data-listening", true);

        }
    }

    function setup() {
        let configs = document.querySelectorAll("span.minetips");
        for (let a = 0; a < configs.length; a++) {
            if (!configs[a].hasAttribute("data-listening")) {
                let minetips = configs[a].querySelectorAll("span.minetip");
                for (let b = 0; b < minetips.length; b++) {
                    setup_element(minetips[b]);
                }
                configs[a].setAttribute("data-listening", true);
            }
        }
    }

    // let obsidian_sword_item = '<span class="minetip"> <img width="64px" height="64px" src="wip/obsidian_sword_item.png"><div> <span>Obsidian Sword</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When in main hand:</span><br> <span style="color: #00A800; text-shadow: 0.11em 0.11em #002900;">&nbsp;1.6 Attack Speed</span><br> <span style="color: #00A800; text-shadow: 0.11em 0.11em #002900;">&nbsp;6 Attack Damage</span><br> <span>Durability: 2341/2341</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">obsidianstuff:obsidian_sword_item</span><br></div> </span>';
    // console.log(string2element(obsidian_sword_item));

    var template = {
        sword: '<span class="minetip"> <img src="{{icon}}"><div> <span>{{name}}</span><br><br> <span style="color: #A8A8A8; text-shadow: 0.11em 0.11em #292929;">When in main hand:</span><br> <span style="color: #00A800; text-shadow: 0.11em 0.11em #002900;">&nbsp;{{attackspeed}} Attack Speed</span><br> <span style="color: #00A800; text-shadow: 0.11em 0.11em #002900;">&nbsp;{{attackdamage}} Attack Damage</span><br> <span>Durability: {{durability}}/{{durability}}</span><br> <span style="color: #545454; text-shadow: 0.11em 0.11em #151515;">{{id}}</span><br></div> </span>',
    };
    var item = {
        obsidian_sword_item: {
            icon: "wip/obsidian_sword_item.png",
            name: "Obsidian Sword",
            attackspeed: "1.6",
            attackdamage: "6",
            durability: "2341",
            id: "obsidianstuff:obsidian_sword_item",
        },
    };
    
    let test = load_template(template.sword, item.obsidian_sword_item);
    document.body.append(test);
    console.log(test);
    setup_element(test);

    setup();
});


/*

    let configs = document.querySelectorAll("span.minetips");
    for (let a = 0; a < configs.length; a++) {
        let minetips = configs[a].querySelectorAll("span.minetip");
        for (let b = 0; b < minetips.length; b++) {
            let config_attributes = minetips[b].parentElement.attributes;
            let minetip_images = minetips[b].querySelectorAll("img");
            let config_event = {};
            for (let c in default_config_event) {
                if (config_attributes.hasOwnProperty(c)) {
                    config_event[c] = config_attributes[c].value;
                } else {
                    config_event[c] = default_config_event[c];
                }
            }
            for (let c = 0; c < minetip_images.length; c++) {
                let image_attributes = minetip_images[c].attributes;
                let config_load_img = {};
                for (let d in default_config_load_img) {
                    if (image_attributes.hasOwnProperty(d.replace("data-img-", ""))) {
                        config_load_img[d] = image_attributes[d.replace("data-img-", "")].value;
                    } else if (config_attributes.hasOwnProperty(d)) {
                        config_load_img[d] = config_attributes[d].value;
                    } else {
                        config_load_img[d] = default_config_load_img[d];
                    }
                }
                for (let d in config_load_img) {
                    if (config_load_img.hasOwnProperty(d)) {
                        minetip_images[c].setAttribute(d.replace("data-img-", ""), config_load_img[d]);
                    }
                }
            }
            let handler = create_handler(config_event);
            minetips[b].addEventListener("mouseover", handler);
            minetips[b].addEventListener("mouseout", handler);
            minetips[b].addEventListener("mousemove", handler);
        }
    }

*/