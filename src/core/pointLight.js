"use strict";

/**
 A light source that originates from a single point and spreads outward in all directions, to illuminate
 associated {{#crossLink "GameObject"}}GameObjects{{/crossLink}}.

 <ul>

 <li>PointLights are grouped, along with other light source types, within {{#crossLink "Lights"}}Lights{{/crossLink}} components,
 which are associated with {{#crossLink "GameObject"}}GameObjects{{/crossLink}}.</li>

 <li>Within XEO Engine's Phong lighting calculations, PointLight {{#crossLink "PointLight/diffuse:property"}}{{/crossLink}} and
 {{#crossLink "PointLight/specular:property"}}{{/crossLink}} are multiplied by {{#crossLink "Material"}}Material{{/crossLink}}
 {{#crossLink "Material/diffuse:property"}}{{/crossLink}} and {{#crossLink "Material/specular:property"}}{{/crossLink}},
 respectively.</li>

 <li>PointLights have {{#crossLink "PointLight/constantAttenuation:property"}}{{/crossLink}}, {{#crossLink "PointLight/linearAttenuation:property"}}{{/crossLink}} and
 {{#crossLink "PointLight/quadraticAttenuation:property"}}{{/crossLink}} factors, which indicate how their intensity attenuates over distance.</li>

 <li>Diffuse, specular and ambient lighting may also be enabled or disabled for specific {{#crossLink "GameObject"}}GameObjects{{/crossLink}}
 via {{#crossLink "Modes/diffuse:property"}}{{/crossLink}}, {{#crossLink "Modes/diffuse:property"}}{{/crossLink}}
 and {{#crossLink "Modes/ambient:property"}}{{/crossLink}} flags on {{#crossLink "Modes"}}Modes{{/crossLink}} components.</li>

 </ul>

 <img src="http://www.gliffy.com/go/publish/image/7096613/L.png"></img>

 ### Example

 The example below creates a {{#crossLink "GameObject"}}{{/crossLink}} that has a {{#crossLink "Geometry"}}{{/crossLink}},
 a {{#crossLink "Material"}}{{/crossLink}}, and a {{#crossLink "Lights"}}{{/crossLink}} that has a {{#crossLink "PointLight"}}{{/crossLink}}.

 ```` javascript
 var scene = new XEO.Scene();

 var material = new XEO.Material(scene, {
        diffuse: [1, 1, 1],
        specular: [1.1, 1]
 });

 // Within XEO Engine's Phong shading calculations, the PointLight's diffuse and
 // specular colors will be multiplied by the Material's diffuse and specular colors.

 // Our PointLight's intensity does not attenuate over distance.

 var pointLight = new XEO.PointLight(scene, {
        pos: [0, 100, 100],
        diffuse: [0.5, 0.7, 0.5],
        specular: [1.0, 1.0, 1.0],
        constantAttenuation: 0,
        linearAttenuation: 0,
        quadraticAttenuation: 0,
        space: "view"
 });

 var lights = new XEO.Lights(scene, {
        lights: [
            pointLight
        ]
 });

 var geometry = new XEO.Geometry(scene);  // Defaults to a 2x2x2 box

 var object = new XEO.GameObject(scene, {
        lights: lights,
        material: material,
        geometry: geometry
  });
 ````

 As with all components, we can <a href="XEO.Component.html#changeEvents" class="crosslink">observe and change properties</a> on PointLights like so:

 ````Javascript
 var handle = pointLight.on("diffuse", // Attach a change listener to a property
 function(value) {
        // Property value has changed
    });

 pointLight.diffuse = [0.4, 0.6, 0.4]; // Fires the change listener

 pointLight.off(handle); // Detach the change listener
 ````
 @class PointLight
 @module XEO
 @constructor
 @extends Component
 @param [scene] {Scene} Parent {{#crossLink "Scene"}}Scene{{/crossLink}}, creates this PointLight within the
 default {{#crossLink "Scene"}}Scene{{/crossLink}} when omitted
 @param [cfg] {*} The PointLight configuration
 @param [cfg.id] {String} Optional ID, unique among all components in the parent {{#crossLink "Scene"}}Scene{{/crossLink}}, generated automatically when omitted.
 @param [cfg.meta] {String:Object} Optional map of user-defined metadata to attach to this PointLight.
 @param [cfg.pos=[ 1.0, 1.0, 1.0 ]] {Array(Number)} Position, in either World or View space, depending on the value of the **space** parameter.
 @param [cfg.diffuse=[0.7, 0.7, 0.8 ]] {Array(Number)} Diffuse color of this PointLight.
 @param [cfg.specular=[1.0, 1.0, 1.1 ]] {Array(Number)} Specular color of this PointLight.
 @param [cfg.constantAttenuation=0] {Number} Constant attenuation factor.
 @param [cfg.linearAttenuation=0] {Number} Linear attenuation factor.
 @param [cfg.quadraticAttenuation=0] {Number} Quadratic attenuation factor.
 @param [cfg.space="view"] {String} The coordinate system this PointLight is defined in - "view" or "space".
 */
