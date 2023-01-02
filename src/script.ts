let theme_color = "#181818"; //Let it blank if you don't want to add color theme else write hexa formatted color : #FFFFFF
let font_color = "#E7E7E7"; //Let it blank to get default color text else write hexa formatted color : #FFFFFF
let resources_selector_enabled = true; // Switch it on false / true depending your needs
let resources_selected_color = "#5FA233"; //Let it blank to get default color text else write hexa formatted color : #FFFFFF
let font_balises = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'ul']; //Do not modify

function apply_theme() {
    document.getElementsByTagName('table')[1].style.backgroundColor = theme_color;
}

function apply_font_color() {
    font_balises.forEach(x => {
        modify_font_color(x);
    });
    modify_font_color('paragraph', 'class');
    modify_font_color('fast-travel-coord', 'class');
}
function modify_font_color(target: string, hook_method = 'tag') {
    for (let x of hook_method === 'class' ? document.getElementsByClassName(target) : document.getElementsByTagName(target)) { // Hook method specified like class so, op. by class else op. by tag
        (x as HTMLInputElement).style.color = font_color;
    }
}
function resources_selector() {
    const rgb2hex = (rgb: string) => {
        if (rgb.search("rgb") === -1) return rgb; // Param doesnt seems like rgb formatted str so return without processed
        let realRGB = rgb.match(/^rgb?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);

        if (realRGB == null) return '';

        const hex = (x: string) => parseInt(x).toString(16).slice(-2); // Parse x from 10 base to 16 base  
        return "#" + hex(realRGB[1]) + hex(realRGB[2]) + hex(realRGB[3]); // Return formated rgb output
    };


    let items = document.getElementsByTagName("table");
    for (let element of items) {
        let para = element.getElementsByClassName("paragraph")
        for (let paragraph of para) {
            if (paragraph.innerHTML.includes("Pour les quêtes de ce succès prévoyez")) {
                let list = paragraph.getElementsByTagName("li");

                for (let puce of list) {
                    puce.addEventListener('click', function () {
                        if (this.style.color != '' && rgb2hex(this.style.color) != '') {
                            if (rgb2hex(this.style.color).toUpperCase() === resources_selected_color.toLocaleUpperCase()) {
                                this.style.color = font_color != '' ? font_color : '#626262';
                            }
                        } else {
                            this.style.color = resources_selected_color;
                        }
                    });
                }
            }
        }
    }



    // for (let x of document.getElementsByTagName('table')[1].getElementsByTagName('li')) {
    //     x.addEventListener('click', function() {
    //         if(this.style.color != '' && rgb2hex(this.style.color) != null) {
    //             if(rgb2hex(this.style.color).toUpperCase() === resources_selected_color.toLocaleUpperCase()){
    //                 this.style.color = font_color != '' ? font_color : '#626262';
    //             }
    //         } else {
    //             this.style.color = resources_selected_color;
    //         }
    //     });
    // }
}

(function() {
    if(document.URL.includes("https://www.dofuspourlesnoobs.com/")) //We're on DPLN
    {   
        if(theme_color != '') {
            apply_theme();
        }
        if(font_color != '') {
            apply_font_color();
        }
        if(resources_selector_enabled) {
            resources_selector();
        }
    }
})();