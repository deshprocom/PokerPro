// longitude 经度  latitude 纬度


let regionRectangle = [
    rectangle(49.220400,79.446200,42.889900,96.330000),
    rectangle(54.141500,109.687200,39.374200,135.000200),
    rectangle(42.889900,73.124600,29.529700,124.143255),
    rectangle(29.529700,82.968400,26.718600,97.035200),
    rectangle(29.529700,97.025300,20.414096,124.367395),
    rectangle(20.414096,107.975793,17.871542,111.744104),
];
let excludeRectangle = [
    rectangle(25.398623,119.921265,21.785006,122.497559),
    rectangle(22.284000,101.865200,20.098800,106.665000),
    rectangle(21.542200,106.452500,20.487800,108.051000),
    rectangle(55.817500,109.032300,50.325700,119.127000),
    rectangle(55.817500,127.456800,49.557400,137.022700),
    rectangle(44.892200,131.266200,42.569200,137.022700),
];




function rectangle(latitude1,longitude1,latitude2,longitude2) {
    let rectangle = {};
    rectangle.west = longitude1 > longitude2 ? longitude2 : longitude1;
    rectangle.north = latitude1 > latitude2 ? latitude1 : latitude2;
    rectangle.east = longitude1 > longitude2 ? longitude1 : longitude2;
    rectangle.south = latitude1 > latitude2 ? latitude2 : latitude1;
    return rectangle;
}


export function isInChina(latitude,longitude) {

    for (i = 0; i < regionRectangle.length; i++)
    {
        if(inRectangle(regionRectangle[i],latitude,longitude))
        {
            for (j = 0; j < excludeRectangle.length; j++)
            {
                if (inRectangle(excludeRectangle[j],latitude,longitude))
                {
                    return false;
                }
            }
            return true;
        }
    }
    return false;
}
function inRectangle(rect,latitude,longitude) {
    return rect.west <= longitude && rect.east >= longitude && rect.north >= latitude && rect.south <= latitude;
}