XEO.PointLight = XEO.Component.extend({

    className: "XEO.PointLight",

    type: "light",

    _init: function (cfg) {
        this.mode = "point";
        this._core.mode = this.mode;
        this.pos = cfg.pos;
        this.diffuse = cfg.diffuse;
        this.specular = cfg.specular;
        this.constantAttenuation = cfg.constantAttenuation;
        this.linearAttenuation = cfg.linearAttenuation;
        this.quadraticAttenuation = cfg.quadraticAttenuation;
        this.space = cfg.space;
    },

    /**
     The position of this PointLight.

     This will be either World- or View-space, depending on the value of {{#crossLink "PointLight/space:property"}}{{/crossLink}}.

     Fires a {{#crossLink "PointLight/pos:event"}}{{/crossLink}} event on change.

     @property pos
     @default [1.0, 1.0, 1.0]
     @type Array(Number)
     */
    set pos(value) {
        value = value || [ 1.0, 1.0, 1.0 ];
        this._core.pos = value;
        this._renderer.imageDirty = true;

        /**
         Fired whenever this PointLight's  {{#crossLink "PointLight/pos:property"}}{{/crossLink}} property changes.
         @event pos
         @param value The property's new value
         */
        this.fire("pos", value);
    },

    get pos() {
        return this._core.pos;
    },

    /**
     The diffuse color of this PointLight.

     Fires a {{#crossLink "PointLight/diffuse:event"}}{{/crossLink}} event on change.

     @property diffuse
     @default [0.7, 0.7, 0.8]
     @type Array(Number)
     */
    set diffuse(value) {
        value = value || [0.7, 0.7, 0.8 ];
        this._core.diffuse = value;
        this._renderer.imageDirty = true;

        /**
         Fired whenever this PointLight's  {{#crossLink "PointLight/diffuse:property"}}{{/crossLink}} property changes.
         @event diffuse
         @param value The property's new value
         */
        this.fire("diffuse", value);
    },

    get diffuse() {
        return this._core.diffuse;
    },

    /**
     The specular color of this PointLight.

     Fires a {{#crossLink "PointLight/specular:event"}}{{/crossLink}} event on change.

     @property specular
     @default [0.7, 0.7, 0.8]
     @type Array(Number)
     */
    set specular(value) {
        value = value || [0.7, 0.7, 0.8 ];
        this._core.specular = value;
        this._renderer.imageDirty = true;

        /**
         * Fired whenever this PointLight's  {{#crossLink "PointLight/specular:property"}}{{/crossLink}} property changes.
         * @event specular
         * @param value The property's new value
         */
        this.fire("specular", value);
    },

    get specular() {
        return this._core.specular;
    },

    /**
     The constant attenuation factor for this PointLight.

     Fires a {{#crossLink "PointLight/constantAttenuation:event"}}{{/crossLink}} event on change.

     @property constantAttenuation
     @default 0
     @type Number
     */
    set constantAttenuation(value) {
        value = value || 0.0;
        this._core.constantAttenuation = value;
        this._renderer.imageDirty = true;

        /**
         Fired whenever this PointLight's {{#crossLink "PointLight/constantAttenuation:property"}}{{/crossLink}} property changes.

         @event constantAttenuation
         @param value The property's new value
         */
        this.fire("constantAttenuation", value);
    },

    get constantAttenuation() {
        return this._core.constantAttenuation;
    },

    /**
     The linear attenuation factor for this PointLight.

     Fires a {{#crossLink "PointLight/linearAttenuation:event"}}{{/crossLink}} event on change.

     @property linearAttenuation
     @default 0
     @type Number
     */
    set linearAttenuation(value) {
        value = value || 0.0;
        this._core.linearAttenuation = value;
        this._renderer.imageDirty = true;

        /**
         Fired whenever this PointLight's  {{#crossLink "PointLight/linearAttenuation:property"}}{{/crossLink}} property changes.

         @event linearAttenuation
         @param value The property's new value
         */
        this.fire("linearAttenuation", value);
    },

    get linearAttenuation() {
        return this._core.linearAttenuation;
    },

    /**
     The quadratic attenuation factor for this Pointlight.

     Fires a {{#crossLink "PointLight/quadraticAttenuation:event"}}{{/crossLink}} event on change.

     @property quadraticAttenuation
     @default 0
     @type Number
     */
    set quadraticAttenuation(value) {
        value = value || 0.0;
        this._core.quadraticAttenuation = value;
        this._renderer.imageDirty = true;

        /**
         Fired whenever this PointLight's  {{#crossLink "PointLight/quadraticAttenuation:property"}}{{/crossLink}} property changes.

         @event quadraticAttenuation
         @param value The property's new value
         */
        this.fire("quadraticAttenuation", value);
    },

    get quadraticAttenuation() {
        return this._core.quadraticAttenuation;
    },

    /**
     Indicates which coordinate space this PointLight is in.

     Supported values are:

     <ul>
     <li>"view" - View space, aligned within the view volume as if fixed to the viewer's head</li>
     <li>"world" - World space, fixed within the world, moving within the view volume with respect to camera</li>
     </ul>

     Fires a {{#crossLink "PointLight/space:event"}}{{/crossLink}} event on change.

     @property space
     @default "view"
     @type String
     */
    set space(value) {
        value = value || "view";
        if (value == this._core.space) {
            return;
        }
        this._core.space = value;
        this.fire("dirty", true); // Need to rebuild shader

        /**
         Fired whenever this Pointlight's  {{#crossLink "PointLight/space:property"}}{{/crossLink}} property changes.

         @event space
         @param value The property's new value
         */
        this.fire("space", value);
    },

    get space() {
        return this._core.space;
    },

    _getJSON: function () {
        return {
            mode: this.mode,
            pos: this.pos,
            diffuse: this.diffuse,
            specular: this.specular,
            constantAttenuation: this.constantAttenuation,
            linearAttenuation: this.linearAttenuation,
            quadraticAttenuation: this.quadraticAttenuation,
            space: this.space
        };
    }
});
