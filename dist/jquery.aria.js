/*! jquery-aria (https://github.com/Skateside/jquery-aria#readme) - v0.6.1a - MIT license - 2017-3-26 */
(function ($) {
    "use strict";

// Source: /src/doc/file.js
/**
 * @file
 * This is a jQuery plugin that adds methods for manipulating WAI-ARIA
 * attributes. Unlike other plugins that do similar things, this plugin has been
 * designed to match jQuery's style making it much easier to pick up. The plugin
 * includes:
 * <br><br>
 * <strong>Getting and Setting WAI-ARIA Attributes</strong>
 * <br>[jQuery#aria]{@link external:jQuery#aria} for getting and setting
 * WAI-ARIA attributes.
 * <br>[jQuery#ariaRef]{@link external:jQuery#ariaRef} for getting and setting
 * references to other elements.
 * <br>[jQuery#ariaState]{@link external:jQuery#ariaState} for getting and
 * setting states.
 * <br><br>
 * <strong>Removing WAI-ARIA Attributes</strong>
 * <br>[jQuery#removeAria]{@link external:jQuery#removeAria} for removing
 * WAI-ARIA attributes (aliased as
 * [jQuery#removeAriaRef]{@link external:jQuery#removeAriaRef} and
 * [jQuery#removeAriaState]{@link external:jQuery#removeAriaState}).
 * <br><br>
 * <strong>Adjusting WAI-ARIA Attribute Manipulation</strong>
 * <br>[jQuery.ariaFix]{@link external:jQuery.ariaFix} will convert the names of
 * WAI-ARIA attributes.
 * <br>[jQuery.ariaHooks]{@link external:jQuery.ariaHooks} allow special
 * functionality to be defined for specific WAI-ARIA attributes.
 * <br><br>
 * <strong>Manipulating Landmarks</strong>
 * <br>[jQuery#role]{@link external:jQuery#role},
 * [jQuery#addRole]{@link external:jQuery#addRole} and
 * [jQuery#removeRole]{@link external:jQuery#removeRole} handling WAI-ARIA
 * landmarks.
 * <br><br>
 * <strong>Helper Functions for Common Functionality</strong>
 * <br>[jQuery#identify]{@link external:jQuery#identify} for generating element
 * IDs as necessary.
 * <br>[jQuery#ariaFocusable]{@link external:jQuery#ariaFocusable} for toggling
 * focusability.
 * <br>[jQuery.normaliseAria]{@link external:jQuery.normaliseAria} for
 * simplifying the WAI-ARIA attributes (aliased as
 * [jQuery.normalizeAria]{@link external:jQuery.normalizeAria}).
 * <br><br>
 * The files can be downloaded on
 * [GitHub]{@link https://github.com/Skateside/jquery-aria}.
 *
 * @author James "Skateside" Long <sk85ide@hotmail.com>
 * @version 0.6.1a
 * @license MIT
 */

// Source: /src/doc/external/jQuery.js
/**
 * @external jQuery
 * @see [jQuery]{@link http://jquery.com}
 */

// Source: /src/doc/callback/Attribute_Callback.js
/**
 * The [jQuery#aria]{@link external:jQuery#aria},
 * [jQuery#ariaRef]{@link external:jQuery#ariaRef} and
 * [jQuery#ariaState]{@link external:jQuery#ariaState} methods all take
 * functions to set their value. The functions all have the same signature,
 * described here. It is important to remember that the value this function
 * returns will be treated as if it had originally been passed to the
 * function. See
 * [jQuery#attr]{@link http://api.jquery.com/attr/#attr-attributeName-function}
 * for more information and examples.
 *
 * @callback Attribute_Callback
 * @this     HTMLElement
 *           The element being referenced.
 * @param    {Number} index
 *           The index of the current element from within the overall jQuery
 *           collection.
 * @param    {String|undefined} attr
 *           Current attribute value (undefined if the element does not
 *           currently have the attribute assigned).
 * @return   {String}
 *           The value that should be passed to the function.
 *
 * @example
 * $("#one").aria("label", function (i, attr) {
 *     return "Test";
 * });
 * // is the same as
 * $("#one").aria("label", "Test");
 *
 * @example <caption>Elements without the attribute pass undefined</caption>
 * // Markup is
 * // <div id="one"></div>
 *
 * $("#one").aria("label", function (i, attr) {
 *     return Object.prototype.toString.call(attr);
 * });
 *
 * // Now markup is
 * // <div id="one" aria-label="[object Undefined]"></div>
 */

// Source: /src/doc/typedef/ARIA_state.js
/**
 * A boolean or the string "mixed" (always in lower case). This type will
 * be undefined when trying to read a state that has not been set on the
 * element.
 *
 * @typedef {Boolean|String|undefined} ARIA_state
 *
 * @example
 * // Markup is
 * // <div id="one" aria-checked="true"></div>
 * // <div id="two" aria-checked="false"></div>
 * // <div id="three" aria-checked="mixed"></div>
 * // <div id="four"></div>
 *
 * $("#one").ariaState("checked");   // -> true
 * $("#two").ariaState("checked");   // -> false
 * $("#three").ariaState("checked"); // -> "mixed"
 * $("#four").ariaState("checked");  // -> undefined
 */

// Source: /src/doc/typedef/ARIA_hook.js
/**
 * A hook for a WAI-ARIA attribute. Every property is optional so there is no
 * need to specify one to execute the default functionality.
 * <br><br>
 * Be aware that these hooks only affect the aria methods;
 * [jQuery#attr]{@link http://api.jquery.com/attr/} and
 * [jQuery#prop]{@link http://api.jquery.com/prop/} will not be affected by any
 * changes here. There are similar <code>jQuery.attrHooks</code> and
 * <code>jQuery.propHooks</code> (for set and get) that work in the same way if
 * you need to completely control attribute/property setting.
 *
 * @typedef  {Object}          ARIA_hook
 * @property {ARIA_hook_set}   [set]
 *           Handles setting the attribute.
 * @property {ARIA_hook_get}   [get]
 *           Handles getting the attribute.
 * @property {ARIA_hook_has}   [has]
 *           Handlers checking whether or not the attribute is assigned.
 * @property {ARIA_hook_unset} [unset]
 *           Handles removing the attribute.
 */

/**
 * Handles the setting of a WAI-ARIA attribute. If the function returns a value,
 * that value is used to set the attribute; returning null, undefined, or not
 * returning anything will prevent the normal attribute setting process from
 * completing.
 * <br><br>
 * When setting an attribute, please do not use
 * [jQuery#aria]{@link external:jQuery#aria},
 * [jQuery#ariaRef]{@link external:jQuery#ariaRef} or
 * [jQuery#ariaState]{@link external:jQuery#ariaState} as this can create an
 * infinite loop.
 *
 * @typedef {Function}    ARIA_hook_set
 * @param   {HTMLElement}           element
 *          Element whose attribute should be modified.
 * @param   {Boolean|Number|String} value
 *          Value of the attribute in the form given to the aria function.
 * @param   {String}                attribute
 *          Full attribute name, lower case and including "aria-" prefix.
 * @return  {?}
 *          Possible conversion of the value.
 *
 * @example <caption>Setting fictitious "volume" or "soundsetup" attributes</caption>
 * $.ariaHooks.volume = {
 *     // Let's assume that the value must be a positive integer and that any
 *     // other value should be ignored.
 *     set: function (element, value, attribute) {
 *         var posInt = Math.floor(Math.abs(value));
 *         return isNaN(posInt)
 *             ? undefined
 *             : posInt;
 *     }
 * };
 * $.ariaHooks.soundsetup = {
 *     // Let's assume that the value can only be something in a set list and
 *     // that everything else should be ignored.
 *     set: function (element, value, attribute) {
 *         var values = ["mono", "stereo", "5.1"];
 *         return values.indexOf(value) > -1
 *             ? value
 *             : undefined;
 *     }
 * };
 *
 * // Markup is:
 * // <div id="one"></div>
 * // <div id="two"></div>
 *
 * $("#one").aria({
 *     volume: 5,
 *     soundsetup: "mono"
 * });
 * $("#two").aria({
 *     volume: "loud",
 *     soundsetup: "legendary"
 * });
 *
 * // Now markup is:
 * // <div id="one" aria-volume="5" aria-soundsetup="mono"></div>
 * // <div id="two"></div>
 */

/**
 * Handles the getting of a WAI-ARIA attribute. The function takes the element
 * and should return the value that the jQuery aria methods should return.
 * <br><br>
 * When getting an attribute, please do not use
 * [jQuery#aria]{@link external:jQuery#aria},
 * [jQuery#ariaRef]{@link external:jQuery#ariaRef} or
 * [jQuery#ariaState]{@link external:jQuery#ariaState} as this can create an
 * infinite loop.
 *
 * @typedef {Function}    ARIA_hook_get
 * @param   {HTMLElement} element
 *          Element whose attribute value should be returned.
 * @param   {String}      attribute
 *          Full attribute name, lower case and including "aria-" prefix.
 * @return  {?Boolean|Number|String}
 *          Value of the attribute.
 *
 * @example <caption>Getting a fictitious "volume" attribute</caption>
 * $.ariaHooks.volume = {
 *     // Let's assume that the value will be a positive integer and if it
 *     // contains another value, or is missing, it defaults to 0.
 *     get: function (element, attribute) {
 *         var value = element.getAttribute(attribute);
 *         return (value === null || isNaN(value) || value < 0)
 *             ? 0
 *             : Math.floor(value);
 *     }
 * };
 *
 * // Markup is:
 * // <div id="one" aria-volume="5"></div>
 * // <div id="two" aria-volume="loud"></div>
 *
 * $("#one").aria("volume"); // -> 5
 * $("#two").aria("volume"); // -> 0
 */

/**
 * Handles checking whether or not the WAI-ARIA attribute exists on the element
 * and it should return a boolean. Currently this functionality is not exposed
 * in an aria method, but the existence of a WAI-ARIA attribute will be checked
 * before getting occurs (and the {@link ARIA_hook_get} function executes).
 *
 * @typedef {Function}    ARIA_hook_has
 * @param   {HTMLElement} element
 *          Element whose attribute should be checked.
 * @param   {String}      attribute
 *          Full attribute name, lower case and including "aria-" prefix.
 * @return  {Boolean}
 *          Whether or not the attribute exists on the element (true if it
 *          does, false otherwise).
 *
 * @example <caption>Checking for a fictitious "volume" attribute</caption>
 * $.ariaHooks.volume = {
 *     get: function (element, attribute) {
 *         console.log("hi");
 *         return element.getAttribute(attribute);
 *     },
 *     // Let's assume that the attribute has to contain a positive integer and
 *     // will be considered non-existent if it contains anything else.
 *     has: function (element, attribute) {
 *         var value = element.getAttribute(attribute);
 *         var intVal = parseInt(value, 10);
 *         return value !== null && intVal === +value && intVal <= 0;
 *     }
 * };
 *
 * // Markup is:
 * // <div id="one" aria-volume="5"></div>
 * // <div id="two" aria-volume="loud"></div>
 *
 * $("#one").aria("volume");
 * // Logs: "hi"
 * // -> "5"
 * $("#two").aria("volume"); // -> undefined
 */

/**
 * Checks to see if the WAI-ARIA attribute should be removed. If the function
 * returns <code>true</code> (or a truthy value) then the attribute will be
 * removed, a falsy value will prevent the attribute being removed through the
 * aria methods (although there is nothing stopping it being removed in another
 * way or even through the function itself).
 * <br><br>
 * When removing an attribute, please do not use
 * [jQuery#removeAria]{@link external:jQuery#removeAria},
 * [jQuery#removeAriaRef]{@link external:jQuery#removeAriaRef} or
 * [jQuery#removeAriaState]{@link external:jQuery#removeAriaState} as this can
 * create an infinite loop.
 *
 * @typedef {Function}    ARIA_hook_unset
 * @param   {HTMLElement} element
 *          Element whose attribute should be removed.
 * @param   {String}      attribute
 *          Full attribute name, lower case and including "aria-" prefix.
 * @return  {Boolean}
 *          Whether or not the attribute should be removed.
 *
 * @example <caption>Removing a fictitious "volume" attribute</caption>
 * $.ariaHooks.volume = {
 *     // Let's assume that there is also a "soundsetup" attribute and that it
 *     // requires the "volume" attribute to exist, thus if "volume" is removed,
 *     // "soundsetup" should be removed as well.
 *     unset: function (element, attribute) {
 *         element.removeAttribute("aria-soundsetup");
 *         return true;
 *     }
 * };
 *
 * // Markup is:
 * // <div id="one" aria-volume="5" aria-soundsetup="mono"></div>
 *
 * $("#one").removeAria("volume");
 *
 * // Now markup is
 * // <div id="one"></div>
 */

// Source: /src/doc/typedef/jQuery_param.js
/**
 * Any parameter that can be passed to
 * [jQuery's $ function]{@link http://api.jquery.com/jQuery/}. Be aware that
 * if the object (or Array or NodeList) contains multiple elements, only the
 * first will be used when getting information.
 *
 * @typedef {Array|Element|jQuery|NodeList|String} jQuery_param
 */

// Source: /src/global/variables.js


// A simple check to see if there is a global Proxy function and it's native.
// Although this isn't fool-proof, it's a fairly reliable way of checking
// whether or not the browser supports Proxy.
var IS_PROXY_AVAILABLE = (
    typeof window.Proxy === "function"
    && window.Proxy.toString().indexOf("[native code]") > -1
);

// Source: /src/global/identify.js


/**
 * Helper function for identifying the given <code>reference</code>. The ID of
 * the first match is returned - see
 * [jQuery#identify]{@link external:jQuery#identify} for full details.
 *
 * @global
 * @private
 * @param   {jQuery_param} reference
 *          Element to identify.
 * @return  {String}
 *          ID of the element.
 */
var identify = function (reference) {

    return $(reference).identify();

};

// Source: /src/global/identity.js
/**
 * An identity function that simply returns whatever it is given without
 * modifying it. This can be useful for cases when a modification function is
 * needed but optional.
 *
 * @global
 * @private
 * @param   {?} x
 *          Object to return.
 * @return  {?}
 *          Original object.
 *
 * @example
 * identity("a");           // -> "a"
 * identity("a", "b");      // -> "a", only first argument is returned.
 * identity.call("b", "a"); // -> "a", context has no effect.
 */
var identity = function (x) {

    return x;

};

// Source: /src/global/interpretString.js
/**
 * Interprets the given object as a string. If the object is <code>null</code>
 * or <code>undefined</code>, an empty string is returned.
 *
 * @global
 * @private
 * @param   {?} string
 *          Object to interpret.
 * @return  {String}
 *          Interpreted string.
 *
 * @example
 * interpretString("1");       // -> "1"
 * interpretString(1);         // -> "1"
 * interpretString([1, 2]);    // -> "1,2"
 * interpretString(null);      // -> ""
 * interpretString(undefined); // -> ""
 * interpretString();          // -> ""
 */
var interpretString = function (string) {

    return (string === null || string === undefined)
        ? ""
        : String(string);

};

// Source: /src/global/isElement.js
/**
 * Returns <code>true</code> if the given <code>element</code> is an HTML
 * element.
 *
 * @global
 * @private
 * @param   {?} element
 *          Object to test.
 * @return  {Boolean}
 *          true if <code>element</code> is an HTMLElement.
 *
 * @example
 * isElement(document.createElement("div")); // -> true
 * isElement(document.body); // -> true
 * isElement(document.createTextNode("")); // -> false
 * isElement($("body")); // -> false
 * isElement($("body")[0]); // -> true
 */
var isElement = function (element) {

    return (/^\[object\sHTML[A-Za-z]+Element\]$/).test(element);

};

// Source: /src/global/memoise.js


/**
 * Modifies a function so that the results are retrieved from a cache if
 * possible rather than from executing the function again. The cache is publicly
 * exposed (as the property <code>cache</code>) to allow it to be cleared,
 * forcing the function to re-execute.
 * <br><br>
 * If defined, the <code>resolver</code> is passed the same arguments as the
 * <code>handler</code>; it should return a string and that string will be used
 * as the key for <code>cache</code>. If a <code>resolver</code> isn't defined,
 * or isn't a function, the arguments are simply joined together as a
 * comma-separated string.
 *
 * @global
 * @private
 * @param   {Function} handler
 *          Function to convert.
 * @param   {Function} [resolver]
 *          Optional function for working out the key for the cache.
 * @return  {Function}
 *          Converted function.
 *
 * @example <caption>Basic example</caption>
 * var increase = function (number) {
 *     console.log(number);
 *     return number + 1;
 * };
 * var memIncrease = memoise(increase);
 *
 * memIncrease(1);
 * // Logs: 1
 * // -> 2
 * memIncrease(1); // -> 2
 * memincrease(2);
 * // Logs: 2
 * // -> 3
 * memIncrease(1); // -> 1
 * memIncrease.cache; // -> {"1": 2, "2": 3}
 *
 * @example <caption>Specifying a resolver</caption>
 * var sum = function (numbers) {
 *     return numbers.reduce(function (prev, curr) {
 *         return prev + curr;
 *     }, 0);
 * };
 * var memSum = memoise(sum, function (numbers) {
 *     return JSON.stringify(numbers);
 * });
 * memSum([1, 2, 3]); // -> 6
 * memSum.cache; // -> {"[1,2,3]": 6}
 */
var memoise = function (handler, resolver) {

    var hasOwn = Object.prototype.hasOwnProperty;
    var slice = Array.prototype.slice;
    var memoised = function mem() {

        var args = slice.call(arguments);
        var key = typeof resolver === "function"
            ? resolver.apply(undefined, args)
            : args.join(",");
        var response = mem.cache[key];
console.log("memoise() key = " + key + " and response = " + (response === undefined ? "(undefined)" : response));
        if (!hasOwn.call(mem.cache, key)) {

            response = handler.apply(this, args);
            mem.cache[key] = response;

        }

        return response;

    };

    memoised.cache = {};

    return memoised;

};

// Source: /src/global/normalise.js


/**
 * Normalises a WAI-ARIA attribute name so that it's always lower case and
 * always stars with <code>aria-</code>. If the unprefixed value appears in
 * [jQuery.ariaFix]{@link external:jQuery.ariaFix} then the mapped version is
 * used before being prefixed.
 * <br><br>
 * The results of this function are cached to help reduce processing. This is
 * exposed as <code>jQuery.normaliseAria.cache</code> if needed but there is no
 * need to clear the cache after modifying
 * [jQuery.ariaFix]{@link external:jQuery.ariaFix} - changes are automatically
 * considered in the caching process.
 * <br><br>
 * This function is aliased as
 * [jQuery.normalizeAria]{@link external:jQuery.normalizeAria}.
 *
 * @function
 * @alias    external:jQuery.normaliseAria
 * @memberof external:jQuery
 * @param    {String} name
 *           Attribute name to normalise.
 * @return   {String}
 *           Normalised attribute name.
 * @property {Object.<String>} cache
 *           The cache of requests to responses.
 *
 * @example <caption>Basic example</caption>
 * $.normaliseAria("label");      // -> "aria-label"
 * $.normaliseAria("LABEL");      // -> "aria-label"
 * $.normaliseAria("aria-label"); // -> "aria-label"
 * $.normaliseAria();             // -> "aria-"
 *
 * @example <caption>Alias</caption>
 * $.normalizeAria("label");      // -> "aria-label"
 * $.normalizeAria("LABEL");      // -> "aria-label"
 * $.normalizeAria("aria-label"); // -> "aria-label"
 * $.normalizeAria();             // -> "aria-"
 *
 * @example <caption>Mapped attribute</caption>
 * // $.ariaFix = {labeledby: "labelledby"}
 * $.normaliseAria("labeledby");      // -> "aria-labelledby"
 * $.normaliseAria("LABELEDBY");      // -> "aria-labelledby"
 * $.normaliseAria("aria-labeledby"); // -> "aria-labelledby"
 *
 * @example <caption>The cache</caption>
 * $.normaliseAria("busy");    // -> "aria-busy"
 * $.normaliseAria("busy");    // -> "aria-busy" (from cache)
 * $.normaliseAria("checked"); // -> "aria-checked"
 * $.normaliseAria("busy");    // -> "aria-busy" (from cache)
 * $.normaliseAria.cache;
 * // -> {"busy": "aria-busy", "checked": "aria-checked"}
 */
var normalise = memoise(
    function (name) {

        var prefix = "aria-";
        var lower = interpretString(name).toLowerCase();
        var full = startsWith.call(lower, prefix)
            ? lower
            : prefix + lower;
        var stem = full.slice(prefix.length);
        var map = $.ariaFix[stem];

        if (map) {

            stem = map;
            full = prefix + stem;

        }

        return full;

    },
    IS_PROXY_AVAILABLE
        ? identity
        : function (name) {

            return name + "|" + JSON.stringify($.ariaFix);

        }
);

// Source: /src/global/startsWith.js


/**
 * A fallback for older browsers that do not understand
 * [String#startsWith]{@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith}
 * without modifiying <code>String.prototype</code> unnecessarily.
 *
 * @global
 * @private
 * @function
 * @param    {String} text
 *           String to search for.
 * @param    {Number} [offset=0]
 *           Offset from which to start.
 * @return   {Boolean}
 *           True if the string starts with <code>text</code>, false otherwise.
 *
 * @example
 * startsWith.call("abcdef", "abc"); // -> true
 */
var startsWith = String.prototype.startsWith || function (text, offset) {

    return this.indexOf(text, offset) === 0;

};

// Source: /src/global/toWords.js


/**
 * Converts the given string into an array of the words. The <code>string</code>
 * argument is converted into a string before being split - see
 * {@link interpretString} for more information.
 *
 * @global
 * @private
 * @param   {String} string
 *          String (or other variable type) to break into words.
 * @return  {Array.<String>}
 *          Words from the string.
 *
 * @example
 * toWords("abc def");  // -> ["abc", "def"]
 * toWords("abc  def"); // -> ["abc", "def"]
 * toWords("")          // -> []
 * toWords("   ");      // -> []
 */
var toWords = function (string) {

    return interpretString(string).split(/\s+/).filter(identity);

};

// Source: /src/global/handlers.js
var HANDLER_PROPERTY = "property";
var HANDLER_REFERENCE = "reference";
var HANDLER_STATE = "state";

/**
 * Handlers for properties, references and states. Each handler has at least a
 * <code>get</code> and <code>set</code> method to write and read the values.
 * <code>has</code> methods check whether the property exists,
 * <code>unset</code> removes the property.
 *
 * {@link handlers.reference} and {@link handlers.state} defer to
 * {@link handlers.property} (they don't inherit from {@link handlers.property}
 * but they may do in another implementation - any functionality they don't have
 * will be taken from {@link handlers.property}).
 *
 * @global
 * @namespace
 * @private
 */
var handlers = {};

// Source: /src/global/handlers/property.js


/**
 * Handles WAI-ARIA properties without modifying the values any more than it
 * needs to. These methods also act as the fallback for other namespaces such as
 * {@link handlers.reference} and {@link handlers.state}.
 * <br>{@link handlers.property.parse} parses the attribute name.
 * <br>{@link handlers.property.get} gets the value of the property.
 * <br>{@link handlers.property.set} sets a property.
 * <br>{@link handlers.property.has} checks to see if the property exists.
 * <br>{@link handlers.property.unset} removes the property.
 *
 * @alias     property
 * @memberof  handlers
 * @namespace
 * @private
 */
handlers[HANDLER_PROPERTY] = {

    /**
     * Parses the name and returns an object with the normalised name (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria} and the
     * un-prefixed attribute name.
     *
     * @param  {String} name
     *         Attribute name to parse.
     * @return {Object.<String>}
     *         An object with "full" and "stem" properties.
     *
     * @example
     * handlers.property.parse("busy");
     * // -> {full: "aria-busy", stem: "busy"}
     */
    parse: function (name) {

        var normal = normalise(name);

        return {
            full: normal,
            stem: normal.slice(5)
        };

    },

    /**
     * Sets the property of an element. The <code>value</code> is unchanged
     * (other than normal string coercion) and the <code>name</code> is
     * normalised into a WAI-ARIA property (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}).
     * <br><br>
     * If <code>element</code> is not an element (see {@link isElement}) then no
     * action will be taken.
     * <br><br>
     * If <code>value</code> is a function, it is treated like an
     * {@link Attribute_callback}. This is for consistency with
     * [jQuery#attr]{@link http://api.jquery.com/attr/}.
     * <br><br>
     * A <code>convert</code> function can also be passed. That function will
     * convert <code>value</code> (if <code>value</code> is a function,
     * <code>convert</code> will convert the result) before assigning it. If
     * <code>convert</code> is ommitted or not a function then {@link identity}
     * is used so <code>value</code> will not be changed.
     *
     * @private
     * @param   {Element}  element
     *          Element to have a property set.
     * @param   {String}   name
     *          WAI-ARIA property to set.
     * @param   {?}        value
     *          Value of the property.
     * @param   {Number}   [index]
     *          Optional index of <code>element</code> within the jQuery object.
     *          This is needed to keep consistency with the
     *          [jQuery#attr]{@link http://api.jquery.com/attr/} function and
     *          should be derived rather than manually passed.
     * @param   {Function} [convert=identity]
     *          Optional conversion process. If ommitted, no conversion occurs.
     *
     * @example <caption>Setting a property</caption>
     * // Markup is:
     * // <div id="one"></div>
     *
     * var element = document.getElementById("one");
     * handlers.property.set(element, "label", "test");
     *
     * // Now markup is:
     * // <div id="one" aria-label="test"></div>
     *
     * @example <caption>Setting a property using a function</caption>
     * // Markup is:
     * // <div id="one" aria-label="test"></div>
     *
     * var element = document.getElementById("one");
     * handlers.property.set(element, "label", function (i, attr) {
     *     return this.id + "__" + i + "__" + attr;
     * }, 0);
     *
     * // Now markup is:
     * // <div id="one" aria-label="one__0__test"></div>
     *
     * @example <caption>Converting the result</caption>
     * // Markup is:
     * // <div id="one" aria-label="test"></div>
     *
     * var element = document.getElementById("one");
     * handlers.property.set(element, "label", function (i, attr) {
     *     return this.id + "__" + i + "__" + attr;
     * }, 0, function (value) {
     *     return value.toUpperCase();
     * });
     *
     * // Now markup is:
     * // <div id="one" aria-label="ONE__0__TEST"></div>
     */
    set: function (element, name, value, index, convert) {

        var prop = handlers[HANDLER_PROPERTY].parse(name);
        var hook = $.ariaHooks[prop.stem];

        if (isElement(element)) {

            if ($.isFunction(value)) {

                value = value.call(
                    element,
                    index,
                    element.getAttribute(prop.full)
                );

            }

            if (!$.isFunction(convert)) {
                convert = identity;
            }

            if (value !== undefined && value !== null) {

                if (hook && hook.set) {
                    value = hook.set(element, value, prop.full);
                }

                value = convert(value);

                if (value !== undefined && value !== null) {
                    element.setAttribute(prop.full, interpretString(value));
                }

            }

        }

    },

    /**
     * Checks to see if the given <code>name</code> exists on the given
     * <code>element</code>. The <code>name</code> is always normalised (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}) and if
     * <code>element</code> is not an element (see {@link isElement}) then
     * <code>false</code> will always be returned.
     *
     * @private
     * @param   {Element} element
     *          Element to test.
     * @param   {String}  name
     *          WAI-ARIA property to check.
     * @return  {Boolean}
     *          Whether or not the element has the given property.
     *
     * @example
     * // Markup is:
     * // <div id="one" aria-label="test"></div>
     *
     * var element = document.getElementById("one");
     * handlers.property.has(element, "label"); // -> true
     * handlers.property.has(element, "busy");  // -> false
     */
    has: function (element, name) {

        var prop = handlers[HANDLER_PROPERTY].parse(name);
        var hook = $.ariaHooks[prop.stem];

        return isElement(element)
            ? (hook && hook.has)
                ? hook.has(element, prop.full)
                : element.hasAttribute(prop.full)
            : false;

    },

    /**
     * Gets the value of the WAI-ARIA property from the given
     * <code>element</code> and returns it unchanged. The <code>name</code> is
     * normalised (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}). If
     * <code>element</code> is not an element (see {@link isElement}) or
     * <code>name</code> is not recognised (see
     * {@link handlers.property.has}) then <code>undefined</code> is returned.
     *
     * @private
     * @param   {Element}          element
     *          Element to access.
     * @param   {String}           name
     *          WAI-ARIA property to access.
     * @return  {String|undefined}
     *          WAI-ARIA attribute or undefined if the attribute isn't set.
     *
     * @example
     * // Markup is:
     * // <div id="one" aria-label="test"></div>
     *
     * var element = document.getElementById("one");
     * handlers.property.get(element, "label"); // -> "test"
     * handlers.property.get(element, "busy"); // -> undefined
     */
    get: function (element, name) {

        var handler = handlers[HANDLER_PROPERTY];
        var prop = handler.parse(name);
        var hook = $.ariaHooks[prop.stem];
        var response = handler.has(element, name)
            ? (hook && hook.get)
                ? hook.get(element, prop.full)
                : element.getAttribute(prop.full)
            : undefined;

        // getAttribute can return null, normalise to undefined.
        return response === null
            ? undefined
            : response;

    },

    /**
     * Removes a WAI-ARIA attribute from the given <code>element</code>. The
     * <code>name</code> if normalised (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}) and if
     * <code>element</code> is not an element (see {@link isElement}) then no
     * action is taken.
     *
     * @private
     * @param   {Element} element
     *          Element to modify.
     * @param   {String}  name
     *          WAI-ARIA attribute to remove.
     *
     * @example
     * // Markup is:
     * // <div id="one" aria-label="test"></div>
     *
     * var element = document.getElementById("one");
     * handlers.property.unset(element, "label");
     *
     * // Now markup is:
     * // <div id="one"></div>
     */
    unset: function (element, name) {

        var prop = handlers[HANDLER_PROPERTY].parse(name);
        var hook = $.ariaHooks[prop.stem];

        if (isElement(element)) {

            if (!hook || !hook.unset || hook.unset(element, prop.full)) {
                element.removeAttribute(prop.full);
            }

        }

    }

};

// Source: /src/global/handlers/reference.js


/**
 * Handles modifying WAI-ARIA references. Unlike {@link handlers.property}, this
 * will create references to elements and return them. The only defined methods
 * are:
 * <br>{@link handlers.reference.set} sets a reference.
 * <br>{@link handlers.reference.get} gets a reference.
 *
 * @alias     reference
 * @memberof  handlers
 * @namespace
 * @private
 */
handlers[HANDLER_REFERENCE] = {

    /**
     * Adds the WAI-ARIA reference to <code>element</code>. This differs from
     * {@link handlers.property.set} in that <code>reference</code> is passed
     * through [jQuery's $ function]{@link http://api.jquery.com/jquery/} and
     * identified (see [jQuery#identify]{@link external:jQuery#identify}) with
     * the ID of the first match being used. There is also no
     * <code>convert</code> parameter.
     * <br><br>
     * The <code>name</code> is still normalised (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}). If
     * <code>element</code> is not an element (see {@link isElement}) then no
     * action is taken.
     *
     * @private
     * @param   {Element}      element
     *          Element to modify.
     * @param   {String}       name
     *          WAI-ARIA attribute to set.
     * @param   {jQuery_param} reference
     *          Element to reference.
     * @param   {Number}       index
     *          Index of <code>element</code> within the collection.
     *
     * @example
     * // Markup is:
     * // <div class="one"></div>
     * // <div class="two"></div>
     *
     * var element = document.querySelector(".one");
     * handlers.reference.set(element, "labelledby", ".two");
     *
     * // Now markup is:
     * // <div class="one" aria=labelledby="anonymous0"></div>
     * // <div class="two" id="anonymous0"></div>
     */
    set: function (element, name, reference, index) {

        handlers[HANDLER_PROPERTY].set(
            element,
            name,
            reference,
            index,
            identify
        );

    },

    /**
     * Gets the reference from the given <code>element</code> and returns it as
     * a <code>jQuery</code> object. This differs from
     * {@link handlers.property.get} in that the match is assumed to be an ID
     * and a DOM lookup is done based upon that. The <code>name</code> is still
     * normalised (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}). If the
     * WAI-ARIA attribute is not found (see {@link handlers.property.has} then
     * <code>undefined</code> is returned.
     *
     * @private
     * @param   {Element}          element
     *          Element to check.
     * @param   {String}           name
     *          WAI-ARIA reference.
     * @return  {jQuery|undefined}
     *          jQuery object representing the reference or undefined if the
     *          attribute isn't set.
     *
     * @example
     * // Markup is:
     * // <div id="one" aria=labelledby="two"></div>
     * // <div id="two"></div>
     *
     * var element = document.getElementById("one");
     * handlers.reference.get(element, "labelledby");
     * // -> $(<div id="two">)
     * handlers.reference.get(element, "controls");
     * // -> undefined
     */
    get: function (element, name) {

        var handler = handlers[HANDLER_PROPERTY];

        return handler.has(element, name)
            ? $("#" + handler.get(element, name))
            : undefined;

    }

};

// Source: /src/global/handlers/state.js


var REGEXP_BOOLEAN = /^(?:true|false)$/;
var VALUE_MIXED = "mixed";

/**
 * Handles WAI-ARIA states. This differs from {@link handlers.property} in that
 * values are coerced into booleans before being set and a boolean (or the
 * string "mixed") will be returned.
 * <br>{@link handlers.state.read} converts the value into a boolean.
 * <br>{@link handlers.state.set} sets the state.
 * <br>{@link handlers.state.get} gets the state.
 *
 * @alias     state
 * @memberof  handlers
 * @namespace
 * @private
 */
handlers[HANDLER_STATE] = {

    /**
     * Reads the raw value and converts it into a boolean or the string
     * <code>"mixed"</code> (always lower case). If <code>raw</code> cannot be
     * correctly converted, it is assumed to be <code>true</code>.
     *
     * @private
     * @param   {?} raw
     *          Value to read.
     * @return  {Boolean|String}
     *          Converted value.
     *
     * @example <caption>Converting values</caption>
     * handlers.state.read(true);    // -> true
     * handlers.state.read("false"); // -> false
     * handlers.state.read("1");     // -> true
     * handlers.state.read(0);       // -> false
     * handlers.state.read("mixed"); // -> "mixed"
     *
     * @example <caption>Unrecognised values default to true</caption>
     * handlers.state.read("2");      // -> true
     * handlers.state.read(-1);       // -> true
     * handlers.state.read([]);       // -> true
     * handlers.state.read("mixed."); // -> true
     */
    read: function readState(raw) {

        var state = true;

        switch (typeof raw) {

        case "boolean":

            state = raw;
            break;

        case "string":

            raw = raw.toLowerCase();

            if (raw === VALUE_MIXED) {
                state = raw;
            } else if (raw === "1" || raw === "0") {
                state = readState(+raw);
            } else if (REGEXP_BOOLEAN.test(raw)) {
                state = raw === "true";
            }

            break;

        case "number":

            if (raw === 0 || raw === 1) {
                state = !!raw;
            }

            break;

        }

        return state;

    },

    /**
     * Sets the WAI-ARIA state defined in <code>name</code> on the given
     * <code>element</code>. This differs from {@link handlers.property.set} in
     * that <code>state</code> is converted into a boolean or
     * <code>"mixed"</code> before being assigned (see
     * {@link handlers.state.read}) and there is no <code>convert</code>
     * paramter. The <code>name</code> is still normalised (see
     * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}).
     *
     * @private
     * @param   {Element} element
     *          Element to modify.
     * @param   {String}  name
     *          WAI-ARIA attribute to set.
     * @param   {?}       state
     *          State to set.
     * @param   {Number}  index
     *          Index of <code>element</code> within the collection.
     *
     * @example
     * // Markup is:
     * // <div id="one"></div>
     * // <div id="two"></div>
     *
     * var one = document.getElementById("one");
     * var two = document.getElementById("two");
     * handlers.state.set(one, "busy", true);
     * handlers.state.set(two, "checked", "mixed");
     *
     * // Now markup is:
     * // <div id="one" aria-busy="true"></div>
     * // <div id="two" aria-checked="mixed"></div>
     */
    set: function (element, name, state, index) {

        handlers[HANDLER_PROPERTY].set(
            element,
            name,
            state,
            index,
            handlers[HANDLER_STATE].read
        );

    },

    /**
     * Reads the WAI-ARIA state on <code>element</code>. This differs from
     * {@link handlers.property.get} in that the result is converted into a
     * boolean or the strign `"mixed"` before being returned. The
     * <code>name</code> is still normalised (see {@link jQuery.normaliseAria}).
     *
     * @private
     * @param   {Element}    element
     *          Element to access.
     * @param   {String}     name
     *          WAI-ARIA state to read.
     * @return  {ARIA_state}
     *          State of the WAI-ARIA property.
     *
     * @example
     * // Markup is:
     * // <div id="one" aria-busy="true" aria-checked="mixed"></div>
     *
     * var element = document.getElementById("one");
     * handlers.state.get(element, "busy");     // -> true
     * handlers.state.get(element, "checked");  // -> "mixed"
     * handlers.state.get(element, "disabled"); // -> undefined
     */
    get: function (element, name) {

        var handler = handlers[HANDLER_PROPERTY];
        var state;
        var value;

        if (handler.has(element, name)) {

            value = handler.get(element, name).toLowerCase();
            state = value === VALUE_MIXED
                ? value
                : (REGEXP_BOOLEAN.test(value) && value === "true");

        }

        return state;

    }

};

// Source: /src/global/access.js


/**
 * This function handles all the heavy lifting of getting or setting WAI-ARIA
 * attributes. It is designed to be all that's necessary for
 * [jQuery#aria]{@link external:jQuery#aria},
 * [jQuery#ariaRef]{@link external:jQuery#ariaRef} and
 * [jQuery#ariaState]{@link external:jQuery#ariaState}. This function will check
 * its arguments to determine whether it should be used as a getter or a setter
 * and passes the appropriate arguments to the {@link handlers} methods based on
 * <code>type</code> (which will default to {@link handlers.property} if
 * ommitted or not recognised).
 * <br><br>
 * The return value is based on the type of action being performed. If this
 * function is setting then a jQuery object of the matches is returned (which is
 * almost always <code>jQelements</code>); if the function is a getter then the
 * results are returned for the first element in <code>jQelements</code>.
 * <br><br>
 * Although this description is not especially extensive, the code should be
 * very easy to follow and commented should there be any need to modify it. Once
 * the correct arguments are being passed to the appropriate {@link handlers}
 * method, they will take care of the rest.
 *
 * @global
 * @private
 * @param   {jQuery}            jQelements
 *          jQuery object to modify/access.
 * @param   {Object|String}     property
 *          Either WAI-ARIA names and values or the WAI-ARIA property name.
 * @param   {?}                 [value]
 *          Value to set.
 * @param   {String}            [type="property"]
 *          Optional attribute type.
 * @return  {jQuery|ARIA_state}
 *          Either the jQuery object on which WAI-ARIA properties were set or
 *          the values of the WAI-ARIA properties.
 *
 * @example <caption>Setting a single property</caption>
 * // Markup is
 * // <div id="one"></div>
 *
 * var jQone = $("#one");
 * access(jQone, "controls", "two"); // -> jQuery(<div id="one">)
 *
 * // Now markup is
 * // <div id="one" aria-controls="two">
 *
 * @example <caption>Setting multiple references</caption>
 * // Markup is
 * // <div id="one"></div>
 * // <div id="two"></div>
 *
 * var jQone = $("#one");
 * access(jQone, {
 *     controls: $("div").eq(1)
 * }, "reference"); // -> jQuery(<div id="one">)
 *
 * // Now markup is
 * // <div id="one" aria-controls="two">
 * // <div id="two"></div>
 *
 * @example <caption>Getting a state</caption>
 * // Markup is
 * // <div id="one" aria-busy="true"></div>
 *
 * var jQone = $("#one");
 * access(jQone, "busy", undefined, "state"); // -> true
 */
function access(jQelements, property, value, type) {

    var tempProperty = property;
    var isPropertyObject = $.isPlainObject(property);
    var isGet = value === undefined && !isPropertyObject;

    // Make sure the property value is in the expected format: an object for
    // setting and a string for getting.
    if (!isGet && !isPropertyObject) {

        property = {};
        property[tempProperty] = value;

    }

    // If we don't have or don't recognise the type, default to "property".
    if (!type || !handlers[type]) {
        type = HANDLER_PROPERTY;
    }

    return isGet
        ? handlers[type].get(jQelements[0], property)
        : jQelements.each(function (index, element) {

            $.each(property, function (key, val) {
                handlers[type].set(element, key, val, index);
            });

        });

}

// Source: /src/global/removeAttribute.js



/**
 * Removes the named WAI-ARIA attribute from all elements in the current
 * collection. The <code>name</code> is normalised (see
 * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}). This function
 * is aliased as [jQuery#removeAriaRef]{@link external:jQuery#removeAriaRef} and
 * [jQuery#removeAriaState]{@link external:jQuery#removeAriaState}.
 *
 * @alias    removeAria
 * @memberof external:jQuery
 * @instance
 * @param    {String} name
 *           WAI-ARIA attribute to remove.
 * @return   {jQuery}
 *           jQuery attribute representing the elements modified.
 *
 * @example
 * // Markup is
 * // <div id="one" aria-busy="true"></div>
 *
 * $("#one").removeAria("busy"); // -> jQuery(<div id="one">)
 *
 * // Now markup is:
 * // <div id="one"></div>
 */
function removeAttribute(name) {

    return this.each(function (ignore, element) {
        handlers[HANDLER_PROPERTY].unset(element, name);
    });

}

// Source: /src/member/normaliseAria.js


/**
 * Alias of [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}
 *
 * @function
 * @alias    external:jQuery.normalizeAria
 * @memberof external:jQuery
 * @param    {String} name
 *           Attribute name to normalise.
 * @return   {String}
 *           Normalised attribute name.
 * @property {Object.<String>} cache
 *           The cache of requests to responses.
 */
$.normalizeAria = normalise;
$.normaliseAria = normalise;

// Source: /src/member/ariaFix.js


/**
 * A map of unprefixed WAI-ARIA attributes that should be converted before being
 * normalised (see [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}).
 *
 * @alias    external:jQuery.ariaFix
 * @memberof external:jQuery
 * @type     {Object.<String>}
 *
 * @example <caption>Correcting a common typo</caption>
 * $.ariaFix.budy = "busy";
 * $.normaliseAria("budy");      // -> "aria-busy"
 * $.normaliseAria("aria-budy"); // -> "aria-busy"
 */
$.ariaFix = {

    // This is the US English spelling but the ccessibility API defined the
    // attribute with the double L.
    // https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
    labeledby: "labelledby"

};

// If Proxy is available, we can use it to check whenever $.ariaFix is modified
// and invalidate the cache of normalise() when it is. This is a lot more
// efficient than always converting $.ariaFix to a JSON string to ensure the
// cache is accurate.
if (IS_PROXY_AVAILABLE) {

    $.ariaFix = new Proxy($.ariaFix, {

        set: function (target, name, value) {

            normalise.cache = {};
            target[name] = value;

        }

    });

}

// Source: /src/member/ariaHooks.js


/**
 * A collection of hooks that change the behaviour of attributes being set,
 * retrieved, checked or removed (called [set]{@link ARIA_hook_set},
 * [get]{@link ARIA_hook_get}, [has]{@link ARIA_hook_has},
 * [unset]{@link ARIA_hook_unset} - see {@link ARIA_hook} for full details). The
 * name of the hook is always the un-prefixed WAI-ARIA attribute in lower case
 * after any mapping has occurred (see
 * [jQuery.ariaFix]{@link external:jQuery.ariaFix}). If you are ever in doubt,
 * the easiest way to know the key is to slice the normalised value:
 * <code>$.normaliseAria(__WAI-ARIA_ATTRIBUTE__).slice(5)</code> (see
 * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria} for more
 * information).
 * <br><br>
 * Do not use these functions to set different WAI-ARIA attributes without
 * setting the one being passed to the aria method; for example: do not create a
 * set for "attribute1" that sets "attribute2" instead - unless you add the same
 * conversion to <code>has</code>, <code>get</code> will not be triggered.
 * Instead, use [jQuery.ariaFix]{@link external:jQuery.ariaFix} to convert the
 * attribute name.
 * <br><br>
 * [jQuery#aria]{@link external:jQuery#aria},
 * [jQuery#ariaRef]{@link external:jQuery#ariaRef},
 * [jQuery#ariaState]{@link external:jQuery#ariaState},
 * [jQuery#removeAria]{@link external:jQuery#removeAria},
 * [jQuery#removeAriaRef]{@link external:jQuery#removeAriaRef} and
 * [jQuery#removeAriaState]{@link external:jQuery#removeAriaState} all run
 * through these hooks (if they exist) and these hooks replace the functionality
 * of manipulating or checking the attributes after any conversion process has
 * occurred within the method itself.
 *
 * @alias    external:jQuery.ariaHooks
 * @memberof external:jQuery
 * @type     {Object.<ARIA_hook>}
 *
 * @example
 * // aria-level should be an integer greater than or equal to 1 so the getter
 * // should return an integer.
 * $.ariaHooks.level = {
 *     set: function (element, value) {
 *         var intVal = Math.max(1, Math.floor(value));
 *         if (!isNaN(intVal)) {
 *             element.setAttribute("aria-level", intVal)
 *         }
 *     },
 *     get: function (element) {
 *         var value = element.getAttribute("aria-level");
 *         var intVal = (Math.max(1, Math.floor(value));
 *         return (value === null || isNaN(intVal))
 *             ? undefined
 *             : intVal;
 *     }
 * };
 */
$.ariaHooks = {

    hidden: {

        // Setting aria-hidden="false" is considered valid, but removing the
        // aria-hidden attribute has the same effect and I think it's tidier.
        // https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
        set: function (element, value, name) {

            var response;

            if (value === false || +value === 0 || (/^false$/i).test(value)) {
                element.removeAttribute(name);
            } else {
                response = value;
            }

            return response;

        }

    }

};

// Source: /src/instance/identify.js



var count = 0;

/**
 * Identifies the first element in the collection by getting its ID. If the
 * element doesn't have an ID attribute, a unique on is generated and assigned
 * before being returned. If the collection does not have a first element then
 * <code>undefined</code> is returned.
 * <br><br>
 * IDs are a concatenation of "anonymous" and a hidden counter that is increased
 * each time. If the ID already exists on the page, that ID is skipped and not
 * assigned to a second element.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    identify
 * @return   {String|undefined}
 *           The ID of the first element or undefined if there is no first
 *           element.
 *
 * @example <caption>Identifying elements</caption>
 * // Markup is
 * // <div class="one"></div>
 * // <span class="one"></span>
 *
 * $(".one").identify(); // -> "anonymous0"
 *
 * // Now markup is:
 * // <div class="one" id="anonymous0"></div>
 * // <span class="one"></span>
 * // Running $(".one").identify(); again would not change the markup.
 *
 * @example <caption>Existing IDs are not duplicated</caption>
 * // Markup is:
 * // <div class="two" id="anonymous1"><!-- manually set --></div>
 * // <div class="two"></div>
 * // <div class="two"></div>
 *
 * $(".two").each(function () {
 *     $(this).identify();
 * });
 *
 * // Now markup is:
 * // <div class="two" id="anonymous1"><!-- manually set --></div>
 * // <div class="two" id="anonymous0"></div>
 * // <div class="two" id="anonymous2"></div>
 */
$.fn.identify = function () {

    var element = this[0];
    var isAnElement = isElement(element);
    var id = isAnElement
        ? element.id
        : undefined;

    if (isAnElement && !id) {

        do {

            id = "anonymous" + count;
            count += 1;

        } while (document.getElementById(id));

        element.id = id;

    }

    return id;

};

// Source: /src/instance/aria.js



/**
 * Gets or sets WAI-ARIA properties. The properties will not be modified any
 * more than they need to be (unlike
 * [jQuery#ariaRef]{@link external:jQuery#ariaRef} or
 * [jQuery#ariaState]{@link external:jQuery#ariaState} which will interpret the
 * values).
 * <br><br>
 * To set WAI-ARIA properties, pass either a
 * <code>property</code>/<code>value</code> pair of arguments or an object
 * containing those pairs. When this is done, the attributes are set on all
 * elements in the collection and the <code>jQuery</code> object is returned to
 * allow for chaining. If <code>value</code> is a function and returns
 * <code>undefined</code> (or nothing) then no action is taken for that element.
 * This can be useful for selectively setting values only when certain criteria
 * are met.
 * <br><br>
 * To get WAI-ARIA properties, only pass the <code>property</code> that you want
 * to get. If there is no matching property, <code>undefined</code> is returned.
 * All properties are normalised (see
 * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria}).
 *
 * @memberof external:jQuery
 * @instance
 * @alias    aria
 * @param    {Object|String} property
 *           Either the properties to set in key/value pairs or the name of the
 *           property to get/set.
 * @param    {Attribute_Callback|Boolean|Number|String} [value]
 *           The value of the property to set.
 * @return   {jQuery|String|undefined}
 *           Either the jQuery object (after setting) or a string or undefined
 *           (after getting)
 *
 * @example <caption>Setting WAI-ARIA attribute(s)</caption>
 * $("#element").aria("aria-label", "test");
 * // or
 * $("#element").aria("label", "test");
 * // or
 * $("#element").aria({
 *     "aria-label": "test"
 * });
 * // or
 * $("#element").aria({
 *     label: "test"
 * });
 * // All of these set aria-label="test" on all matching elements and return a
 * // jQuery object representing "#element"
 *
 * @example <caption>Setting WAI-ARIA attribute(s) with a function</caption>
 * $("#element").aria("label", function (i, attr) {
 *     return this.id + "__" + i + "__" + attr;
 * });
 * // or
 * $("#element").aria({
 *     label: function (i, attr) {
 *         return this.id + "__" + i + "__" + attr;
 *     }
 * });
 * // Both of these set aria-label="element__0__undefined" on all matching
 * // elements and return a jQuery object representing "#element"
 *
 * @example <caption>Getting a WAI-ARIA attribute</caption>
 * // Markup is:
 * // <div id="element" aria-label="test"></div>
 * $("#element").aria("label");   // -> "test"
 * $("#element").aria("checked"); // -> undefined
 * // If "#element" matches multiple elements, the attributes from the first
 * // element are returned.
 *
 * @example <caption>Setting with aria methods</caption>
 * // Markup is:
 * // <div class="one"></div>
 * // <div class="two"></div>
 * // <div class="three"</div>
 *
 * var settings = {
 *     busy: 0,
 *     controls: ".one",
 *     label: "lorem ipsum"
 * };
 *
 * $(".one").aria(settings);
 * $(".two").ariaRef(settings);
 * $(".three").ariaState(settings);
 *
 * // Now markup is:
 * // <div class="one"
 * //     aria-busy="0"
 * //     aria-controls=".one"
 * //     aria-label="lorem ipsum"
 * //     id="anonymous0"></div>
 * // <div class="two"
 * //     aria-controls="anonymous0"></div>
 * // <div class="three"
 * //     aria-busy="false"
 * //     aria-controls="true"
 * //     aria-label="true"></div>
 *
 * @example <caption>Getting with aria methods</caption>
 * // Markup is:
 * // <div id="test" aria-flowto="false"></div>
 * // <div id="false"></div>
 *
 * $("#test").aria("flowto");      // -> "false"
 * $("#test").ariaRef("flowto");   // -> jQuery(<div id="false">)
 * $("#test").ariaState("flowto"); // -> false
 */
$.fn.aria = function (property, value) {

    return access(
        this,
        property,
        value
    );

};

// Source: /src/instance/ariaRef.js



/**
 * Gets or sets a WAI-ARIA reference. This is functionally identical to
 * [jQuery#aria]{@link external:jQuery#aria} with the main difference being that
 * an element may be passed as the <code>value</code> when setting and that a
 * jQuery object is returned when getting.
 * <br><br>
 * Because WAI-ARIA references work with IDs, IDs are worked out using
 * [jQuery#identify]{@link external:jQuery#identify}. Be aware that any string
 * passed to [jQuery#ariaRef]{@link external:jQuery#ariaRef} will be treated
 * like a CSS selector and looked up with the results being used to set the
 * property. If you already have the ID and wish to set it without the lookup,
 * use [jQuery#aria]{@link external:jQuery#aria}.
 * <br><br>
 * If <code>value</code> is a function then the resulting value is identified.
 * This can be particularly useful for performing DOM traversal to find the
 * reference (see examples below). As with
 * [jQuery#aria]{@link external:jQuery#aria}, if the <code>value</code> function
 * returns nothing or returns <code>undefined</code> then no action is taken.
 * <br><br>
 * When accessing the attribute using this function, a <code>jQuery</code>
 * object representing the reference is returned. If there are multiple elements
 * in the collection, only the reference for the first element is returned. To
 * get the value of the attribute rather than the element, use
 * [jQuery#aria]{@link external:jQuery#aria}.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    ariaRef
 * @param    {Object|String} property
 *           Either the properties to set in key/value pairs or the name of the
 *           property to set.
 * @param    {Attribute_Callback|jQuery_param} [value]
 *           Reference to set.
 * @return   {jQuery}
 *           jQuery object representing either the elements that were modified
 *           (when setting) or the referenced element(s) (when getting - may be
 *           an empty jQuery object).
 *
 * @example <caption>Setting references</caption>
 * // Markup is:
 * // <h1>Heading</h1>
 * // <div class="one">
 * //     Lorem ipsum dolor sit amet ...
 * // </div>
 *
 * $(".one").ariaRef("labelledby", $("h1"));
 * // or
 * $(".one").ariaRef("labelledby", "h1");
 * // or
 * $(".one").ariaRef("labelledby", $("h1")[0]);
 * // or
 * $(".one").ariaRef({
 *     labelledby: $("h1") // or "h1" or $("h1")[0]
 * });
 * // Each of these return a jQuery object representing ".one"
 *
 * // Now markup is:
 * // <h1 id="anonymous0">Heading</h1>
 * // <div class="one" aria-labelledby="anonymous0">
 * //     Lorem ipsum dolor sit amet ...
 * // </div>
 *
 * @example <caption>Setting references with a function</caption>
 * // Markup is:
 * // <div class="js-collapse">
 * //     <div class="js-collapse-content">
 * //         Lorem ipsum dolor sit amet ...
 * //     </div>
 * //     <button class="js-collapse-toggle">
 * //         Toggle
 * //     </button>
 * // </div>
 *
 * $(".js-collapse-toggle").ariaRef("controls", function (i, attr) {
 *
 *     return $(this)
 *         .closest(".js-collapse")
 *         .find(".js-collapse-content");
 *
 * });
 *
 * // Now markup is:
 * // <div class="js-collapse">
 * //     <div class="js-collapse-content" id="anonymous0">
 * //         Lorem ipsum dolor sit amet ...
 * //     </div>
 * //     <button class="js-collapse-toggle" aria-controls="anonymous0">
 * //         Toggle
 * //     </button>
 * // </div>
 *
 * @example <caption>Getting a reference</caption>
 * // Markup is:
 * // <h1 id="anonymous0">Heading</h1>
 * // <div class="one" aria-labelledby="anonymous0">
 * //     Lorem ipsum dolor sit amet ...
 * // </div>
 *
 * $(".one").ariaRef("labelledby"); // -> $(<h1>)
 * $(".one").ariaRef("controls");   // -> $()
 *
 * @example <caption>Value is treated like a CSS selector</caption>
 * // Markup is:
 * // <button id="button"></button>
 * // <div id="section"></div>
 * // <section></section>
 *
 * $("#button").ariaRef("controls", "section");
 *
 * // Now markup is:
 * // <button id="button" aria-controls="anonymous0"></button>
 * // <div id="section"></div>
 * // <section id="anonymous0"></section>
 */
$.fn.ariaRef = function (property, value) {

    return access(
        this,
        property,
        value,
        HANDLER_REFERENCE
    );

};

// Source: /src/instance/ariaState.js



/**
 * Sets or gets the WAI-ARIA state of the collection.
 * <br><br>
 * When setting the state, false, "false" (any case), 0 and "0" will be
 * considered false. All other values will be considered true except for "mixed"
 * (any case) which will set the state to "mixed". The differs from
 * [jQuery#aria]{@link external:jQuery#aria} which will simply set the
 * attribute(s) without converting the value.
 * <br><br>
 * After setting the state(s), a jQuery object representing the affected
 * elements is returned. The state for the first matching element is returned
 * when getting.
 * <br><br>
 * All attributes are normalised - see
 * [jQuery.normaliseAria]{@link external:jQuery.normaliseAria} for full details.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    ariaState
 * @param    {Object|String} property
 *           Either a key/value combination properties to set or the name of the
 *           WAI-ARIA state to set.
 * @param    {Attribute_Callback|Boolean|Number|String} [value]
 *           Value of the attribute.
 * @return   {ARIA_state|jQuery}
 *           Either the jQuery object representing the modified elements
 *           (setting) or the state of the first matching element.
 *
 * @example <caption>Getting state</caption>
 * // Markup is:
 * // <div id="one" aria-busy="true" aria-checked="mixed"></div>
 *
 * $("#one").ariaState("busy");    // -> true
 * $("#one").ariaState("checked"); // -> "mixed"
 * $("#one").ariaState("hidden");  // -> undefined
 *
 * @example <caption>Setting state</caption>
 * // Each of these will set the state to false:
 * $("#one").ariaState("busy", "false");
 * $("#one").ariaState("busy", "FALSE");
 * $("#one").ariaState("busy", false);
 * $("#one").ariaState("busy", 0);
 * $("#one").ariaState("busy", "0");
 *
 * // Each of these will set the state to "mixed":
 * $("#one").ariaState("checked", "mixed");
 * $("#one").ariaState("checked", "MIXED");
 *
 * // Each of these will set the state to true
 * $("#one").ariaState("busy", "true");
 * $("#one").ariaState("busy", "TRUE");
 * $("#one").ariaState("busy", true);
 * $("#one").ariaState("busy", 1);
 * $("#one").ariaState("busy", "1");
 * // WARNING: these also set the state to true
 * $("#one").ariaState("busy", {});
 * $("#one").ariaState("busy", null);
 * $("#one").ariaState("busy", "nothing");
 * $("#one").ariaState("busy", "");
 * $("#one").ariaState("busy", -1);
 *
 * // Each example returns a jQuery object representing "#one" and an object
 * // can be passed as parameters as well:
 * $("#one").ariaState({
 *     busy: true
 * });
 *
 * @example <caption>Setting state with a function</caption>
 * // Markup is:
 * // <div class="checkbox"></div>
 * // <input type="checkbox" checked>
 *
 * $(".checkbox").ariaState("checked", function (i, attr) {
 *
 *     return $(this)
 *         .next("input[type=\"checkbox\"]")
 *         .prop("checked");
 *
 * });
 *
 * // Now markup is:
 * // <div class="checkbox" aria-checked="true"></div>
 * // <input type="checkbox" checked>
 */
$.fn.ariaState = function (property, value) {

    return access(
        this,
        property,
        value,
        HANDLER_STATE
    );

};

// Source: /src/instance/removeAria.js


$.fn.extend({

    removeAria: removeAttribute,

    /**
     * Alias of [jQuery#removeAria]{@link external:jQuery#removeAria}.
     *
     * @memberof external:jQuery
     * @instance
     * @function
     * @param    {String} name
     *           WAI-ARIA attribute to remove.
     * @return   {jQuery}
     *           jQuery attribute representing the elements modified.
     */
    removeAriaRef: removeAttribute,

    /**
     * Alias of [jQuery#removeAria]{@link external:jQuery#removeAria}.
     *
     * @memberof external:jQuery
     * @instance
     * @function
     * @param    {String} name
     *           WAI-ARIA attribute to remove.
     * @return   {jQuery}
     *           jQuery attribute representing the elements modified.
     */
    removeAriaState: removeAttribute

});

// Source: /src/instance/role.js



/**
 * Sets the role of all elements in the collection or gets the role of the first
 * element in the collection, depending on whether or not the <code>role</code>
 * argument is provided. As [jQuery#role]{@link external:jQuery#role} is just a
 * wrapper for [jQuery#attr]{@link http://api.jquery.com/attr/}, the
 * <code>role</code> parameter can actually be any value type that the official
 * documentation mentions.
 * <br><br>
 * According to the WAI-ARIA specs, an element can have mutliple roles as a
 * space-separated list. This method will only set the role attribute to the
 * given string when setting. If you want to modify the roles, use
 * [jQuery#addRole]{@link external:jQuery#addRole} and
 * [jQuery#removeRole]{@link external:jQuery#removeRole}.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    role
 * @param    {Attribute_Callback|String} [role]
 *           Role to get or function to set the role.
 * @return   {jQuery|String|undefined}
 *           Either the jQuery object representing the elements that were
 *           modified or the role value.
 *
 * @example
 * // Markup is:
 * // <div id="one"></div>
 * // <div id="two"></div>
 *
 * $("#one").role("presentation"); // -> jQuery(<div id="one">)
 *
 * // Now markup is:
 * // <div id="one" role="presentation"></div>
 * // <div id="two"></div>
 *
 * $("#one").role(); // -> "presentation"
 * $("#two").role(); // -> undefined
 *
 * @example <caption>Setting a role with a function</caption>
 * // Markup is:
 * // <div id="one" role="button"></div>
 *
 * $("#one").role(function (index, current) {
 *     return current + " tooltip";
 * });
 *
 * // Now markup is:
 * // <div id="one" role="button tooltip"></div>
 */
$.fn.role = function (role) {

    return role === undefined
        ? this.attr("role")
        : this.attr("role", role);

};

// Source: /src/instance/addRole.js


/**
 * Adds a role to a collection of elements. The role will not be added if it's
 * empty ("" or undefined), if the function response is empty or if the element
 * already has that role. In that way it's similar to
 * [jQuery#addClass]{@link https://api.jquery.com/addClass/}.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    addRole
 * @param    {Attribute_Callback|String} role
 *           Role(s) to add to the matching elements or function to generate the
 *           role(s) to add.
 * @return   {jQuery}
 *           jQuery object representing the matching elements.
 *
 * @example <caption>Adding a role</caption>
 * // Markup is:
 * // <div class="one" role="presentation"></div>
 * // <div class="one"></div>
 *
 * $(".one").addRole("alert"); // -> jQuery(<div>, <div>)
 *
 * // Now markup is:
 * // <div class="one" role="presentation alert"></div>
 * // <div class="one" role="alert"></div>
 *
 * @example <caption>Adding a role with a function</caption>
 * // Markup is:
 * // <div class="one" role="presentation"></div>
 *
 * $(".one").addRole(function (index, current) {
 *     return "alert combobox";
 * });
 *
 * // Now markup is:
 * // <div class="one" role="presentation alert combobox"></div>
 */
$.fn.addRole = function (role) {

    var isFunction = $.isFunction(role);

    return this.role(function (index, current) {

        var value = isFunction
            ? role.call(this, index, current)
            : role;
        var roles = toWords(current);

        toWords(value).forEach(function (val) {

            if (
                val !== ""
                && val !== undefined
                && roles.indexOf(val) < 0
            ) {
                roles.push(val);
            }

        });

        return roles.join(" ");

    });

};

// Source: /src/instance/removeRole.js



/**
 * Removes roles from the collection of elements. If the method is called
 * without any arguments then the role attribute itself is removed. Be aware
 * that this is not the same as passing a function which returns undefined -
 * such an action will have no effect.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    removeRole
 * @param    {Attribute_Callback|String} [role]
 *           Role(s) to remove or a function to generate the role(s) to remove.
 * @return   {jQuery}
 *           jQuery object representing the matched elements.
 *
 * @example <caption>Removing a role</caption>
 * // Markup is:
 * // <div class="one" role="presentation alert"></div>
 * // <div class="one" role="alert"></div>
 *
 * $(".one").removeRole("alert"); // -> jQuery(<div>, <div>)
 *
 * // Now markup is:
 * // <div class="one" role="presentation"></div>
 * // <div class="one" role=""></div>
 *
 * @example <caption>Completely removing a role</caption>
 * // Markup is:
 * // <div class="one" role="presentation alert"></div>
 * // <div class="one" role="alert"></div>
 *
 * $(".one").removeRole(); // -> jQuery(<div>, <div>)
 *
 * // Now markup is:
 * // <div class="one"></div>
 * // <div class="one"></div>
 *
 * @example <caption>Removing a role with a function</caption>
 * // Markup is:
 * // <div class="one" role="presentation alert combobox"></div>
 *
 * $(".one").removeRole(function (index, current) {
 *     return current
 *         .split(/\s+/)
 *         .filter(function (role) {
 *             return role.indexOf("a") > -1;
 *         })
 *         .join(" ");
 *     // "presentation alert"
 * });
 *
 * // Now markup is:
 * // <div class="one" role="combobox"></div>
 */
$.fn.removeRole = function (role) {

    var isFunction = $.isFunction(role);

    return role === undefined
        ? this.removeAttr("role")
        : this.role(function (index, current) {

            var value = isFunction
                ? role.call(this, index, current)
                : role;
            var values = toWords(value);

            return toWords(current)
                .filter(function (aRole) {
                    return values.indexOf(aRole) < 0;
                })
                .join(" ");

        });

};

// Source: /src/instance/ariaFocusable.js



/**
 * Sets whether or not the matching elements are focusable. Strings, numbers and
 * booleans are understood as <code>state</code> - see
 * [jQuery#ariaState]{@link external:jQuery#ariaState} for full details as the
 * algorythm is the same.
 * <br><br>
 * Be aware this this function will only modify the matching elements, it will
 * not check any parents or modify any other elements that could affect the
 * focusability of the element.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    ariaFocusable
 * @param    {Attribute_Callback|Boolean|Number|String} state
 *           State to set.
 * @return   {jQuery}
 *           jQuery object representing the affected element(s).
 *
 * @example <caption>Setting focusability</caption>
 * // Markup is
 * // <div id="one"></div>
 * // <div id="two"></div>
 *
 * $("#one").ariaFocusable(false); // -> jQuery(<div id="one">)
 * $("#two").ariaFocusable(true);  // -> jQuery(<div id="two">)
 *
 * // Now markup is
 * // <div id="one" tabindex="0"></div>
 * // <div id="two" tabindex="-1"></div>
 *
 * @example <caption>Limitations of the function</caption>
 * // Markup is
 * // <div id="one" tabindex="-1">
 * //     <div id="two" disabled></div>
 * // </div>
 *
 * $("#two").ariaFocusable(true); // -> jQuery(<div id="two">)
 *
 * // Now markup is
 * // <div id="one" tabindex="-1">
 * //     <div id="two" disabled tabindex="0"></div>
 * // </div>
 */
$.fn.ariaFocusable = function (state) {

    return this.attr(
        "tabindex",
        handlers[HANDLER_STATE].read(state)
            ? 0
            : -1
    );

};

}(jQuery));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuYXJpYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEganF1ZXJ5LWFyaWEgKGh0dHBzOi8vZ2l0aHViLmNvbS9Ta2F0ZXNpZGUvanF1ZXJ5LWFyaWEjcmVhZG1lKSAtIHYwLjYuMWEgLSBNSVQgbGljZW5zZSAtIDIwMTctMy0yNiAqL1xuKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFNvdXJjZTogL3NyYy9kb2MvZmlsZS5qc1xuLyoqXG4gKiBAZmlsZVxuICogVGhpcyBpcyBhIGpRdWVyeSBwbHVnaW4gdGhhdCBhZGRzIG1ldGhvZHMgZm9yIG1hbmlwdWxhdGluZyBXQUktQVJJQVxuICogYXR0cmlidXRlcy4gVW5saWtlIG90aGVyIHBsdWdpbnMgdGhhdCBkbyBzaW1pbGFyIHRoaW5ncywgdGhpcyBwbHVnaW4gaGFzIGJlZW5cbiAqIGRlc2lnbmVkIHRvIG1hdGNoIGpRdWVyeSdzIHN0eWxlIG1ha2luZyBpdCBtdWNoIGVhc2llciB0byBwaWNrIHVwLiBUaGUgcGx1Z2luXG4gKiBpbmNsdWRlczpcbiAqIDxicj48YnI+XG4gKiA8c3Ryb25nPkdldHRpbmcgYW5kIFNldHRpbmcgV0FJLUFSSUEgQXR0cmlidXRlczwvc3Ryb25nPlxuICogPGJyPltqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9IGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nXG4gKiBXQUktQVJJQSBhdHRyaWJ1dGVzLlxuICogPGJyPltqUXVlcnkjYXJpYVJlZl17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFSZWZ9IGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nXG4gKiByZWZlcmVuY2VzIHRvIG90aGVyIGVsZW1lbnRzLlxuICogPGJyPltqUXVlcnkjYXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVN0YXRlfSBmb3IgZ2V0dGluZyBhbmRcbiAqIHNldHRpbmcgc3RhdGVzLlxuICogPGJyPjxicj5cbiAqIDxzdHJvbmc+UmVtb3ZpbmcgV0FJLUFSSUEgQXR0cmlidXRlczwvc3Ryb25nPlxuICogPGJyPltqUXVlcnkjcmVtb3ZlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWF9IGZvciByZW1vdmluZ1xuICogV0FJLUFSSUEgYXR0cmlidXRlcyAoYWxpYXNlZCBhc1xuICogW2pRdWVyeSNyZW1vdmVBcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVJlZn0gYW5kXG4gKiBbalF1ZXJ5I3JlbW92ZUFyaWFTdGF0ZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWFTdGF0ZX0pLlxuICogPGJyPjxicj5cbiAqIDxzdHJvbmc+QWRqdXN0aW5nIFdBSS1BUklBIEF0dHJpYnV0ZSBNYW5pcHVsYXRpb248L3N0cm9uZz5cbiAqIDxicj5balF1ZXJ5LmFyaWFGaXhde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5hcmlhRml4fSB3aWxsIGNvbnZlcnQgdGhlIG5hbWVzIG9mXG4gKiBXQUktQVJJQSBhdHRyaWJ1dGVzLlxuICogPGJyPltqUXVlcnkuYXJpYUhvb2tzXXtAbGluayBleHRlcm5hbDpqUXVlcnkuYXJpYUhvb2tzfSBhbGxvdyBzcGVjaWFsXG4gKiBmdW5jdGlvbmFsaXR5IHRvIGJlIGRlZmluZWQgZm9yIHNwZWNpZmljIFdBSS1BUklBIGF0dHJpYnV0ZXMuXG4gKiA8YnI+PGJyPlxuICogPHN0cm9uZz5NYW5pcHVsYXRpbmcgTGFuZG1hcmtzPC9zdHJvbmc+XG4gKiA8YnI+W2pRdWVyeSNyb2xlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcm9sZX0sXG4gKiBbalF1ZXJ5I2FkZFJvbGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhZGRSb2xlfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlUm9sZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZVJvbGV9IGhhbmRsaW5nIFdBSS1BUklBXG4gKiBsYW5kbWFya3MuXG4gKiA8YnI+PGJyPlxuICogPHN0cm9uZz5IZWxwZXIgRnVuY3Rpb25zIGZvciBDb21tb24gRnVuY3Rpb25hbGl0eTwvc3Ryb25nPlxuICogPGJyPltqUXVlcnkjaWRlbnRpZnlde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNpZGVudGlmeX0gZm9yIGdlbmVyYXRpbmcgZWxlbWVudFxuICogSURzIGFzIG5lY2Vzc2FyeS5cbiAqIDxicj5balF1ZXJ5I2FyaWFGb2N1c2FibGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhRm9jdXNhYmxlfSBmb3IgdG9nZ2xpbmdcbiAqIGZvY3VzYWJpbGl0eS5cbiAqIDxicj5balF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSBmb3JcbiAqIHNpbXBsaWZ5aW5nIHRoZSBXQUktQVJJQSBhdHRyaWJ1dGVzIChhbGlhc2VkIGFzXG4gKiBbalF1ZXJ5Lm5vcm1hbGl6ZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpemVBcmlhfSkuXG4gKiA8YnI+PGJyPlxuICogVGhlIGZpbGVzIGNhbiBiZSBkb3dubG9hZGVkIG9uXG4gKiBbR2l0SHViXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vU2thdGVzaWRlL2pxdWVyeS1hcmlhfS5cbiAqXG4gKiBAYXV0aG9yIEphbWVzIFwiU2thdGVzaWRlXCIgTG9uZyA8c2s4NWlkZUBob3RtYWlsLmNvbT5cbiAqIEB2ZXJzaW9uIDAuNi4xYVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuLy8gU291cmNlOiAvc3JjL2RvYy9leHRlcm5hbC9qUXVlcnkuanNcbi8qKlxuICogQGV4dGVybmFsIGpRdWVyeVxuICogQHNlZSBbalF1ZXJ5XXtAbGluayBodHRwOi8vanF1ZXJ5LmNvbX1cbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL2NhbGxiYWNrL0F0dHJpYnV0ZV9DYWxsYmFjay5qc1xuLyoqXG4gKiBUaGUgW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0sXG4gKiBbalF1ZXJ5I2FyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhUmVmfSBhbmRcbiAqIFtqUXVlcnkjYXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVN0YXRlfSBtZXRob2RzIGFsbCB0YWtlXG4gKiBmdW5jdGlvbnMgdG8gc2V0IHRoZWlyIHZhbHVlLiBUaGUgZnVuY3Rpb25zIGFsbCBoYXZlIHRoZSBzYW1lIHNpZ25hdHVyZSxcbiAqIGRlc2NyaWJlZCBoZXJlLiBJdCBpcyBpbXBvcnRhbnQgdG8gcmVtZW1iZXIgdGhhdCB0aGUgdmFsdWUgdGhpcyBmdW5jdGlvblxuICogcmV0dXJucyB3aWxsIGJlIHRyZWF0ZWQgYXMgaWYgaXQgaGFkIG9yaWdpbmFsbHkgYmVlbiBwYXNzZWQgdG8gdGhlXG4gKiBmdW5jdGlvbi4gU2VlXG4gKiBbalF1ZXJ5I2F0dHJde0BsaW5rIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9hdHRyLyNhdHRyLWF0dHJpYnV0ZU5hbWUtZnVuY3Rpb259XG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhbmQgZXhhbXBsZXMuXG4gKlxuICogQGNhbGxiYWNrIEF0dHJpYnV0ZV9DYWxsYmFja1xuICogQHRoaXMgICAgIEhUTUxFbGVtZW50XG4gKiAgICAgICAgICAgVGhlIGVsZW1lbnQgYmVpbmcgcmVmZXJlbmNlZC5cbiAqIEBwYXJhbSAgICB7TnVtYmVyfSBpbmRleFxuICogICAgICAgICAgIFRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBlbGVtZW50IGZyb20gd2l0aGluIHRoZSBvdmVyYWxsIGpRdWVyeVxuICogICAgICAgICAgIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0gICAge1N0cmluZ3x1bmRlZmluZWR9IGF0dHJcbiAqICAgICAgICAgICBDdXJyZW50IGF0dHJpYnV0ZSB2YWx1ZSAodW5kZWZpbmVkIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90XG4gKiAgICAgICAgICAgY3VycmVudGx5IGhhdmUgdGhlIGF0dHJpYnV0ZSBhc3NpZ25lZCkuXG4gKiBAcmV0dXJuICAge1N0cmluZ31cbiAqICAgICAgICAgICBUaGUgdmFsdWUgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogJChcIiNvbmVcIikuYXJpYShcImxhYmVsXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKiAgICAgcmV0dXJuIFwiVGVzdFwiO1xuICogfSk7XG4gKiAvLyBpcyB0aGUgc2FtZSBhc1xuICogJChcIiNvbmVcIikuYXJpYShcImxhYmVsXCIsIFwiVGVzdFwiKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbGVtZW50cyB3aXRob3V0IHRoZSBhdHRyaWJ1dGUgcGFzcyB1bmRlZmluZWQ8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhKFwibGFiZWxcIiwgZnVuY3Rpb24gKGksIGF0dHIpIHtcbiAqICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGF0dHIpO1xuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJbb2JqZWN0IFVuZGVmaW5lZF1cIj48L2Rpdj5cbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL3R5cGVkZWYvQVJJQV9zdGF0ZS5qc1xuLyoqXG4gKiBBIGJvb2xlYW4gb3IgdGhlIHN0cmluZyBcIm1peGVkXCIgKGFsd2F5cyBpbiBsb3dlciBjYXNlKS4gVGhpcyB0eXBlIHdpbGxcbiAqIGJlIHVuZGVmaW5lZCB3aGVuIHRyeWluZyB0byByZWFkIGEgc3RhdGUgdGhhdCBoYXMgbm90IGJlZW4gc2V0IG9uIHRoZVxuICogZWxlbWVudC5cbiAqXG4gKiBAdHlwZWRlZiB7Qm9vbGVhbnxTdHJpbmd8dW5kZWZpbmVkfSBBUklBX3N0YXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIE1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtY2hlY2tlZD1cInRydWVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIiBhcmlhLWNoZWNrZWQ9XCJmYWxzZVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInRocmVlXCIgYXJpYS1jaGVja2VkPVwibWl4ZWRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJmb3VyXCI+PC9kaXY+XG4gKlxuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKFwiY2hlY2tlZFwiKTsgICAvLyAtPiB0cnVlXG4gKiAkKFwiI3R3b1wiKS5hcmlhU3RhdGUoXCJjaGVja2VkXCIpOyAgIC8vIC0+IGZhbHNlXG4gKiAkKFwiI3RocmVlXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIik7IC8vIC0+IFwibWl4ZWRcIlxuICogJChcIiNmb3VyXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIik7ICAvLyAtPiB1bmRlZmluZWRcbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL3R5cGVkZWYvQVJJQV9ob29rLmpzXG4vKipcbiAqIEEgaG9vayBmb3IgYSBXQUktQVJJQSBhdHRyaWJ1dGUuIEV2ZXJ5IHByb3BlcnR5IGlzIG9wdGlvbmFsIHNvIHRoZXJlIGlzIG5vXG4gKiBuZWVkIHRvIHNwZWNpZnkgb25lIHRvIGV4ZWN1dGUgdGhlIGRlZmF1bHQgZnVuY3Rpb25hbGl0eS5cbiAqIDxicj48YnI+XG4gKiBCZSBhd2FyZSB0aGF0IHRoZXNlIGhvb2tzIG9ubHkgYWZmZWN0IHRoZSBhcmlhIG1ldGhvZHM7XG4gKiBbalF1ZXJ5I2F0dHJde0BsaW5rIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9hdHRyL30gYW5kXG4gKiBbalF1ZXJ5I3Byb3Bde0BsaW5rIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9wcm9wL30gd2lsbCBub3QgYmUgYWZmZWN0ZWQgYnkgYW55XG4gKiBjaGFuZ2VzIGhlcmUuIFRoZXJlIGFyZSBzaW1pbGFyIDxjb2RlPmpRdWVyeS5hdHRySG9va3M8L2NvZGU+IGFuZFxuICogPGNvZGU+alF1ZXJ5LnByb3BIb29rczwvY29kZT4gKGZvciBzZXQgYW5kIGdldCkgdGhhdCB3b3JrIGluIHRoZSBzYW1lIHdheSBpZlxuICogeW91IG5lZWQgdG8gY29tcGxldGVseSBjb250cm9sIGF0dHJpYnV0ZS9wcm9wZXJ0eSBzZXR0aW5nLlxuICpcbiAqIEB0eXBlZGVmICB7T2JqZWN0fSAgICAgICAgICBBUklBX2hvb2tcbiAqIEBwcm9wZXJ0eSB7QVJJQV9ob29rX3NldH0gICBbc2V0XVxuICogICAgICAgICAgIEhhbmRsZXMgc2V0dGluZyB0aGUgYXR0cmlidXRlLlxuICogQHByb3BlcnR5IHtBUklBX2hvb2tfZ2V0fSAgIFtnZXRdXG4gKiAgICAgICAgICAgSGFuZGxlcyBnZXR0aW5nIHRoZSBhdHRyaWJ1dGUuXG4gKiBAcHJvcGVydHkge0FSSUFfaG9va19oYXN9ICAgW2hhc11cbiAqICAgICAgICAgICBIYW5kbGVycyBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCB0aGUgYXR0cmlidXRlIGlzIGFzc2lnbmVkLlxuICogQHByb3BlcnR5IHtBUklBX2hvb2tfdW5zZXR9IFt1bnNldF1cbiAqICAgICAgICAgICBIYW5kbGVzIHJlbW92aW5nIHRoZSBhdHRyaWJ1dGUuXG4gKi9cblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBzZXR0aW5nIG9mIGEgV0FJLUFSSUEgYXR0cmlidXRlLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHZhbHVlLFxuICogdGhhdCB2YWx1ZSBpcyB1c2VkIHRvIHNldCB0aGUgYXR0cmlidXRlOyByZXR1cm5pbmcgbnVsbCwgdW5kZWZpbmVkLCBvciBub3RcbiAqIHJldHVybmluZyBhbnl0aGluZyB3aWxsIHByZXZlbnQgdGhlIG5vcm1hbCBhdHRyaWJ1dGUgc2V0dGluZyBwcm9jZXNzIGZyb21cbiAqIGNvbXBsZXRpbmcuXG4gKiA8YnI+PGJyPlxuICogV2hlbiBzZXR0aW5nIGFuIGF0dHJpYnV0ZSwgcGxlYXNlIGRvIG5vdCB1c2VcbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LFxuICogW2pRdWVyeSNhcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVJlZn0gb3JcbiAqIFtqUXVlcnkjYXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVN0YXRlfSBhcyB0aGlzIGNhbiBjcmVhdGUgYW5cbiAqIGluZmluaXRlIGxvb3AuXG4gKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSAgICBBUklBX2hvb2tfc2V0XG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9ICAgICAgICAgICBlbGVtZW50XG4gKiAgICAgICAgICBFbGVtZW50IHdob3NlIGF0dHJpYnV0ZSBzaG91bGQgYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0gICB7Qm9vbGVhbnxOdW1iZXJ8U3RyaW5nfSB2YWx1ZVxuICogICAgICAgICAgVmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSBpbiB0aGUgZm9ybSBnaXZlbiB0byB0aGUgYXJpYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVxuICogICAgICAgICAgRnVsbCBhdHRyaWJ1dGUgbmFtZSwgbG93ZXIgY2FzZSBhbmQgaW5jbHVkaW5nIFwiYXJpYS1cIiBwcmVmaXguXG4gKiBAcmV0dXJuICB7P31cbiAqICAgICAgICAgIFBvc3NpYmxlIGNvbnZlcnNpb24gb2YgdGhlIHZhbHVlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgZmljdGl0aW91cyBcInZvbHVtZVwiIG9yIFwic291bmRzZXR1cFwiIGF0dHJpYnV0ZXM8L2NhcHRpb24+XG4gKiAkLmFyaWFIb29rcy52b2x1bWUgPSB7XG4gKiAgICAgLy8gTGV0J3MgYXNzdW1lIHRoYXQgdGhlIHZhbHVlIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGFuZCB0aGF0IGFueVxuICogICAgIC8vIG90aGVyIHZhbHVlIHNob3VsZCBiZSBpZ25vcmVkLlxuICogICAgIHNldDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlLCBhdHRyaWJ1dGUpIHtcbiAqICAgICAgICAgdmFyIHBvc0ludCA9IE1hdGguZmxvb3IoTWF0aC5hYnModmFsdWUpKTtcbiAqICAgICAgICAgcmV0dXJuIGlzTmFOKHBvc0ludClcbiAqICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gKiAgICAgICAgICAgICA6IHBvc0ludDtcbiAqICAgICB9XG4gKiB9O1xuICogJC5hcmlhSG9va3Muc291bmRzZXR1cCA9IHtcbiAqICAgICAvLyBMZXQncyBhc3N1bWUgdGhhdCB0aGUgdmFsdWUgY2FuIG9ubHkgYmUgc29tZXRoaW5nIGluIGEgc2V0IGxpc3QgYW5kXG4gKiAgICAgLy8gdGhhdCBldmVyeXRoaW5nIGVsc2Ugc2hvdWxkIGJlIGlnbm9yZWQuXG4gKiAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWUsIGF0dHJpYnV0ZSkge1xuICogICAgICAgICB2YXIgdmFsdWVzID0gW1wibW9ub1wiLCBcInN0ZXJlb1wiLCBcIjUuMVwiXTtcbiAqICAgICAgICAgcmV0dXJuIHZhbHVlcy5pbmRleE9mKHZhbHVlKSA+IC0xXG4gKiAgICAgICAgICAgICA/IHZhbHVlXG4gKiAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAqICAgICB9XG4gKiB9O1xuICpcbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhKHtcbiAqICAgICB2b2x1bWU6IDUsXG4gKiAgICAgc291bmRzZXR1cDogXCJtb25vXCJcbiAqIH0pO1xuICogJChcIiN0d29cIikuYXJpYSh7XG4gKiAgICAgdm9sdW1lOiBcImxvdWRcIixcbiAqICAgICBzb3VuZHNldHVwOiBcImxlZ2VuZGFyeVwiXG4gKiB9KTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtdm9sdW1lPVwiNVwiIGFyaWEtc291bmRzZXR1cD1cIm1vbm9cIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEhhbmRsZXMgdGhlIGdldHRpbmcgb2YgYSBXQUktQVJJQSBhdHRyaWJ1dGUuIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgZWxlbWVudFxuICogYW5kIHNob3VsZCByZXR1cm4gdGhlIHZhbHVlIHRoYXQgdGhlIGpRdWVyeSBhcmlhIG1ldGhvZHMgc2hvdWxkIHJldHVybi5cbiAqIDxicj48YnI+XG4gKiBXaGVuIGdldHRpbmcgYW4gYXR0cmlidXRlLCBwbGVhc2UgZG8gbm90IHVzZVxuICogW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0sXG4gKiBbalF1ZXJ5I2FyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhUmVmfSBvclxuICogW2pRdWVyeSNhcmlhU3RhdGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhU3RhdGV9IGFzIHRoaXMgY2FuIGNyZWF0ZSBhblxuICogaW5maW5pdGUgbG9vcC5cbiAqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259ICAgIEFSSUFfaG9va19nZXRcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICAgRWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgdmFsdWUgc2hvdWxkIGJlIHJldHVybmVkLlxuICogQHBhcmFtICAge1N0cmluZ30gICAgICBhdHRyaWJ1dGVcbiAqICAgICAgICAgIEZ1bGwgYXR0cmlidXRlIG5hbWUsIGxvd2VyIGNhc2UgYW5kIGluY2x1ZGluZyBcImFyaWEtXCIgcHJlZml4LlxuICogQHJldHVybiAgez9Cb29sZWFufE51bWJlcnxTdHJpbmd9XG4gKiAgICAgICAgICBWYWx1ZSBvZiB0aGUgYXR0cmlidXRlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldHRpbmcgYSBmaWN0aXRpb3VzIFwidm9sdW1lXCIgYXR0cmlidXRlPC9jYXB0aW9uPlxuICogJC5hcmlhSG9va3Mudm9sdW1lID0ge1xuICogICAgIC8vIExldCdzIGFzc3VtZSB0aGF0IHRoZSB2YWx1ZSB3aWxsIGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaWYgaXRcbiAqICAgICAvLyBjb250YWlucyBhbm90aGVyIHZhbHVlLCBvciBpcyBtaXNzaW5nLCBpdCBkZWZhdWx0cyB0byAwLlxuICogICAgIGdldDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICogICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICogICAgICAgICByZXR1cm4gKHZhbHVlID09PSBudWxsIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA8IDApXG4gKiAgICAgICAgICAgICA/IDBcbiAqICAgICAgICAgICAgIDogTWF0aC5mbG9vcih2YWx1ZSk7XG4gKiAgICAgfVxuICogfTtcbiAqXG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGlkPVwib25lXCIgYXJpYS12b2x1bWU9XCI1XCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGlkPVwidHdvXCIgYXJpYS12b2x1bWU9XCJsb3VkXCI+PC9kaXY+XG4gKlxuICogJChcIiNvbmVcIikuYXJpYShcInZvbHVtZVwiKTsgLy8gLT4gNVxuICogJChcIiN0d29cIikuYXJpYShcInZvbHVtZVwiKTsgLy8gLT4gMFxuICovXG5cbi8qKlxuICogSGFuZGxlcyBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCB0aGUgV0FJLUFSSUEgYXR0cmlidXRlIGV4aXN0cyBvbiB0aGUgZWxlbWVudFxuICogYW5kIGl0IHNob3VsZCByZXR1cm4gYSBib29sZWFuLiBDdXJyZW50bHkgdGhpcyBmdW5jdGlvbmFsaXR5IGlzIG5vdCBleHBvc2VkXG4gKiBpbiBhbiBhcmlhIG1ldGhvZCwgYnV0IHRoZSBleGlzdGVuY2Ugb2YgYSBXQUktQVJJQSBhdHRyaWJ1dGUgd2lsbCBiZSBjaGVja2VkXG4gKiBiZWZvcmUgZ2V0dGluZyBvY2N1cnMgKGFuZCB0aGUge0BsaW5rIEFSSUFfaG9va19nZXR9IGZ1bmN0aW9uIGV4ZWN1dGVzKS5cbiAqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259ICAgIEFSSUFfaG9va19oYXNcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICAgRWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIGNoZWNrZWQuXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgIGF0dHJpYnV0ZVxuICogICAgICAgICAgRnVsbCBhdHRyaWJ1dGUgbmFtZSwgbG93ZXIgY2FzZSBhbmQgaW5jbHVkaW5nIFwiYXJpYS1cIiBwcmVmaXguXG4gKiBAcmV0dXJuICB7Qm9vbGVhbn1cbiAqICAgICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBhdHRyaWJ1dGUgZXhpc3RzIG9uIHRoZSBlbGVtZW50ICh0cnVlIGlmIGl0XG4gKiAgICAgICAgICBkb2VzLCBmYWxzZSBvdGhlcndpc2UpLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNraW5nIGZvciBhIGZpY3RpdGlvdXMgXCJ2b2x1bWVcIiBhdHRyaWJ1dGU8L2NhcHRpb24+XG4gKiAkLmFyaWFIb29rcy52b2x1bWUgPSB7XG4gKiAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiaGlcIik7XG4gKiAgICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICogICAgIH0sXG4gKiAgICAgLy8gTGV0J3MgYXNzdW1lIHRoYXQgdGhlIGF0dHJpYnV0ZSBoYXMgdG8gY29udGFpbiBhIHBvc2l0aXZlIGludGVnZXIgYW5kXG4gKiAgICAgLy8gd2lsbCBiZSBjb25zaWRlcmVkIG5vbi1leGlzdGVudCBpZiBpdCBjb250YWlucyBhbnl0aGluZyBlbHNlLlxuICogICAgIGhhczogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICogICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICogICAgICAgICB2YXIgaW50VmFsID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAqICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIGludFZhbCA9PT0gK3ZhbHVlICYmIGludFZhbCA8PSAwO1xuICogICAgIH1cbiAqIH07XG4gKlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtdm9sdW1lPVwiNVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiIGFyaWEtdm9sdW1lPVwibG91ZFwiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLmFyaWEoXCJ2b2x1bWVcIik7XG4gKiAvLyBMb2dzOiBcImhpXCJcbiAqIC8vIC0+IFwiNVwiXG4gKiAkKFwiI3R3b1wiKS5hcmlhKFwidm9sdW1lXCIpOyAvLyAtPiB1bmRlZmluZWRcbiAqL1xuXG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgdGhlIFdBSS1BUklBIGF0dHJpYnV0ZSBzaG91bGQgYmUgcmVtb3ZlZC4gSWYgdGhlIGZ1bmN0aW9uXG4gKiByZXR1cm5zIDxjb2RlPnRydWU8L2NvZGU+IChvciBhIHRydXRoeSB2YWx1ZSkgdGhlbiB0aGUgYXR0cmlidXRlIHdpbGwgYmVcbiAqIHJlbW92ZWQsIGEgZmFsc3kgdmFsdWUgd2lsbCBwcmV2ZW50IHRoZSBhdHRyaWJ1dGUgYmVpbmcgcmVtb3ZlZCB0aHJvdWdoIHRoZVxuICogYXJpYSBtZXRob2RzIChhbHRob3VnaCB0aGVyZSBpcyBub3RoaW5nIHN0b3BwaW5nIGl0IGJlaW5nIHJlbW92ZWQgaW4gYW5vdGhlclxuICogd2F5IG9yIGV2ZW4gdGhyb3VnaCB0aGUgZnVuY3Rpb24gaXRzZWxmKS5cbiAqIDxicj48YnI+XG4gKiBXaGVuIHJlbW92aW5nIGFuIGF0dHJpYnV0ZSwgcGxlYXNlIGRvIG5vdCB1c2VcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWF9LFxuICogW2pRdWVyeSNyZW1vdmVBcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVJlZn0gb3JcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlfSBhcyB0aGlzIGNhblxuICogY3JlYXRlIGFuIGluZmluaXRlIGxvb3AuXG4gKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSAgICBBUklBX2hvb2tfdW5zZXRcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICAgRWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIHJlbW92ZWQuXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgIGF0dHJpYnV0ZVxuICogICAgICAgICAgRnVsbCBhdHRyaWJ1dGUgbmFtZSwgbG93ZXIgY2FzZSBhbmQgaW5jbHVkaW5nIFwiYXJpYS1cIiBwcmVmaXguXG4gKiBAcmV0dXJuICB7Qm9vbGVhbn1cbiAqICAgICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIHJlbW92ZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVtb3ZpbmcgYSBmaWN0aXRpb3VzIFwidm9sdW1lXCIgYXR0cmlidXRlPC9jYXB0aW9uPlxuICogJC5hcmlhSG9va3Mudm9sdW1lID0ge1xuICogICAgIC8vIExldCdzIGFzc3VtZSB0aGF0IHRoZXJlIGlzIGFsc28gYSBcInNvdW5kc2V0dXBcIiBhdHRyaWJ1dGUgYW5kIHRoYXQgaXRcbiAqICAgICAvLyByZXF1aXJlcyB0aGUgXCJ2b2x1bWVcIiBhdHRyaWJ1dGUgdG8gZXhpc3QsIHRodXMgaWYgXCJ2b2x1bWVcIiBpcyByZW1vdmVkLFxuICogICAgIC8vIFwic291bmRzZXR1cFwiIHNob3VsZCBiZSByZW1vdmVkIGFzIHdlbGwuXG4gKiAgICAgdW5zZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyaWJ1dGUpIHtcbiAqICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLXNvdW5kc2V0dXBcIik7XG4gKiAgICAgICAgIHJldHVybiB0cnVlO1xuICogICAgIH1cbiAqIH07XG4gKlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtdm9sdW1lPVwiNVwiIGFyaWEtc291bmRzZXR1cD1cIm1vbm9cIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5yZW1vdmVBcmlhKFwidm9sdW1lXCIpO1xuICpcbiAqIC8vIE5vdyBtYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL3R5cGVkZWYvalF1ZXJ5X3BhcmFtLmpzXG4vKipcbiAqIEFueSBwYXJhbWV0ZXIgdGhhdCBjYW4gYmUgcGFzc2VkIHRvXG4gKiBbalF1ZXJ5J3MgJCBmdW5jdGlvbl17QGxpbmsgaHR0cDovL2FwaS5qcXVlcnkuY29tL2pRdWVyeS99LiBCZSBhd2FyZSB0aGF0XG4gKiBpZiB0aGUgb2JqZWN0IChvciBBcnJheSBvciBOb2RlTGlzdCkgY29udGFpbnMgbXVsdGlwbGUgZWxlbWVudHMsIG9ubHkgdGhlXG4gKiBmaXJzdCB3aWxsIGJlIHVzZWQgd2hlbiBnZXR0aW5nIGluZm9ybWF0aW9uLlxuICpcbiAqIEB0eXBlZGVmIHtBcnJheXxFbGVtZW50fGpRdWVyeXxOb2RlTGlzdHxTdHJpbmd9IGpRdWVyeV9wYXJhbVxuICovXG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvdmFyaWFibGVzLmpzXG5cblxuLy8gQSBzaW1wbGUgY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGEgZ2xvYmFsIFByb3h5IGZ1bmN0aW9uIGFuZCBpdCdzIG5hdGl2ZS5cbi8vIEFsdGhvdWdoIHRoaXMgaXNuJ3QgZm9vbC1wcm9vZiwgaXQncyBhIGZhaXJseSByZWxpYWJsZSB3YXkgb2YgY2hlY2tpbmdcbi8vIHdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIFByb3h5LlxudmFyIElTX1BST1hZX0FWQUlMQUJMRSA9IChcbiAgICB0eXBlb2Ygd2luZG93LlByb3h5ID09PSBcImZ1bmN0aW9uXCJcbiAgICAmJiB3aW5kb3cuUHJveHkudG9TdHJpbmcoKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSA+IC0xXG4pO1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2lkZW50aWZ5LmpzXG5cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGlkZW50aWZ5aW5nIHRoZSBnaXZlbiA8Y29kZT5yZWZlcmVuY2U8L2NvZGU+LiBUaGUgSUQgb2ZcbiAqIHRoZSBmaXJzdCBtYXRjaCBpcyByZXR1cm5lZCAtIHNlZVxuICogW2pRdWVyeSNpZGVudGlmeV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2lkZW50aWZ5fSBmb3IgZnVsbCBkZXRhaWxzLlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7alF1ZXJ5X3BhcmFtfSByZWZlcmVuY2VcbiAqICAgICAgICAgIEVsZW1lbnQgdG8gaWRlbnRpZnkuXG4gKiBAcmV0dXJuICB7U3RyaW5nfVxuICogICAgICAgICAgSUQgb2YgdGhlIGVsZW1lbnQuXG4gKi9cbnZhciBpZGVudGlmeSA9IGZ1bmN0aW9uIChyZWZlcmVuY2UpIHtcblxuICAgIHJldHVybiAkKHJlZmVyZW5jZSkuaWRlbnRpZnkoKTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9pZGVudGl0eS5qc1xuLyoqXG4gKiBBbiBpZGVudGl0eSBmdW5jdGlvbiB0aGF0IHNpbXBseSByZXR1cm5zIHdoYXRldmVyIGl0IGlzIGdpdmVuIHdpdGhvdXRcbiAqIG1vZGlmeWluZyBpdC4gVGhpcyBjYW4gYmUgdXNlZnVsIGZvciBjYXNlcyB3aGVuIGEgbW9kaWZpY2F0aW9uIGZ1bmN0aW9uIGlzXG4gKiBuZWVkZWQgYnV0IG9wdGlvbmFsLlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7P30geFxuICogICAgICAgICAgT2JqZWN0IHRvIHJldHVybi5cbiAqIEByZXR1cm4gIHs/fVxuICogICAgICAgICAgT3JpZ2luYWwgb2JqZWN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpZGVudGl0eShcImFcIik7ICAgICAgICAgICAvLyAtPiBcImFcIlxuICogaWRlbnRpdHkoXCJhXCIsIFwiYlwiKTsgICAgICAvLyAtPiBcImFcIiwgb25seSBmaXJzdCBhcmd1bWVudCBpcyByZXR1cm5lZC5cbiAqIGlkZW50aXR5LmNhbGwoXCJiXCIsIFwiYVwiKTsgLy8gLT4gXCJhXCIsIGNvbnRleHQgaGFzIG5vIGVmZmVjdC5cbiAqL1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gKHgpIHtcblxuICAgIHJldHVybiB4O1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2ludGVycHJldFN0cmluZy5qc1xuLyoqXG4gKiBJbnRlcnByZXRzIHRoZSBnaXZlbiBvYmplY3QgYXMgYSBzdHJpbmcuIElmIHRoZSBvYmplY3QgaXMgPGNvZGU+bnVsbDwvY29kZT5cbiAqIG9yIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4sIGFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICAgez99IHN0cmluZ1xuICogICAgICAgICAgT2JqZWN0IHRvIGludGVycHJldC5cbiAqIEByZXR1cm4gIHtTdHJpbmd9XG4gKiAgICAgICAgICBJbnRlcnByZXRlZCBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIGludGVycHJldFN0cmluZyhcIjFcIik7ICAgICAgIC8vIC0+IFwiMVwiXG4gKiBpbnRlcnByZXRTdHJpbmcoMSk7ICAgICAgICAgLy8gLT4gXCIxXCJcbiAqIGludGVycHJldFN0cmluZyhbMSwgMl0pOyAgICAvLyAtPiBcIjEsMlwiXG4gKiBpbnRlcnByZXRTdHJpbmcobnVsbCk7ICAgICAgLy8gLT4gXCJcIlxuICogaW50ZXJwcmV0U3RyaW5nKHVuZGVmaW5lZCk7IC8vIC0+IFwiXCJcbiAqIGludGVycHJldFN0cmluZygpOyAgICAgICAgICAvLyAtPiBcIlwiXG4gKi9cbnZhciBpbnRlcnByZXRTdHJpbmcgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gKHN0cmluZyA9PT0gbnVsbCB8fCBzdHJpbmcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgPyBcIlwiXG4gICAgICAgIDogU3RyaW5nKHN0cmluZyk7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvaXNFbGVtZW50LmpzXG4vKipcbiAqIFJldHVybnMgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGdpdmVuIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIGFuIEhUTUxcbiAqIGVsZW1lbnQuXG4gKlxuICogQGdsb2JhbFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSAgIHs/fSBlbGVtZW50XG4gKiAgICAgICAgICBPYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4gIHtCb29sZWFufVxuICogICAgICAgICAgdHJ1ZSBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBhbiBIVE1MRWxlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogaXNFbGVtZW50KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpOyAvLyAtPiB0cnVlXG4gKiBpc0VsZW1lbnQoZG9jdW1lbnQuYm9keSk7IC8vIC0+IHRydWVcbiAqIGlzRWxlbWVudChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7IC8vIC0+IGZhbHNlXG4gKiBpc0VsZW1lbnQoJChcImJvZHlcIikpOyAvLyAtPiBmYWxzZVxuICogaXNFbGVtZW50KCQoXCJib2R5XCIpWzBdKTsgLy8gLT4gdHJ1ZVxuICovXG52YXIgaXNFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgIHJldHVybiAoL15cXFtvYmplY3RcXHNIVE1MW0EtWmEtel0rRWxlbWVudFxcXSQvKS50ZXN0KGVsZW1lbnQpO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL21lbW9pc2UuanNcblxuXG4vKipcbiAqIE1vZGlmaWVzIGEgZnVuY3Rpb24gc28gdGhhdCB0aGUgcmVzdWx0cyBhcmUgcmV0cmlldmVkIGZyb20gYSBjYWNoZSBpZlxuICogcG9zc2libGUgcmF0aGVyIHRoYW4gZnJvbSBleGVjdXRpbmcgdGhlIGZ1bmN0aW9uIGFnYWluLiBUaGUgY2FjaGUgaXMgcHVibGljbHlcbiAqIGV4cG9zZWQgKGFzIHRoZSBwcm9wZXJ0eSA8Y29kZT5jYWNoZTwvY29kZT4pIHRvIGFsbG93IGl0IHRvIGJlIGNsZWFyZWQsXG4gKiBmb3JjaW5nIHRoZSBmdW5jdGlvbiB0byByZS1leGVjdXRlLlxuICogPGJyPjxicj5cbiAqIElmIGRlZmluZWQsIHRoZSA8Y29kZT5yZXNvbHZlcjwvY29kZT4gaXMgcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyB0aGVcbiAqIDxjb2RlPmhhbmRsZXI8L2NvZGU+OyBpdCBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIGFuZCB0aGF0IHN0cmluZyB3aWxsIGJlIHVzZWRcbiAqIGFzIHRoZSBrZXkgZm9yIDxjb2RlPmNhY2hlPC9jb2RlPi4gSWYgYSA8Y29kZT5yZXNvbHZlcjwvY29kZT4gaXNuJ3QgZGVmaW5lZCxcbiAqIG9yIGlzbid0IGEgZnVuY3Rpb24sIHRoZSBhcmd1bWVudHMgYXJlIHNpbXBseSBqb2luZWQgdG9nZXRoZXIgYXMgYVxuICogY29tbWEtc2VwYXJhdGVkIHN0cmluZy5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKiAgICAgICAgICBGdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdXG4gKiAgICAgICAgICBPcHRpb25hbCBmdW5jdGlvbiBmb3Igd29ya2luZyBvdXQgdGhlIGtleSBmb3IgdGhlIGNhY2hlLlxuICogQHJldHVybiAge0Z1bmN0aW9ufVxuICogICAgICAgICAgQ29udmVydGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkJhc2ljIGV4YW1wbGU8L2NhcHRpb24+XG4gKiB2YXIgaW5jcmVhc2UgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gKiAgICAgY29uc29sZS5sb2cobnVtYmVyKTtcbiAqICAgICByZXR1cm4gbnVtYmVyICsgMTtcbiAqIH07XG4gKiB2YXIgbWVtSW5jcmVhc2UgPSBtZW1vaXNlKGluY3JlYXNlKTtcbiAqXG4gKiBtZW1JbmNyZWFzZSgxKTtcbiAqIC8vIExvZ3M6IDFcbiAqIC8vIC0+IDJcbiAqIG1lbUluY3JlYXNlKDEpOyAvLyAtPiAyXG4gKiBtZW1pbmNyZWFzZSgyKTtcbiAqIC8vIExvZ3M6IDJcbiAqIC8vIC0+IDNcbiAqIG1lbUluY3JlYXNlKDEpOyAvLyAtPiAxXG4gKiBtZW1JbmNyZWFzZS5jYWNoZTsgLy8gLT4ge1wiMVwiOiAyLCBcIjJcIjogM31cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TcGVjaWZ5aW5nIGEgcmVzb2x2ZXI8L2NhcHRpb24+XG4gKiB2YXIgc3VtID0gZnVuY3Rpb24gKG51bWJlcnMpIHtcbiAqICAgICByZXR1cm4gbnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcbiAqICAgICAgICAgcmV0dXJuIHByZXYgKyBjdXJyO1xuICogICAgIH0sIDApO1xuICogfTtcbiAqIHZhciBtZW1TdW0gPSBtZW1vaXNlKHN1bSwgZnVuY3Rpb24gKG51bWJlcnMpIHtcbiAqICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobnVtYmVycyk7XG4gKiB9KTtcbiAqIG1lbVN1bShbMSwgMiwgM10pOyAvLyAtPiA2XG4gKiBtZW1TdW0uY2FjaGU7IC8vIC0+IHtcIlsxLDIsM11cIjogNn1cbiAqL1xudmFyIG1lbW9pc2UgPSBmdW5jdGlvbiAoaGFuZGxlciwgcmVzb2x2ZXIpIHtcblxuICAgIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgbWVtb2lzZWQgPSBmdW5jdGlvbiBtZW0oKSB7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBrZXkgPSB0eXBlb2YgcmVzb2x2ZXIgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyByZXNvbHZlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpXG4gICAgICAgICAgICA6IGFyZ3Muam9pbihcIixcIik7XG4gICAgICAgIHZhciByZXNwb25zZSA9IG1lbS5jYWNoZVtrZXldO1xuY29uc29sZS5sb2coXCJtZW1vaXNlKCkga2V5ID0gXCIgKyBrZXkgKyBcIiBhbmQgcmVzcG9uc2UgPSBcIiArIChyZXNwb25zZSA9PT0gdW5kZWZpbmVkID8gXCIodW5kZWZpbmVkKVwiIDogcmVzcG9uc2UpKTtcbiAgICAgICAgaWYgKCFoYXNPd24uY2FsbChtZW0uY2FjaGUsIGtleSkpIHtcblxuICAgICAgICAgICAgcmVzcG9uc2UgPSBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgbWVtLmNhY2hlW2tleV0gPSByZXNwb25zZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuXG4gICAgfTtcblxuICAgIG1lbW9pc2VkLmNhY2hlID0ge307XG5cbiAgICByZXR1cm4gbWVtb2lzZWQ7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvbm9ybWFsaXNlLmpzXG5cblxuLyoqXG4gKiBOb3JtYWxpc2VzIGEgV0FJLUFSSUEgYXR0cmlidXRlIG5hbWUgc28gdGhhdCBpdCdzIGFsd2F5cyBsb3dlciBjYXNlIGFuZFxuICogYWx3YXlzIHN0YXJzIHdpdGggPGNvZGU+YXJpYS08L2NvZGU+LiBJZiB0aGUgdW5wcmVmaXhlZCB2YWx1ZSBhcHBlYXJzIGluXG4gKiBbalF1ZXJ5LmFyaWFGaXhde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5hcmlhRml4fSB0aGVuIHRoZSBtYXBwZWQgdmVyc2lvbiBpc1xuICogdXNlZCBiZWZvcmUgYmVpbmcgcHJlZml4ZWQuXG4gKiA8YnI+PGJyPlxuICogVGhlIHJlc3VsdHMgb2YgdGhpcyBmdW5jdGlvbiBhcmUgY2FjaGVkIHRvIGhlbHAgcmVkdWNlIHByb2Nlc3NpbmcuIFRoaXMgaXNcbiAqIGV4cG9zZWQgYXMgPGNvZGU+alF1ZXJ5Lm5vcm1hbGlzZUFyaWEuY2FjaGU8L2NvZGU+IGlmIG5lZWRlZCBidXQgdGhlcmUgaXMgbm9cbiAqIG5lZWQgdG8gY2xlYXIgdGhlIGNhY2hlIGFmdGVyIG1vZGlmeWluZ1xuICogW2pRdWVyeS5hcmlhRml4XXtAbGluayBleHRlcm5hbDpqUXVlcnkuYXJpYUZpeH0gLSBjaGFuZ2VzIGFyZSBhdXRvbWF0aWNhbGx5XG4gKiBjb25zaWRlcmVkIGluIHRoZSBjYWNoaW5nIHByb2Nlc3MuXG4gKiA8YnI+PGJyPlxuICogVGhpcyBmdW5jdGlvbiBpcyBhbGlhc2VkIGFzXG4gKiBbalF1ZXJ5Lm5vcm1hbGl6ZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpemVBcmlhfS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBhbGlhcyAgICBleHRlcm5hbDpqUXVlcnkubm9ybWFsaXNlQXJpYVxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQHBhcmFtICAgIHtTdHJpbmd9IG5hbWVcbiAqICAgICAgICAgICBBdHRyaWJ1dGUgbmFtZSB0byBub3JtYWxpc2UuXG4gKiBAcmV0dXJuICAge1N0cmluZ31cbiAqICAgICAgICAgICBOb3JtYWxpc2VkIGF0dHJpYnV0ZSBuYW1lLlxuICogQHByb3BlcnR5IHtPYmplY3QuPFN0cmluZz59IGNhY2hlXG4gKiAgICAgICAgICAgVGhlIGNhY2hlIG9mIHJlcXVlc3RzIHRvIHJlc3BvbnNlcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5CYXNpYyBleGFtcGxlPC9jYXB0aW9uPlxuICogJC5ub3JtYWxpc2VBcmlhKFwibGFiZWxcIik7ICAgICAgLy8gLT4gXCJhcmlhLWxhYmVsXCJcbiAqICQubm9ybWFsaXNlQXJpYShcIkxBQkVMXCIpOyAgICAgIC8vIC0+IFwiYXJpYS1sYWJlbFwiXG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJhcmlhLWxhYmVsXCIpOyAvLyAtPiBcImFyaWEtbGFiZWxcIlxuICogJC5ub3JtYWxpc2VBcmlhKCk7ICAgICAgICAgICAgIC8vIC0+IFwiYXJpYS1cIlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFsaWFzPC9jYXB0aW9uPlxuICogJC5ub3JtYWxpemVBcmlhKFwibGFiZWxcIik7ICAgICAgLy8gLT4gXCJhcmlhLWxhYmVsXCJcbiAqICQubm9ybWFsaXplQXJpYShcIkxBQkVMXCIpOyAgICAgIC8vIC0+IFwiYXJpYS1sYWJlbFwiXG4gKiAkLm5vcm1hbGl6ZUFyaWEoXCJhcmlhLWxhYmVsXCIpOyAvLyAtPiBcImFyaWEtbGFiZWxcIlxuICogJC5ub3JtYWxpemVBcmlhKCk7ICAgICAgICAgICAgIC8vIC0+IFwiYXJpYS1cIlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcHBlZCBhdHRyaWJ1dGU8L2NhcHRpb24+XG4gKiAvLyAkLmFyaWFGaXggPSB7bGFiZWxlZGJ5OiBcImxhYmVsbGVkYnlcIn1cbiAqICQubm9ybWFsaXNlQXJpYShcImxhYmVsZWRieVwiKTsgICAgICAvLyAtPiBcImFyaWEtbGFiZWxsZWRieVwiXG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJMQUJFTEVEQllcIik7ICAgICAgLy8gLT4gXCJhcmlhLWxhYmVsbGVkYnlcIlxuICogJC5ub3JtYWxpc2VBcmlhKFwiYXJpYS1sYWJlbGVkYnlcIik7IC8vIC0+IFwiYXJpYS1sYWJlbGxlZGJ5XCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgY2FjaGU8L2NhcHRpb24+XG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJidXN5XCIpOyAgICAvLyAtPiBcImFyaWEtYnVzeVwiXG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJidXN5XCIpOyAgICAvLyAtPiBcImFyaWEtYnVzeVwiIChmcm9tIGNhY2hlKVxuICogJC5ub3JtYWxpc2VBcmlhKFwiY2hlY2tlZFwiKTsgLy8gLT4gXCJhcmlhLWNoZWNrZWRcIlxuICogJC5ub3JtYWxpc2VBcmlhKFwiYnVzeVwiKTsgICAgLy8gLT4gXCJhcmlhLWJ1c3lcIiAoZnJvbSBjYWNoZSlcbiAqICQubm9ybWFsaXNlQXJpYS5jYWNoZTtcbiAqIC8vIC0+IHtcImJ1c3lcIjogXCJhcmlhLWJ1c3lcIiwgXCJjaGVja2VkXCI6IFwiYXJpYS1jaGVja2VkXCJ9XG4gKi9cbnZhciBub3JtYWxpc2UgPSBtZW1vaXNlKFxuICAgIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgdmFyIHByZWZpeCA9IFwiYXJpYS1cIjtcbiAgICAgICAgdmFyIGxvd2VyID0gaW50ZXJwcmV0U3RyaW5nKG5hbWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBmdWxsID0gc3RhcnRzV2l0aC5jYWxsKGxvd2VyLCBwcmVmaXgpXG4gICAgICAgICAgICA/IGxvd2VyXG4gICAgICAgICAgICA6IHByZWZpeCArIGxvd2VyO1xuICAgICAgICB2YXIgc3RlbSA9IGZ1bGwuc2xpY2UocHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIHZhciBtYXAgPSAkLmFyaWFGaXhbc3RlbV07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuXG4gICAgICAgICAgICBzdGVtID0gbWFwO1xuICAgICAgICAgICAgZnVsbCA9IHByZWZpeCArIHN0ZW07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdWxsO1xuXG4gICAgfSxcbiAgICBJU19QUk9YWV9BVkFJTEFCTEVcbiAgICAgICAgPyBpZGVudGl0eVxuICAgICAgICA6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuYW1lICsgXCJ8XCIgKyBKU09OLnN0cmluZ2lmeSgkLmFyaWFGaXgpO1xuXG4gICAgICAgIH1cbik7XG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvc3RhcnRzV2l0aC5qc1xuXG5cbi8qKlxuICogQSBmYWxsYmFjayBmb3Igb2xkZXIgYnJvd3NlcnMgdGhhdCBkbyBub3QgdW5kZXJzdGFuZFxuICogW1N0cmluZyNzdGFydHNXaXRoXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvc3RhcnRzV2l0aH1cbiAqIHdpdGhvdXQgbW9kaWZpeWluZyA8Y29kZT5TdHJpbmcucHJvdG90eXBlPC9jb2RlPiB1bm5lY2Vzc2FyaWx5LlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSAgICB7U3RyaW5nfSB0ZXh0XG4gKiAgICAgICAgICAgU3RyaW5nIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0gICAge051bWJlcn0gW29mZnNldD0wXVxuICogICAgICAgICAgIE9mZnNldCBmcm9tIHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybiAgIHtCb29sZWFufVxuICogICAgICAgICAgIFRydWUgaWYgdGhlIHN0cmluZyBzdGFydHMgd2l0aCA8Y29kZT50ZXh0PC9jb2RlPiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBzdGFydHNXaXRoLmNhbGwoXCJhYmNkZWZcIiwgXCJhYmNcIik7IC8vIC0+IHRydWVcbiAqL1xudmFyIHN0YXJ0c1dpdGggPSBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggfHwgZnVuY3Rpb24gKHRleHQsIG9mZnNldCkge1xuXG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZih0ZXh0LCBvZmZzZXQpID09PSAwO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL3RvV29yZHMuanNcblxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0aGUgd29yZHMuIFRoZSA8Y29kZT5zdHJpbmc8L2NvZGU+XG4gKiBhcmd1bWVudCBpcyBjb252ZXJ0ZWQgaW50byBhIHN0cmluZyBiZWZvcmUgYmVpbmcgc3BsaXQgLSBzZWVcbiAqIHtAbGluayBpbnRlcnByZXRTdHJpbmd9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBzdHJpbmdcbiAqICAgICAgICAgIFN0cmluZyAob3Igb3RoZXIgdmFyaWFibGUgdHlwZSkgdG8gYnJlYWsgaW50byB3b3Jkcy5cbiAqIEByZXR1cm4gIHtBcnJheS48U3RyaW5nPn1cbiAqICAgICAgICAgIFdvcmRzIGZyb20gdGhlIHN0cmluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogdG9Xb3JkcyhcImFiYyBkZWZcIik7ICAvLyAtPiBbXCJhYmNcIiwgXCJkZWZcIl1cbiAqIHRvV29yZHMoXCJhYmMgIGRlZlwiKTsgLy8gLT4gW1wiYWJjXCIsIFwiZGVmXCJdXG4gKiB0b1dvcmRzKFwiXCIpICAgICAgICAgIC8vIC0+IFtdXG4gKiB0b1dvcmRzKFwiICAgXCIpOyAgICAgIC8vIC0+IFtdXG4gKi9cbnZhciB0b1dvcmRzID0gZnVuY3Rpb24gKHN0cmluZykge1xuXG4gICAgcmV0dXJuIGludGVycHJldFN0cmluZyhzdHJpbmcpLnNwbGl0KC9cXHMrLykuZmlsdGVyKGlkZW50aXR5KTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9oYW5kbGVycy5qc1xudmFyIEhBTkRMRVJfUFJPUEVSVFkgPSBcInByb3BlcnR5XCI7XG52YXIgSEFORExFUl9SRUZFUkVOQ0UgPSBcInJlZmVyZW5jZVwiO1xudmFyIEhBTkRMRVJfU1RBVEUgPSBcInN0YXRlXCI7XG5cbi8qKlxuICogSGFuZGxlcnMgZm9yIHByb3BlcnRpZXMsIHJlZmVyZW5jZXMgYW5kIHN0YXRlcy4gRWFjaCBoYW5kbGVyIGhhcyBhdCBsZWFzdCBhXG4gKiA8Y29kZT5nZXQ8L2NvZGU+IGFuZCA8Y29kZT5zZXQ8L2NvZGU+IG1ldGhvZCB0byB3cml0ZSBhbmQgcmVhZCB0aGUgdmFsdWVzLlxuICogPGNvZGU+aGFzPC9jb2RlPiBtZXRob2RzIGNoZWNrIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0cyxcbiAqIDxjb2RlPnVuc2V0PC9jb2RlPiByZW1vdmVzIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiB7QGxpbmsgaGFuZGxlcnMucmVmZXJlbmNlfSBhbmQge0BsaW5rIGhhbmRsZXJzLnN0YXRlfSBkZWZlciB0b1xuICoge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5fSAodGhleSBkb24ndCBpbmhlcml0IGZyb20ge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5fVxuICogYnV0IHRoZXkgbWF5IGRvIGluIGFub3RoZXIgaW1wbGVtZW50YXRpb24gLSBhbnkgZnVuY3Rpb25hbGl0eSB0aGV5IGRvbid0IGhhdmVcbiAqIHdpbGwgYmUgdGFrZW4gZnJvbSB7QGxpbmsgaGFuZGxlcnMucHJvcGVydHl9KS5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAbmFtZXNwYWNlXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaGFuZGxlcnMgPSB7fTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9oYW5kbGVycy9wcm9wZXJ0eS5qc1xuXG5cbi8qKlxuICogSGFuZGxlcyBXQUktQVJJQSBwcm9wZXJ0aWVzIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSB2YWx1ZXMgYW55IG1vcmUgdGhhbiBpdFxuICogbmVlZHMgdG8uIFRoZXNlIG1ldGhvZHMgYWxzbyBhY3QgYXMgdGhlIGZhbGxiYWNrIGZvciBvdGhlciBuYW1lc3BhY2VzIHN1Y2ggYXNcbiAqIHtAbGluayBoYW5kbGVycy5yZWZlcmVuY2V9IGFuZCB7QGxpbmsgaGFuZGxlcnMuc3RhdGV9LlxuICogPGJyPntAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5wYXJzZX0gcGFyc2VzIHRoZSBhdHRyaWJ1dGUgbmFtZS5cbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucHJvcGVydHkuZ2V0fSBnZXRzIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkuXG4gKiA8YnI+e0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5LnNldH0gc2V0cyBhIHByb3BlcnR5LlxuICogPGJyPntAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5oYXN9IGNoZWNrcyB0byBzZWUgaWYgdGhlIHByb3BlcnR5IGV4aXN0cy5cbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucHJvcGVydHkudW5zZXR9IHJlbW92ZXMgdGhlIHByb3BlcnR5LlxuICpcbiAqIEBhbGlhcyAgICAgcHJvcGVydHlcbiAqIEBtZW1iZXJvZiAgaGFuZGxlcnNcbiAqIEBuYW1lc3BhY2VcbiAqIEBwcml2YXRlXG4gKi9cbmhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldID0ge1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBuYW1lIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBub3JtYWxpc2VkIG5hbWUgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9IGFuZCB0aGVcbiAgICAgKiB1bi1wcmVmaXhlZCBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqICAgICAgICAgQXR0cmlidXRlIG5hbWUgdG8gcGFyc2UuXG4gICAgICogQHJldHVybiB7T2JqZWN0LjxTdHJpbmc+fVxuICAgICAqICAgICAgICAgQW4gb2JqZWN0IHdpdGggXCJmdWxsXCIgYW5kIFwic3RlbVwiIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LnBhcnNlKFwiYnVzeVwiKTtcbiAgICAgKiAvLyAtPiB7ZnVsbDogXCJhcmlhLWJ1c3lcIiwgc3RlbTogXCJidXN5XCJ9XG4gICAgICovXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgdmFyIG5vcm1hbCA9IG5vcm1hbGlzZShuYW1lKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZnVsbDogbm9ybWFsLFxuICAgICAgICAgICAgc3RlbTogbm9ybWFsLnNsaWNlKDUpXG4gICAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvcGVydHkgb2YgYW4gZWxlbWVudC4gVGhlIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyB1bmNoYW5nZWRcbiAgICAgKiAob3RoZXIgdGhhbiBub3JtYWwgc3RyaW5nIGNvZXJjaW9uKSBhbmQgdGhlIDxjb2RlPm5hbWU8L2NvZGU+IGlzXG4gICAgICogbm9ybWFsaXNlZCBpbnRvIGEgV0FJLUFSSUEgcHJvcGVydHkgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAgICAgKiA8YnI+PGJyPlxuICAgICAqIElmIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIG5vdCBhbiBlbGVtZW50IChzZWUge0BsaW5rIGlzRWxlbWVudH0pIHRoZW4gbm9cbiAgICAgKiBhY3Rpb24gd2lsbCBiZSB0YWtlbi5cbiAgICAgKiA8YnI+PGJyPlxuICAgICAqIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyBhIGZ1bmN0aW9uLCBpdCBpcyB0cmVhdGVkIGxpa2UgYW5cbiAgICAgKiB7QGxpbmsgQXR0cmlidXRlX2NhbGxiYWNrfS4gVGhpcyBpcyBmb3IgY29uc2lzdGVuY3kgd2l0aFxuICAgICAqIFtqUXVlcnkjYXR0cl17QGxpbmsgaHR0cDovL2FwaS5qcXVlcnkuY29tL2F0dHIvfS5cbiAgICAgKiA8YnI+PGJyPlxuICAgICAqIEEgPGNvZGU+Y29udmVydDwvY29kZT4gZnVuY3Rpb24gY2FuIGFsc28gYmUgcGFzc2VkLiBUaGF0IGZ1bmN0aW9uIHdpbGxcbiAgICAgKiBjb252ZXJ0IDxjb2RlPnZhbHVlPC9jb2RlPiAoaWYgPGNvZGU+dmFsdWU8L2NvZGU+IGlzIGEgZnVuY3Rpb24sXG4gICAgICogPGNvZGU+Y29udmVydDwvY29kZT4gd2lsbCBjb252ZXJ0IHRoZSByZXN1bHQpIGJlZm9yZSBhc3NpZ25pbmcgaXQuIElmXG4gICAgICogPGNvZGU+Y29udmVydDwvY29kZT4gaXMgb21taXR0ZWQgb3Igbm90IGEgZnVuY3Rpb24gdGhlbiB7QGxpbmsgaWRlbnRpdHl9XG4gICAgICogaXMgdXNlZCBzbyA8Y29kZT52YWx1ZTwvY29kZT4gd2lsbCBub3QgYmUgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICAge0VsZW1lbnR9ICBlbGVtZW50XG4gICAgICogICAgICAgICAgRWxlbWVudCB0byBoYXZlIGEgcHJvcGVydHkgc2V0LlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgbmFtZVxuICAgICAqICAgICAgICAgIFdBSS1BUklBIHByb3BlcnR5IHRvIHNldC5cbiAgICAgKiBAcGFyYW0gICB7P30gICAgICAgIHZhbHVlXG4gICAgICogICAgICAgICAgVmFsdWUgb2YgdGhlIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICAgW2luZGV4XVxuICAgICAqICAgICAgICAgIE9wdGlvbmFsIGluZGV4IG9mIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IHdpdGhpbiB0aGUgalF1ZXJ5IG9iamVjdC5cbiAgICAgKiAgICAgICAgICBUaGlzIGlzIG5lZWRlZCB0byBrZWVwIGNvbnNpc3RlbmN5IHdpdGggdGhlXG4gICAgICogICAgICAgICAgW2pRdWVyeSNhdHRyXXtAbGluayBodHRwOi8vYXBpLmpxdWVyeS5jb20vYXR0ci99IGZ1bmN0aW9uIGFuZFxuICAgICAqICAgICAgICAgIHNob3VsZCBiZSBkZXJpdmVkIHJhdGhlciB0aGFuIG1hbnVhbGx5IHBhc3NlZC5cbiAgICAgKiBAcGFyYW0gICB7RnVuY3Rpb259IFtjb252ZXJ0PWlkZW50aXR5XVxuICAgICAqICAgICAgICAgIE9wdGlvbmFsIGNvbnZlcnNpb24gcHJvY2Vzcy4gSWYgb21taXR0ZWQsIG5vIGNvbnZlcnNpb24gb2NjdXJzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U2V0dGluZyBhIHByb3BlcnR5PC9jYXB0aW9uPlxuICAgICAqIC8vIE1hcmt1cCBpczpcbiAgICAgKiAvLyA8ZGl2IGlkPVwib25lXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LnNldChlbGVtZW50LCBcImxhYmVsXCIsIFwidGVzdFwiKTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJ0ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIGEgcHJvcGVydHkgdXNpbmcgYSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAgICAgKiAvLyBNYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJ0ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LnNldChlbGVtZW50LCBcImxhYmVsXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gICAgICogICAgIHJldHVybiB0aGlzLmlkICsgXCJfX1wiICsgaSArIFwiX19cIiArIGF0dHI7XG4gICAgICogfSwgMCk7XG4gICAgICpcbiAgICAgKiAvLyBOb3cgbWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwib25lX18wX190ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0aW5nIHRoZSByZXN1bHQ8L2NhcHRpb24+XG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICAgICAqXG4gICAgICogdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uZVwiKTtcbiAgICAgKiBoYW5kbGVycy5wcm9wZXJ0eS5zZXQoZWxlbWVudCwgXCJsYWJlbFwiLCBmdW5jdGlvbiAoaSwgYXR0cikge1xuICAgICAqICAgICByZXR1cm4gdGhpcy5pZCArIFwiX19cIiArIGkgKyBcIl9fXCIgKyBhdHRyO1xuICAgICAqIH0sIDAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAqICAgICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJPTkVfXzBfX1RFU1RcIj48L2Rpdj5cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lLCB2YWx1ZSwgaW5kZXgsIGNvbnZlcnQpIHtcblxuICAgICAgICB2YXIgcHJvcCA9IGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldLnBhcnNlKG5hbWUpO1xuICAgICAgICB2YXIgaG9vayA9ICQuYXJpYUhvb2tzW3Byb3Auc3RlbV07XG5cbiAgICAgICAgaWYgKGlzRWxlbWVudChlbGVtZW50KSkge1xuXG4gICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUocHJvcC5mdWxsKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEkLmlzRnVuY3Rpb24oY29udmVydCkpIHtcbiAgICAgICAgICAgICAgICBjb252ZXJ0ID0gaWRlbnRpdHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaG9vayAmJiBob29rLnNldCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGhvb2suc2V0KGVsZW1lbnQsIHZhbHVlLCBwcm9wLmZ1bGwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gY29udmVydCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wLmZ1bGwsIGludGVycHJldFN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBnaXZlbiA8Y29kZT5uYW1lPC9jb2RlPiBleGlzdHMgb24gdGhlIGdpdmVuXG4gICAgICogPGNvZGU+ZWxlbWVudDwvY29kZT4uIFRoZSA8Y29kZT5uYW1lPC9jb2RlPiBpcyBhbHdheXMgbm9ybWFsaXNlZCAoc2VlXG4gICAgICogW2pRdWVyeS5ub3JtYWxpc2VBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkubm9ybWFsaXNlQXJpYX0pIGFuZCBpZlxuICAgICAqIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIG5vdCBhbiBlbGVtZW50IChzZWUge0BsaW5rIGlzRWxlbWVudH0pIHRoZW5cbiAgICAgKiA8Y29kZT5mYWxzZTwvY29kZT4gd2lsbCBhbHdheXMgYmUgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAgIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogICAgICAgICAgRWxlbWVudCB0byB0ZXN0LlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgcHJvcGVydHkgdG8gY2hlY2suXG4gICAgICogQHJldHVybiAge0Jvb2xlYW59XG4gICAgICogICAgICAgICAgV2hldGhlciBvciBub3QgdGhlIGVsZW1lbnQgaGFzIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICAgICAqXG4gICAgICogdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uZVwiKTtcbiAgICAgKiBoYW5kbGVycy5wcm9wZXJ0eS5oYXMoZWxlbWVudCwgXCJsYWJlbFwiKTsgLy8gLT4gdHJ1ZVxuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LmhhcyhlbGVtZW50LCBcImJ1c3lcIik7ICAvLyAtPiBmYWxzZVxuICAgICAqL1xuICAgIGhhczogZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUpIHtcblxuICAgICAgICB2YXIgcHJvcCA9IGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldLnBhcnNlKG5hbWUpO1xuICAgICAgICB2YXIgaG9vayA9ICQuYXJpYUhvb2tzW3Byb3Auc3RlbV07XG5cbiAgICAgICAgcmV0dXJuIGlzRWxlbWVudChlbGVtZW50KVxuICAgICAgICAgICAgPyAoaG9vayAmJiBob29rLmhhcylcbiAgICAgICAgICAgICAgICA/IGhvb2suaGFzKGVsZW1lbnQsIHByb3AuZnVsbClcbiAgICAgICAgICAgICAgICA6IGVsZW1lbnQuaGFzQXR0cmlidXRlKHByb3AuZnVsbClcbiAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIFdBSS1BUklBIHByb3BlcnR5IGZyb20gdGhlIGdpdmVuXG4gICAgICogPGNvZGU+ZWxlbWVudDwvY29kZT4gYW5kIHJldHVybnMgaXQgdW5jaGFuZ2VkLiBUaGUgPGNvZGU+bmFtZTwvY29kZT4gaXNcbiAgICAgKiBub3JtYWxpc2VkIChzZWVcbiAgICAgKiBbalF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSkuIElmXG4gICAgICogPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgbm90IGFuIGVsZW1lbnQgKHNlZSB7QGxpbmsgaXNFbGVtZW50fSkgb3JcbiAgICAgKiA8Y29kZT5uYW1lPC9jb2RlPiBpcyBub3QgcmVjb2duaXNlZCAoc2VlXG4gICAgICoge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5Lmhhc30pIHRoZW4gPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICAge0VsZW1lbnR9ICAgICAgICAgIGVsZW1lbnRcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIGFjY2Vzcy5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgICAgbmFtZVxuICAgICAqICAgICAgICAgIFdBSS1BUklBIHByb3BlcnR5IHRvIGFjY2Vzcy5cbiAgICAgKiBAcmV0dXJuICB7U3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgICAgICAgICBXQUktQVJJQSBhdHRyaWJ1dGUgb3IgdW5kZWZpbmVkIGlmIHRoZSBhdHRyaWJ1dGUgaXNuJ3Qgc2V0LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBNYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJ0ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LmdldChlbGVtZW50LCBcImxhYmVsXCIpOyAvLyAtPiBcInRlc3RcIlxuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LmdldChlbGVtZW50LCBcImJ1c3lcIik7IC8vIC0+IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUpIHtcblxuICAgICAgICB2YXIgaGFuZGxlciA9IGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldO1xuICAgICAgICB2YXIgcHJvcCA9IGhhbmRsZXIucGFyc2UobmFtZSk7XG4gICAgICAgIHZhciBob29rID0gJC5hcmlhSG9va3NbcHJvcC5zdGVtXTtcbiAgICAgICAgdmFyIHJlc3BvbnNlID0gaGFuZGxlci5oYXMoZWxlbWVudCwgbmFtZSlcbiAgICAgICAgICAgID8gKGhvb2sgJiYgaG9vay5nZXQpXG4gICAgICAgICAgICAgICAgPyBob29rLmdldChlbGVtZW50LCBwcm9wLmZ1bGwpXG4gICAgICAgICAgICAgICAgOiBlbGVtZW50LmdldEF0dHJpYnV0ZShwcm9wLmZ1bGwpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBnZXRBdHRyaWJ1dGUgY2FuIHJldHVybiBudWxsLCBub3JtYWxpc2UgdG8gdW5kZWZpbmVkLlxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgPT09IG51bGxcbiAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICA6IHJlc3BvbnNlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBXQUktQVJJQSBhdHRyaWJ1dGUgZnJvbSB0aGUgZ2l2ZW4gPGNvZGU+ZWxlbWVudDwvY29kZT4uIFRoZVxuICAgICAqIDxjb2RlPm5hbWU8L2NvZGU+IGlmIG5vcm1hbGlzZWQgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KSBhbmQgaWZcbiAgICAgKiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBub3QgYW4gZWxlbWVudCAoc2VlIHtAbGluayBpc0VsZW1lbnR9KSB0aGVuIG5vXG4gICAgICogYWN0aW9uIGlzIHRha2VuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gICB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqICAgICAgICAgIEVsZW1lbnQgdG8gbW9kaWZ5LlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgYXR0cmlidXRlIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICAgICAqXG4gICAgICogdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uZVwiKTtcbiAgICAgKiBoYW5kbGVycy5wcm9wZXJ0eS51bnNldChlbGVtZW50LCBcImxhYmVsXCIpO1xuICAgICAqXG4gICAgICogLy8gTm93IG1hcmt1cCBpczpcbiAgICAgKiAvLyA8ZGl2IGlkPVwib25lXCI+PC9kaXY+XG4gICAgICovXG4gICAgdW5zZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lKSB7XG5cbiAgICAgICAgdmFyIHByb3AgPSBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXS5wYXJzZShuYW1lKTtcbiAgICAgICAgdmFyIGhvb2sgPSAkLmFyaWFIb29rc1twcm9wLnN0ZW1dO1xuXG4gICAgICAgIGlmIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcblxuICAgICAgICAgICAgaWYgKCFob29rIHx8ICFob29rLnVuc2V0IHx8IGhvb2sudW5zZXQoZWxlbWVudCwgcHJvcC5mdWxsKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb3AuZnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2hhbmRsZXJzL3JlZmVyZW5jZS5qc1xuXG5cbi8qKlxuICogSGFuZGxlcyBtb2RpZnlpbmcgV0FJLUFSSUEgcmVmZXJlbmNlcy4gVW5saWtlIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eX0sIHRoaXNcbiAqIHdpbGwgY3JlYXRlIHJlZmVyZW5jZXMgdG8gZWxlbWVudHMgYW5kIHJldHVybiB0aGVtLiBUaGUgb25seSBkZWZpbmVkIG1ldGhvZHNcbiAqIGFyZTpcbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucmVmZXJlbmNlLnNldH0gc2V0cyBhIHJlZmVyZW5jZS5cbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucmVmZXJlbmNlLmdldH0gZ2V0cyBhIHJlZmVyZW5jZS5cbiAqXG4gKiBAYWxpYXMgICAgIHJlZmVyZW5jZVxuICogQG1lbWJlcm9mICBoYW5kbGVyc1xuICogQG5hbWVzcGFjZVxuICogQHByaXZhdGVcbiAqL1xuaGFuZGxlcnNbSEFORExFUl9SRUZFUkVOQ0VdID0ge1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgV0FJLUFSSUEgcmVmZXJlbmNlIHRvIDxjb2RlPmVsZW1lbnQ8L2NvZGU+LiBUaGlzIGRpZmZlcnMgZnJvbVxuICAgICAqIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5zZXR9IGluIHRoYXQgPGNvZGU+cmVmZXJlbmNlPC9jb2RlPiBpcyBwYXNzZWRcbiAgICAgKiB0aHJvdWdoIFtqUXVlcnkncyAkIGZ1bmN0aW9uXXtAbGluayBodHRwOi8vYXBpLmpxdWVyeS5jb20vanF1ZXJ5L30gYW5kXG4gICAgICogaWRlbnRpZmllZCAoc2VlIFtqUXVlcnkjaWRlbnRpZnlde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNpZGVudGlmeX0pIHdpdGhcbiAgICAgKiB0aGUgSUQgb2YgdGhlIGZpcnN0IG1hdGNoIGJlaW5nIHVzZWQuIFRoZXJlIGlzIGFsc28gbm9cbiAgICAgKiA8Y29kZT5jb252ZXJ0PC9jb2RlPiBwYXJhbWV0ZXIuXG4gICAgICogPGJyPjxicj5cbiAgICAgKiBUaGUgPGNvZGU+bmFtZTwvY29kZT4gaXMgc3RpbGwgbm9ybWFsaXNlZCAoc2VlXG4gICAgICogW2pRdWVyeS5ub3JtYWxpc2VBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkubm9ybWFsaXNlQXJpYX0pLiBJZlxuICAgICAqIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIG5vdCBhbiBlbGVtZW50IChzZWUge0BsaW5rIGlzRWxlbWVudH0pIHRoZW4gbm9cbiAgICAgKiBhY3Rpb24gaXMgdGFrZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAgIHtFbGVtZW50fSAgICAgIGVsZW1lbnRcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIG1vZGlmeS5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgYXR0cmlidXRlIHRvIHNldC5cbiAgICAgKiBAcGFyYW0gICB7alF1ZXJ5X3BhcmFtfSByZWZlcmVuY2VcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gICB7TnVtYmVyfSAgICAgICBpbmRleFxuICAgICAqICAgICAgICAgIEluZGV4IG9mIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IHdpdGhpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnJlZmVyZW5jZS5zZXQoZWxlbWVudCwgXCJsYWJlbGxlZGJ5XCIsIFwiLnR3b1wiKTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIGFyaWE9bGFiZWxsZWRieT1cImFub255bW91czBcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCIgaWQ9XCJhbm9ueW1vdXMwXCI+PC9kaXY+XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSwgcmVmZXJlbmNlLCBpbmRleCkge1xuXG4gICAgICAgIGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldLnNldChcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgcmVmZXJlbmNlLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBpZGVudGlmeVxuICAgICAgICApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZSBnaXZlbiA8Y29kZT5lbGVtZW50PC9jb2RlPiBhbmQgcmV0dXJucyBpdCBhc1xuICAgICAqIGEgPGNvZGU+alF1ZXJ5PC9jb2RlPiBvYmplY3QuIFRoaXMgZGlmZmVycyBmcm9tXG4gICAgICoge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5LmdldH0gaW4gdGhhdCB0aGUgbWF0Y2ggaXMgYXNzdW1lZCB0byBiZSBhbiBJRFxuICAgICAqIGFuZCBhIERPTSBsb29rdXAgaXMgZG9uZSBiYXNlZCB1cG9uIHRoYXQuIFRoZSA8Y29kZT5uYW1lPC9jb2RlPiBpcyBzdGlsbFxuICAgICAqIG5vcm1hbGlzZWQgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS4gSWYgdGhlXG4gICAgICogV0FJLUFSSUEgYXR0cmlidXRlIGlzIG5vdCBmb3VuZCAoc2VlIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5oYXN9IHRoZW5cbiAgICAgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gICB7RWxlbWVudH0gICAgICAgICAgZWxlbWVudFxuICAgICAqICAgICAgICAgIEVsZW1lbnQgdG8gY2hlY2suXG4gICAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgIG5hbWVcbiAgICAgKiAgICAgICAgICBXQUktQVJJQSByZWZlcmVuY2UuXG4gICAgICogQHJldHVybiAge2pRdWVyeXx1bmRlZmluZWR9XG4gICAgICogICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlZmVyZW5jZSBvciB1bmRlZmluZWQgaWYgdGhlXG4gICAgICogICAgICAgICAgYXR0cmlidXRlIGlzbid0IHNldC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhPWxhYmVsbGVkYnk9XCJ0d29cIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGlkPVwidHdvXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnJlZmVyZW5jZS5nZXQoZWxlbWVudCwgXCJsYWJlbGxlZGJ5XCIpO1xuICAgICAqIC8vIC0+ICQoPGRpdiBpZD1cInR3b1wiPilcbiAgICAgKiBoYW5kbGVycy5yZWZlcmVuY2UuZ2V0KGVsZW1lbnQsIFwiY29udHJvbHNcIik7XG4gICAgICogLy8gLT4gdW5kZWZpbmVkXG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSkge1xuXG4gICAgICAgIHZhciBoYW5kbGVyID0gaGFuZGxlcnNbSEFORExFUl9QUk9QRVJUWV07XG5cbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuaGFzKGVsZW1lbnQsIG5hbWUpXG4gICAgICAgICAgICA/ICQoXCIjXCIgKyBoYW5kbGVyLmdldChlbGVtZW50LCBuYW1lKSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgfVxuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2hhbmRsZXJzL3N0YXRlLmpzXG5cblxudmFyIFJFR0VYUF9CT09MRUFOID0gL14oPzp0cnVlfGZhbHNlKSQvO1xudmFyIFZBTFVFX01JWEVEID0gXCJtaXhlZFwiO1xuXG4vKipcbiAqIEhhbmRsZXMgV0FJLUFSSUEgc3RhdGVzLiBUaGlzIGRpZmZlcnMgZnJvbSB7QGxpbmsgaGFuZGxlcnMucHJvcGVydHl9IGluIHRoYXRcbiAqIHZhbHVlcyBhcmUgY29lcmNlZCBpbnRvIGJvb2xlYW5zIGJlZm9yZSBiZWluZyBzZXQgYW5kIGEgYm9vbGVhbiAob3IgdGhlXG4gKiBzdHJpbmcgXCJtaXhlZFwiKSB3aWxsIGJlIHJldHVybmVkLlxuICogPGJyPntAbGluayBoYW5kbGVycy5zdGF0ZS5yZWFkfSBjb252ZXJ0cyB0aGUgdmFsdWUgaW50byBhIGJvb2xlYW4uXG4gKiA8YnI+e0BsaW5rIGhhbmRsZXJzLnN0YXRlLnNldH0gc2V0cyB0aGUgc3RhdGUuXG4gKiA8YnI+e0BsaW5rIGhhbmRsZXJzLnN0YXRlLmdldH0gZ2V0cyB0aGUgc3RhdGUuXG4gKlxuICogQGFsaWFzICAgICBzdGF0ZVxuICogQG1lbWJlcm9mICBoYW5kbGVyc1xuICogQG5hbWVzcGFjZVxuICogQHByaXZhdGVcbiAqL1xuaGFuZGxlcnNbSEFORExFUl9TVEFURV0gPSB7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyB0aGUgcmF3IHZhbHVlIGFuZCBjb252ZXJ0cyBpdCBpbnRvIGEgYm9vbGVhbiBvciB0aGUgc3RyaW5nXG4gICAgICogPGNvZGU+XCJtaXhlZFwiPC9jb2RlPiAoYWx3YXlzIGxvd2VyIGNhc2UpLiBJZiA8Y29kZT5yYXc8L2NvZGU+IGNhbm5vdCBiZVxuICAgICAqIGNvcnJlY3RseSBjb252ZXJ0ZWQsIGl0IGlzIGFzc3VtZWQgdG8gYmUgPGNvZGU+dHJ1ZTwvY29kZT4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAgIHs/fSByYXdcbiAgICAgKiAgICAgICAgICBWYWx1ZSB0byByZWFkLlxuICAgICAqIEByZXR1cm4gIHtCb29sZWFufFN0cmluZ31cbiAgICAgKiAgICAgICAgICBDb252ZXJ0ZWQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0aW5nIHZhbHVlczwvY2FwdGlvbj5cbiAgICAgKiBoYW5kbGVycy5zdGF0ZS5yZWFkKHRydWUpOyAgICAvLyAtPiB0cnVlXG4gICAgICogaGFuZGxlcnMuc3RhdGUucmVhZChcImZhbHNlXCIpOyAvLyAtPiBmYWxzZVxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoXCIxXCIpOyAgICAgLy8gLT4gdHJ1ZVxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoMCk7ICAgICAgIC8vIC0+IGZhbHNlXG4gICAgICogaGFuZGxlcnMuc3RhdGUucmVhZChcIm1peGVkXCIpOyAvLyAtPiBcIm1peGVkXCJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPlVucmVjb2duaXNlZCB2YWx1ZXMgZGVmYXVsdCB0byB0cnVlPC9jYXB0aW9uPlxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoXCIyXCIpOyAgICAgIC8vIC0+IHRydWVcbiAgICAgKiBoYW5kbGVycy5zdGF0ZS5yZWFkKC0xKTsgICAgICAgLy8gLT4gdHJ1ZVxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoW10pOyAgICAgICAvLyAtPiB0cnVlXG4gICAgICogaGFuZGxlcnMuc3RhdGUucmVhZChcIm1peGVkLlwiKTsgLy8gLT4gdHJ1ZVxuICAgICAqL1xuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWRTdGF0ZShyYXcpIHtcblxuICAgICAgICB2YXIgc3RhdGUgPSB0cnVlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHJhdykge1xuXG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG5cbiAgICAgICAgICAgIHN0YXRlID0gcmF3O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuXG4gICAgICAgICAgICByYXcgPSByYXcudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYgKHJhdyA9PT0gVkFMVUVfTUlYRUQpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHJhdztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmF3ID09PSBcIjFcIiB8fCByYXcgPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSByZWFkU3RhdGUoK3Jhdyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFJFR0VYUF9CT09MRUFOLnRlc3QocmF3KSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gcmF3ID09PSBcInRydWVcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuXG4gICAgICAgICAgICBpZiAocmF3ID09PSAwIHx8IHJhdyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gISFyYXc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgV0FJLUFSSUEgc3RhdGUgZGVmaW5lZCBpbiA8Y29kZT5uYW1lPC9jb2RlPiBvbiB0aGUgZ2l2ZW5cbiAgICAgKiA8Y29kZT5lbGVtZW50PC9jb2RlPi4gVGhpcyBkaWZmZXJzIGZyb20ge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5LnNldH0gaW5cbiAgICAgKiB0aGF0IDxjb2RlPnN0YXRlPC9jb2RlPiBpcyBjb252ZXJ0ZWQgaW50byBhIGJvb2xlYW4gb3JcbiAgICAgKiA8Y29kZT5cIm1peGVkXCI8L2NvZGU+IGJlZm9yZSBiZWluZyBhc3NpZ25lZCAoc2VlXG4gICAgICoge0BsaW5rIGhhbmRsZXJzLnN0YXRlLnJlYWR9KSBhbmQgdGhlcmUgaXMgbm8gPGNvZGU+Y29udmVydDwvY29kZT5cbiAgICAgKiBwYXJhbXRlci4gVGhlIDxjb2RlPm5hbWU8L2NvZGU+IGlzIHN0aWxsIG5vcm1hbGlzZWQgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICAge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIG1vZGlmeS5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgbmFtZVxuICAgICAqICAgICAgICAgIFdBSS1BUklBIGF0dHJpYnV0ZSB0byBzZXQuXG4gICAgICogQHBhcmFtICAgez99ICAgICAgIHN0YXRlXG4gICAgICogICAgICAgICAgU3RhdGUgdG8gc2V0LlxuICAgICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICBpbmRleFxuICAgICAqICAgICAgICAgIEluZGV4IG9mIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IHdpdGhpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGlkPVwidHdvXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbmVcIik7XG4gICAgICogdmFyIHR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHdvXCIpO1xuICAgICAqIGhhbmRsZXJzLnN0YXRlLnNldChvbmUsIFwiYnVzeVwiLCB0cnVlKTtcbiAgICAgKiBoYW5kbGVycy5zdGF0ZS5zZXQodHdvLCBcImNoZWNrZWRcIiwgXCJtaXhlZFwiKTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtYnVzeT1cInRydWVcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGlkPVwidHdvXCIgYXJpYS1jaGVja2VkPVwibWl4ZWRcIj48L2Rpdj5cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lLCBzdGF0ZSwgaW5kZXgpIHtcblxuICAgICAgICBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXS5zZXQoXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBoYW5kbGVyc1tIQU5ETEVSX1NUQVRFXS5yZWFkXG4gICAgICAgICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVhZHMgdGhlIFdBSS1BUklBIHN0YXRlIG9uIDxjb2RlPmVsZW1lbnQ8L2NvZGU+LiBUaGlzIGRpZmZlcnMgZnJvbVxuICAgICAqIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5nZXR9IGluIHRoYXQgdGhlIHJlc3VsdCBpcyBjb252ZXJ0ZWQgaW50byBhXG4gICAgICogYm9vbGVhbiBvciB0aGUgc3RyaWduIGBcIm1peGVkXCJgIGJlZm9yZSBiZWluZyByZXR1cm5lZC4gVGhlXG4gICAgICogPGNvZGU+bmFtZTwvY29kZT4gaXMgc3RpbGwgbm9ybWFsaXNlZCAoc2VlIHtAbGluayBqUXVlcnkubm9ybWFsaXNlQXJpYX0pLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gICB7RWxlbWVudH0gICAgZWxlbWVudFxuICAgICAqICAgICAgICAgIEVsZW1lbnQgdG8gYWNjZXNzLlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgc3RhdGUgdG8gcmVhZC5cbiAgICAgKiBAcmV0dXJuICB7QVJJQV9zdGF0ZX1cbiAgICAgKiAgICAgICAgICBTdGF0ZSBvZiB0aGUgV0FJLUFSSUEgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIE1hcmt1cCBpczpcbiAgICAgKiAvLyA8ZGl2IGlkPVwib25lXCIgYXJpYS1idXN5PVwidHJ1ZVwiIGFyaWEtY2hlY2tlZD1cIm1peGVkXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnN0YXRlLmdldChlbGVtZW50LCBcImJ1c3lcIik7ICAgICAvLyAtPiB0cnVlXG4gICAgICogaGFuZGxlcnMuc3RhdGUuZ2V0KGVsZW1lbnQsIFwiY2hlY2tlZFwiKTsgIC8vIC0+IFwibWl4ZWRcIlxuICAgICAqIGhhbmRsZXJzLnN0YXRlLmdldChlbGVtZW50LCBcImRpc2FibGVkXCIpOyAvLyAtPiB1bmRlZmluZWRcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lKSB7XG5cbiAgICAgICAgdmFyIGhhbmRsZXIgPSBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXTtcbiAgICAgICAgdmFyIHN0YXRlO1xuICAgICAgICB2YXIgdmFsdWU7XG5cbiAgICAgICAgaWYgKGhhbmRsZXIuaGFzKGVsZW1lbnQsIG5hbWUpKSB7XG5cbiAgICAgICAgICAgIHZhbHVlID0gaGFuZGxlci5nZXQoZWxlbWVudCwgbmFtZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHN0YXRlID0gdmFsdWUgPT09IFZBTFVFX01JWEVEXG4gICAgICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgICAgIDogKFJFR0VYUF9CT09MRUFOLnRlc3QodmFsdWUpICYmIHZhbHVlID09PSBcInRydWVcIik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIH1cblxufTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9hY2Nlc3MuanNcblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyBhbGwgdGhlIGhlYXZ5IGxpZnRpbmcgb2YgZ2V0dGluZyBvciBzZXR0aW5nIFdBSS1BUklBXG4gKiBhdHRyaWJ1dGVzLiBJdCBpcyBkZXNpZ25lZCB0byBiZSBhbGwgdGhhdCdzIG5lY2Vzc2FyeSBmb3JcbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LFxuICogW2pRdWVyeSNhcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVJlZn0gYW5kXG4gKiBbalF1ZXJ5I2FyaWFTdGF0ZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFTdGF0ZX0uIFRoaXMgZnVuY3Rpb24gd2lsbCBjaGVja1xuICogaXRzIGFyZ3VtZW50cyB0byBkZXRlcm1pbmUgd2hldGhlciBpdCBzaG91bGQgYmUgdXNlZCBhcyBhIGdldHRlciBvciBhIHNldHRlclxuICogYW5kIHBhc3NlcyB0aGUgYXBwcm9wcmlhdGUgYXJndW1lbnRzIHRvIHRoZSB7QGxpbmsgaGFuZGxlcnN9IG1ldGhvZHMgYmFzZWQgb25cbiAqIDxjb2RlPnR5cGU8L2NvZGU+ICh3aGljaCB3aWxsIGRlZmF1bHQgdG8ge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5fSBpZlxuICogb21taXR0ZWQgb3Igbm90IHJlY29nbmlzZWQpLlxuICogPGJyPjxicj5cbiAqIFRoZSByZXR1cm4gdmFsdWUgaXMgYmFzZWQgb24gdGhlIHR5cGUgb2YgYWN0aW9uIGJlaW5nIHBlcmZvcm1lZC4gSWYgdGhpc1xuICogZnVuY3Rpb24gaXMgc2V0dGluZyB0aGVuIGEgalF1ZXJ5IG9iamVjdCBvZiB0aGUgbWF0Y2hlcyBpcyByZXR1cm5lZCAod2hpY2ggaXNcbiAqIGFsbW9zdCBhbHdheXMgPGNvZGU+alFlbGVtZW50czwvY29kZT4pOyBpZiB0aGUgZnVuY3Rpb24gaXMgYSBnZXR0ZXIgdGhlbiB0aGVcbiAqIHJlc3VsdHMgYXJlIHJldHVybmVkIGZvciB0aGUgZmlyc3QgZWxlbWVudCBpbiA8Y29kZT5qUWVsZW1lbnRzPC9jb2RlPi5cbiAqIDxicj48YnI+XG4gKiBBbHRob3VnaCB0aGlzIGRlc2NyaXB0aW9uIGlzIG5vdCBlc3BlY2lhbGx5IGV4dGVuc2l2ZSwgdGhlIGNvZGUgc2hvdWxkIGJlXG4gKiB2ZXJ5IGVhc3kgdG8gZm9sbG93IGFuZCBjb21tZW50ZWQgc2hvdWxkIHRoZXJlIGJlIGFueSBuZWVkIHRvIG1vZGlmeSBpdC4gT25jZVxuICogdGhlIGNvcnJlY3QgYXJndW1lbnRzIGFyZSBiZWluZyBwYXNzZWQgdG8gdGhlIGFwcHJvcHJpYXRlIHtAbGluayBoYW5kbGVyc31cbiAqIG1ldGhvZCwgdGhleSB3aWxsIHRha2UgY2FyZSBvZiB0aGUgcmVzdC5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICAge2pRdWVyeX0gICAgICAgICAgICBqUWVsZW1lbnRzXG4gKiAgICAgICAgICBqUXVlcnkgb2JqZWN0IHRvIG1vZGlmeS9hY2Nlc3MuXG4gKiBAcGFyYW0gICB7T2JqZWN0fFN0cmluZ30gICAgIHByb3BlcnR5XG4gKiAgICAgICAgICBFaXRoZXIgV0FJLUFSSUEgbmFtZXMgYW5kIHZhbHVlcyBvciB0aGUgV0FJLUFSSUEgcHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSAgIHs/fSAgICAgICAgICAgICAgICAgW3ZhbHVlXVxuICogICAgICAgICAgVmFsdWUgdG8gc2V0LlxuICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgICBbdHlwZT1cInByb3BlcnR5XCJdXG4gKiAgICAgICAgICBPcHRpb25hbCBhdHRyaWJ1dGUgdHlwZS5cbiAqIEByZXR1cm4gIHtqUXVlcnl8QVJJQV9zdGF0ZX1cbiAqICAgICAgICAgIEVpdGhlciB0aGUgalF1ZXJ5IG9iamVjdCBvbiB3aGljaCBXQUktQVJJQSBwcm9wZXJ0aWVzIHdlcmUgc2V0IG9yXG4gKiAgICAgICAgICB0aGUgdmFsdWVzIG9mIHRoZSBXQUktQVJJQSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgYSBzaW5nbGUgcHJvcGVydHk8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqXG4gKiB2YXIgalFvbmUgPSAkKFwiI29uZVwiKTtcbiAqIGFjY2VzcyhqUW9uZSwgXCJjb250cm9sc1wiLCBcInR3b1wiKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtY29udHJvbHM9XCJ0d29cIj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIG11bHRpcGxlIHJlZmVyZW5jZXM8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiB2YXIgalFvbmUgPSAkKFwiI29uZVwiKTtcbiAqIGFjY2VzcyhqUW9uZSwge1xuICogICAgIGNvbnRyb2xzOiAkKFwiZGl2XCIpLmVxKDEpXG4gKiB9LCBcInJlZmVyZW5jZVwiKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtY29udHJvbHM9XCJ0d29cIj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXR0aW5nIGEgc3RhdGU8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWJ1c3k9XCJ0cnVlXCI+PC9kaXY+XG4gKlxuICogdmFyIGpRb25lID0gJChcIiNvbmVcIik7XG4gKiBhY2Nlc3MoalFvbmUsIFwiYnVzeVwiLCB1bmRlZmluZWQsIFwic3RhdGVcIik7IC8vIC0+IHRydWVcbiAqL1xuZnVuY3Rpb24gYWNjZXNzKGpRZWxlbWVudHMsIHByb3BlcnR5LCB2YWx1ZSwgdHlwZSkge1xuXG4gICAgdmFyIHRlbXBQcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIHZhciBpc1Byb3BlcnR5T2JqZWN0ID0gJC5pc1BsYWluT2JqZWN0KHByb3BlcnR5KTtcbiAgICB2YXIgaXNHZXQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICFpc1Byb3BlcnR5T2JqZWN0O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpcyBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0OiBhbiBvYmplY3QgZm9yXG4gICAgLy8gc2V0dGluZyBhbmQgYSBzdHJpbmcgZm9yIGdldHRpbmcuXG4gICAgaWYgKCFpc0dldCAmJiAhaXNQcm9wZXJ0eU9iamVjdCkge1xuXG4gICAgICAgIHByb3BlcnR5ID0ge307XG4gICAgICAgIHByb3BlcnR5W3RlbXBQcm9wZXJ0eV0gPSB2YWx1ZTtcblxuICAgIH1cblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgb3IgZG9uJ3QgcmVjb2duaXNlIHRoZSB0eXBlLCBkZWZhdWx0IHRvIFwicHJvcGVydHlcIi5cbiAgICBpZiAoIXR5cGUgfHwgIWhhbmRsZXJzW3R5cGVdKSB7XG4gICAgICAgIHR5cGUgPSBIQU5ETEVSX1BST1BFUlRZO1xuICAgIH1cblxuICAgIHJldHVybiBpc0dldFxuICAgICAgICA/IGhhbmRsZXJzW3R5cGVdLmdldChqUWVsZW1lbnRzWzBdLCBwcm9wZXJ0eSlcbiAgICAgICAgOiBqUWVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cbiAgICAgICAgICAgICQuZWFjaChwcm9wZXJ0eSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbdHlwZV0uc2V0KGVsZW1lbnQsIGtleSwgdmFsLCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxufVxuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL3JlbW92ZUF0dHJpYnV0ZS5qc1xuXG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBuYW1lZCBXQUktQVJJQSBhdHRyaWJ1dGUgZnJvbSBhbGwgZWxlbWVudHMgaW4gdGhlIGN1cnJlbnRcbiAqIGNvbGxlY3Rpb24uIFRoZSA8Y29kZT5uYW1lPC9jb2RlPiBpcyBub3JtYWxpc2VkIChzZWVcbiAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS4gVGhpcyBmdW5jdGlvblxuICogaXMgYWxpYXNlZCBhcyBbalF1ZXJ5I3JlbW92ZUFyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNyZW1vdmVBcmlhUmVmfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlfS5cbiAqXG4gKiBAYWxpYXMgICAgcmVtb3ZlQXJpYVxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQGluc3RhbmNlXG4gKiBAcGFyYW0gICAge1N0cmluZ30gbmFtZVxuICogICAgICAgICAgIFdBSS1BUklBIGF0dHJpYnV0ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJuICAge2pRdWVyeX1cbiAqICAgICAgICAgICBqUXVlcnkgYXR0cmlidXRlIHJlcHJlc2VudGluZyB0aGUgZWxlbWVudHMgbW9kaWZpZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIE1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtYnVzeT1cInRydWVcIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5yZW1vdmVBcmlhKFwiYnVzeVwiKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGlnbm9yZSwgZWxlbWVudCkge1xuICAgICAgICBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXS51bnNldChlbGVtZW50LCBuYW1lKTtcbiAgICB9KTtcblxufVxuXG4vLyBTb3VyY2U6IC9zcmMvbWVtYmVyL25vcm1hbGlzZUFyaWEuanNcblxuXG4vKipcbiAqIEFsaWFzIG9mIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAYWxpYXMgICAgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGl6ZUFyaWFcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEBwYXJhbSAgICB7U3RyaW5nfSBuYW1lXG4gKiAgICAgICAgICAgQXR0cmlidXRlIG5hbWUgdG8gbm9ybWFsaXNlLlxuICogQHJldHVybiAgIHtTdHJpbmd9XG4gKiAgICAgICAgICAgTm9ybWFsaXNlZCBhdHRyaWJ1dGUgbmFtZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxTdHJpbmc+fSBjYWNoZVxuICogICAgICAgICAgIFRoZSBjYWNoZSBvZiByZXF1ZXN0cyB0byByZXNwb25zZXMuXG4gKi9cbiQubm9ybWFsaXplQXJpYSA9IG5vcm1hbGlzZTtcbiQubm9ybWFsaXNlQXJpYSA9IG5vcm1hbGlzZTtcblxuLy8gU291cmNlOiAvc3JjL21lbWJlci9hcmlhRml4LmpzXG5cblxuLyoqXG4gKiBBIG1hcCBvZiB1bnByZWZpeGVkIFdBSS1BUklBIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgY29udmVydGVkIGJlZm9yZSBiZWluZ1xuICogbm9ybWFsaXNlZCAoc2VlIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAqXG4gKiBAYWxpYXMgICAgZXh0ZXJuYWw6alF1ZXJ5LmFyaWFGaXhcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEB0eXBlICAgICB7T2JqZWN0LjxTdHJpbmc+fVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvcnJlY3RpbmcgYSBjb21tb24gdHlwbzwvY2FwdGlvbj5cbiAqICQuYXJpYUZpeC5idWR5ID0gXCJidXN5XCI7XG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJidWR5XCIpOyAgICAgIC8vIC0+IFwiYXJpYS1idXN5XCJcbiAqICQubm9ybWFsaXNlQXJpYShcImFyaWEtYnVkeVwiKTsgLy8gLT4gXCJhcmlhLWJ1c3lcIlxuICovXG4kLmFyaWFGaXggPSB7XG5cbiAgICAvLyBUaGlzIGlzIHRoZSBVUyBFbmdsaXNoIHNwZWxsaW5nIGJ1dCB0aGUgY2Nlc3NpYmlsaXR5IEFQSSBkZWZpbmVkIHRoZVxuICAgIC8vIGF0dHJpYnV0ZSB3aXRoIHRoZSBkb3VibGUgTC5cbiAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEvc3RhdGVzX2FuZF9wcm9wZXJ0aWVzI2FyaWEtbGFiZWxsZWRieVxuICAgIGxhYmVsZWRieTogXCJsYWJlbGxlZGJ5XCJcblxufTtcblxuLy8gSWYgUHJveHkgaXMgYXZhaWxhYmxlLCB3ZSBjYW4gdXNlIGl0IHRvIGNoZWNrIHdoZW5ldmVyICQuYXJpYUZpeCBpcyBtb2RpZmllZFxuLy8gYW5kIGludmFsaWRhdGUgdGhlIGNhY2hlIG9mIG5vcm1hbGlzZSgpIHdoZW4gaXQgaXMuIFRoaXMgaXMgYSBsb3QgbW9yZVxuLy8gZWZmaWNpZW50IHRoYW4gYWx3YXlzIGNvbnZlcnRpbmcgJC5hcmlhRml4IHRvIGEgSlNPTiBzdHJpbmcgdG8gZW5zdXJlIHRoZVxuLy8gY2FjaGUgaXMgYWNjdXJhdGUuXG5pZiAoSVNfUFJPWFlfQVZBSUxBQkxFKSB7XG5cbiAgICAkLmFyaWFGaXggPSBuZXcgUHJveHkoJC5hcmlhRml4LCB7XG5cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuXG4gICAgICAgICAgICBub3JtYWxpc2UuY2FjaGUgPSB7fTtcbiAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbi8vIFNvdXJjZTogL3NyYy9tZW1iZXIvYXJpYUhvb2tzLmpzXG5cblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgaG9va3MgdGhhdCBjaGFuZ2UgdGhlIGJlaGF2aW91ciBvZiBhdHRyaWJ1dGVzIGJlaW5nIHNldCxcbiAqIHJldHJpZXZlZCwgY2hlY2tlZCBvciByZW1vdmVkIChjYWxsZWQgW3NldF17QGxpbmsgQVJJQV9ob29rX3NldH0sXG4gKiBbZ2V0XXtAbGluayBBUklBX2hvb2tfZ2V0fSwgW2hhc117QGxpbmsgQVJJQV9ob29rX2hhc30sXG4gKiBbdW5zZXRde0BsaW5rIEFSSUFfaG9va191bnNldH0gLSBzZWUge0BsaW5rIEFSSUFfaG9va30gZm9yIGZ1bGwgZGV0YWlscykuIFRoZVxuICogbmFtZSBvZiB0aGUgaG9vayBpcyBhbHdheXMgdGhlIHVuLXByZWZpeGVkIFdBSS1BUklBIGF0dHJpYnV0ZSBpbiBsb3dlciBjYXNlXG4gKiBhZnRlciBhbnkgbWFwcGluZyBoYXMgb2NjdXJyZWQgKHNlZVxuICogW2pRdWVyeS5hcmlhRml4XXtAbGluayBleHRlcm5hbDpqUXVlcnkuYXJpYUZpeH0pLiBJZiB5b3UgYXJlIGV2ZXIgaW4gZG91YnQsXG4gKiB0aGUgZWFzaWVzdCB3YXkgdG8ga25vdyB0aGUga2V5IGlzIHRvIHNsaWNlIHRoZSBub3JtYWxpc2VkIHZhbHVlOlxuICogPGNvZGU+JC5ub3JtYWxpc2VBcmlhKF9fV0FJLUFSSUFfQVRUUklCVVRFX18pLnNsaWNlKDUpPC9jb2RlPiAoc2VlXG4gKiBbalF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSBmb3IgbW9yZVxuICogaW5mb3JtYXRpb24pLlxuICogPGJyPjxicj5cbiAqIERvIG5vdCB1c2UgdGhlc2UgZnVuY3Rpb25zIHRvIHNldCBkaWZmZXJlbnQgV0FJLUFSSUEgYXR0cmlidXRlcyB3aXRob3V0XG4gKiBzZXR0aW5nIHRoZSBvbmUgYmVpbmcgcGFzc2VkIHRvIHRoZSBhcmlhIG1ldGhvZDsgZm9yIGV4YW1wbGU6IGRvIG5vdCBjcmVhdGUgYVxuICogc2V0IGZvciBcImF0dHJpYnV0ZTFcIiB0aGF0IHNldHMgXCJhdHRyaWJ1dGUyXCIgaW5zdGVhZCAtIHVubGVzcyB5b3UgYWRkIHRoZSBzYW1lXG4gKiBjb252ZXJzaW9uIHRvIDxjb2RlPmhhczwvY29kZT4sIDxjb2RlPmdldDwvY29kZT4gd2lsbCBub3QgYmUgdHJpZ2dlcmVkLlxuICogSW5zdGVhZCwgdXNlIFtqUXVlcnkuYXJpYUZpeF17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5LmFyaWFGaXh9IHRvIGNvbnZlcnQgdGhlXG4gKiBhdHRyaWJ1dGUgbmFtZS5cbiAqIDxicj48YnI+XG4gKiBbalF1ZXJ5I2FyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhfSxcbiAqIFtqUXVlcnkjYXJpYVJlZl17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFSZWZ9LFxuICogW2pRdWVyeSNhcmlhU3RhdGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhU3RhdGV9LFxuICogW2pRdWVyeSNyZW1vdmVBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYX0sXG4gKiBbalF1ZXJ5I3JlbW92ZUFyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNyZW1vdmVBcmlhUmVmfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlfSBhbGwgcnVuXG4gKiB0aHJvdWdoIHRoZXNlIGhvb2tzIChpZiB0aGV5IGV4aXN0KSBhbmQgdGhlc2UgaG9va3MgcmVwbGFjZSB0aGUgZnVuY3Rpb25hbGl0eVxuICogb2YgbWFuaXB1bGF0aW5nIG9yIGNoZWNraW5nIHRoZSBhdHRyaWJ1dGVzIGFmdGVyIGFueSBjb252ZXJzaW9uIHByb2Nlc3MgaGFzXG4gKiBvY2N1cnJlZCB3aXRoaW4gdGhlIG1ldGhvZCBpdHNlbGYuXG4gKlxuICogQGFsaWFzICAgIGV4dGVybmFsOmpRdWVyeS5hcmlhSG9va3NcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEB0eXBlICAgICB7T2JqZWN0LjxBUklBX2hvb2s+fVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBhcmlhLWxldmVsIHNob3VsZCBiZSBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxIHNvIHRoZSBnZXR0ZXJcbiAqIC8vIHNob3VsZCByZXR1cm4gYW4gaW50ZWdlci5cbiAqICQuYXJpYUhvb2tzLmxldmVsID0ge1xuICogICAgIHNldDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlKSB7XG4gKiAgICAgICAgIHZhciBpbnRWYWwgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHZhbHVlKSk7XG4gKiAgICAgICAgIGlmICghaXNOYU4oaW50VmFsKSkge1xuICogICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxldmVsXCIsIGludFZhbClcbiAqICAgICAgICAgfVxuICogICAgIH0sXG4gKiAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICogICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtbGV2ZWxcIik7XG4gKiAgICAgICAgIHZhciBpbnRWYWwgPSAoTWF0aC5tYXgoMSwgTWF0aC5mbG9vcih2YWx1ZSkpO1xuICogICAgICAgICByZXR1cm4gKHZhbHVlID09PSBudWxsIHx8IGlzTmFOKGludFZhbCkpXG4gKiAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICogICAgICAgICAgICAgOiBpbnRWYWw7XG4gKiAgICAgfVxuICogfTtcbiAqL1xuJC5hcmlhSG9va3MgPSB7XG5cbiAgICBoaWRkZW46IHtcblxuICAgICAgICAvLyBTZXR0aW5nIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBpcyBjb25zaWRlcmVkIHZhbGlkLCBidXQgcmVtb3ZpbmcgdGhlXG4gICAgICAgIC8vIGFyaWEtaGlkZGVuIGF0dHJpYnV0ZSBoYXMgdGhlIHNhbWUgZWZmZWN0IGFuZCBJIHRoaW5rIGl0J3MgdGlkaWVyLlxuICAgICAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEvc3RhdGVzX2FuZF9wcm9wZXJ0aWVzI2FyaWEtaGlkZGVuXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlLCBuYW1lKSB7XG5cbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCArdmFsdWUgPT09IDAgfHwgKC9eZmFsc2UkL2kpLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9pbnN0YW5jZS9pZGVudGlmeS5qc1xuXG5cblxudmFyIGNvdW50ID0gMDtcblxuLyoqXG4gKiBJZGVudGlmaWVzIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uIGJ5IGdldHRpbmcgaXRzIElELiBJZiB0aGVcbiAqIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIElEIGF0dHJpYnV0ZSwgYSB1bmlxdWUgb24gaXMgZ2VuZXJhdGVkIGFuZCBhc3NpZ25lZFxuICogYmVmb3JlIGJlaW5nIHJldHVybmVkLiBJZiB0aGUgY29sbGVjdGlvbiBkb2VzIG5vdCBoYXZlIGEgZmlyc3QgZWxlbWVudCB0aGVuXG4gKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlzIHJldHVybmVkLlxuICogPGJyPjxicj5cbiAqIElEcyBhcmUgYSBjb25jYXRlbmF0aW9uIG9mIFwiYW5vbnltb3VzXCIgYW5kIGEgaGlkZGVuIGNvdW50ZXIgdGhhdCBpcyBpbmNyZWFzZWRcbiAqIGVhY2ggdGltZS4gSWYgdGhlIElEIGFscmVhZHkgZXhpc3RzIG9uIHRoZSBwYWdlLCB0aGF0IElEIGlzIHNraXBwZWQgYW5kIG5vdFxuICogYXNzaWduZWQgdG8gYSBzZWNvbmQgZWxlbWVudC5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICBpZGVudGlmeVxuICogQHJldHVybiAgIHtTdHJpbmd8dW5kZWZpbmVkfVxuICogICAgICAgICAgIFRoZSBJRCBvZiB0aGUgZmlyc3QgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm8gZmlyc3RcbiAqICAgICAgICAgICBlbGVtZW50LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklkZW50aWZ5aW5nIGVsZW1lbnRzPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzXG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCI+PC9kaXY+XG4gKiAvLyA8c3BhbiBjbGFzcz1cIm9uZVwiPjwvc3Bhbj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5pZGVudGlmeSgpOyAvLyAtPiBcImFub255bW91czBcIlxuICpcbiAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgaWQ9XCJhbm9ueW1vdXMwXCI+PC9kaXY+XG4gKiAvLyA8c3BhbiBjbGFzcz1cIm9uZVwiPjwvc3Bhbj5cbiAqIC8vIFJ1bm5pbmcgJChcIi5vbmVcIikuaWRlbnRpZnkoKTsgYWdhaW4gd291bGQgbm90IGNoYW5nZSB0aGUgbWFya3VwLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV4aXN0aW5nIElEcyBhcmUgbm90IGR1cGxpY2F0ZWQ8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCIgaWQ9XCJhbm9ueW1vdXMxXCI+PCEtLSBtYW51YWxseSBzZXQgLS0+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCI+PC9kaXY+XG4gKlxuICogJChcIi50d29cIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gKiAgICAgJCh0aGlzKS5pZGVudGlmeSgpO1xuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIiBpZD1cImFub255bW91czFcIj48IS0tIG1hbnVhbGx5IHNldCAtLT48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIiBpZD1cImFub255bW91czBcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIiBpZD1cImFub255bW91czJcIj48L2Rpdj5cbiAqL1xuJC5mbi5pZGVudGlmeSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBlbGVtZW50ID0gdGhpc1swXTtcbiAgICB2YXIgaXNBbkVsZW1lbnQgPSBpc0VsZW1lbnQoZWxlbWVudCk7XG4gICAgdmFyIGlkID0gaXNBbkVsZW1lbnRcbiAgICAgICAgPyBlbGVtZW50LmlkXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGlzQW5FbGVtZW50ICYmICFpZCkge1xuXG4gICAgICAgIGRvIHtcblxuICAgICAgICAgICAgaWQgPSBcImFub255bW91c1wiICsgY291bnQ7XG4gICAgICAgICAgICBjb3VudCArPSAxO1xuXG4gICAgICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG5cbiAgICAgICAgZWxlbWVudC5pZCA9IGlkO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvaW5zdGFuY2UvYXJpYS5qc1xuXG5cblxuLyoqXG4gKiBHZXRzIG9yIHNldHMgV0FJLUFSSUEgcHJvcGVydGllcy4gVGhlIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgbW9kaWZpZWQgYW55XG4gKiBtb3JlIHRoYW4gdGhleSBuZWVkIHRvIGJlICh1bmxpa2VcbiAqIFtqUXVlcnkjYXJpYVJlZl17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFSZWZ9IG9yXG4gKiBbalF1ZXJ5I2FyaWFTdGF0ZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFTdGF0ZX0gd2hpY2ggd2lsbCBpbnRlcnByZXQgdGhlXG4gKiB2YWx1ZXMpLlxuICogPGJyPjxicj5cbiAqIFRvIHNldCBXQUktQVJJQSBwcm9wZXJ0aWVzLCBwYXNzIGVpdGhlciBhXG4gKiA8Y29kZT5wcm9wZXJ0eTwvY29kZT4vPGNvZGU+dmFsdWU8L2NvZGU+IHBhaXIgb2YgYXJndW1lbnRzIG9yIGFuIG9iamVjdFxuICogY29udGFpbmluZyB0aG9zZSBwYWlycy4gV2hlbiB0aGlzIGlzIGRvbmUsIHRoZSBhdHRyaWJ1dGVzIGFyZSBzZXQgb24gYWxsXG4gKiBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvbiBhbmQgdGhlIDxjb2RlPmpRdWVyeTwvY29kZT4gb2JqZWN0IGlzIHJldHVybmVkIHRvXG4gKiBhbGxvdyBmb3IgY2hhaW5pbmcuIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyBhIGZ1bmN0aW9uIGFuZCByZXR1cm5zXG4gKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IChvciBub3RoaW5nKSB0aGVuIG5vIGFjdGlvbiBpcyB0YWtlbiBmb3IgdGhhdCBlbGVtZW50LlxuICogVGhpcyBjYW4gYmUgdXNlZnVsIGZvciBzZWxlY3RpdmVseSBzZXR0aW5nIHZhbHVlcyBvbmx5IHdoZW4gY2VydGFpbiBjcml0ZXJpYVxuICogYXJlIG1ldC5cbiAqIDxicj48YnI+XG4gKiBUbyBnZXQgV0FJLUFSSUEgcHJvcGVydGllcywgb25seSBwYXNzIHRoZSA8Y29kZT5wcm9wZXJ0eTwvY29kZT4gdGhhdCB5b3Ugd2FudFxuICogdG8gZ2V0LiBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBwcm9wZXJ0eSwgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpcyByZXR1cm5lZC5cbiAqIEFsbCBwcm9wZXJ0aWVzIGFyZSBub3JtYWxpc2VkIChzZWVcbiAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICBhcmlhXG4gKiBAcGFyYW0gICAge09iamVjdHxTdHJpbmd9IHByb3BlcnR5XG4gKiAgICAgICAgICAgRWl0aGVyIHRoZSBwcm9wZXJ0aWVzIHRvIHNldCBpbiBrZXkvdmFsdWUgcGFpcnMgb3IgdGhlIG5hbWUgb2YgdGhlXG4gKiAgICAgICAgICAgcHJvcGVydHkgdG8gZ2V0L3NldC5cbiAqIEBwYXJhbSAgICB7QXR0cmlidXRlX0NhbGxiYWNrfEJvb2xlYW58TnVtYmVyfFN0cmluZ30gW3ZhbHVlXVxuICogICAgICAgICAgIFRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHJldHVybiAgIHtqUXVlcnl8U3RyaW5nfHVuZGVmaW5lZH1cbiAqICAgICAgICAgICBFaXRoZXIgdGhlIGpRdWVyeSBvYmplY3QgKGFmdGVyIHNldHRpbmcpIG9yIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFxuICogICAgICAgICAgIChhZnRlciBnZXR0aW5nKVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgV0FJLUFSSUEgYXR0cmlidXRlKHMpPC9jYXB0aW9uPlxuICogJChcIiNlbGVtZW50XCIpLmFyaWEoXCJhcmlhLWxhYmVsXCIsIFwidGVzdFwiKTtcbiAqIC8vIG9yXG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYShcImxhYmVsXCIsIFwidGVzdFwiKTtcbiAqIC8vIG9yXG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYSh7XG4gKiAgICAgXCJhcmlhLWxhYmVsXCI6IFwidGVzdFwiXG4gKiB9KTtcbiAqIC8vIG9yXG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYSh7XG4gKiAgICAgbGFiZWw6IFwidGVzdFwiXG4gKiB9KTtcbiAqIC8vIEFsbCBvZiB0aGVzZSBzZXQgYXJpYS1sYWJlbD1cInRlc3RcIiBvbiBhbGwgbWF0Y2hpbmcgZWxlbWVudHMgYW5kIHJldHVybiBhXG4gKiAvLyBqUXVlcnkgb2JqZWN0IHJlcHJlc2VudGluZyBcIiNlbGVtZW50XCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIFdBSS1BUklBIGF0dHJpYnV0ZShzKSB3aXRoIGEgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYShcImxhYmVsXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKiAgICAgcmV0dXJuIHRoaXMuaWQgKyBcIl9fXCIgKyBpICsgXCJfX1wiICsgYXR0cjtcbiAqIH0pO1xuICogLy8gb3JcbiAqICQoXCIjZWxlbWVudFwiKS5hcmlhKHtcbiAqICAgICBsYWJlbDogZnVuY3Rpb24gKGksIGF0dHIpIHtcbiAqICAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyBcIl9fXCIgKyBpICsgXCJfX1wiICsgYXR0cjtcbiAqICAgICB9XG4gKiB9KTtcbiAqIC8vIEJvdGggb2YgdGhlc2Ugc2V0IGFyaWEtbGFiZWw9XCJlbGVtZW50X18wX191bmRlZmluZWRcIiBvbiBhbGwgbWF0Y2hpbmdcbiAqIC8vIGVsZW1lbnRzIGFuZCByZXR1cm4gYSBqUXVlcnkgb2JqZWN0IHJlcHJlc2VudGluZyBcIiNlbGVtZW50XCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXR0aW5nIGEgV0FJLUFSSUEgYXR0cmlidXRlPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cImVsZW1lbnRcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICogJChcIiNlbGVtZW50XCIpLmFyaWEoXCJsYWJlbFwiKTsgICAvLyAtPiBcInRlc3RcIlxuICogJChcIiNlbGVtZW50XCIpLmFyaWEoXCJjaGVja2VkXCIpOyAvLyAtPiB1bmRlZmluZWRcbiAqIC8vIElmIFwiI2VsZW1lbnRcIiBtYXRjaGVzIG11bHRpcGxlIGVsZW1lbnRzLCB0aGUgYXR0cmlidXRlcyBmcm9tIHRoZSBmaXJzdFxuICogLy8gZWxlbWVudCBhcmUgcmV0dXJuZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U2V0dGluZyB3aXRoIGFyaWEgbWV0aG9kczwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0aHJlZVwiPC9kaXY+XG4gKlxuICogdmFyIHNldHRpbmdzID0ge1xuICogICAgIGJ1c3k6IDAsXG4gKiAgICAgY29udHJvbHM6IFwiLm9uZVwiLFxuICogICAgIGxhYmVsOiBcImxvcmVtIGlwc3VtXCJcbiAqIH07XG4gKlxuICogJChcIi5vbmVcIikuYXJpYShzZXR0aW5ncyk7XG4gKiAkKFwiLnR3b1wiKS5hcmlhUmVmKHNldHRpbmdzKTtcbiAqICQoXCIudGhyZWVcIikuYXJpYVN0YXRlKHNldHRpbmdzKTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiXG4gKiAvLyAgICAgYXJpYS1idXN5PVwiMFwiXG4gKiAvLyAgICAgYXJpYS1jb250cm9scz1cIi5vbmVcIlxuICogLy8gICAgIGFyaWEtbGFiZWw9XCJsb3JlbSBpcHN1bVwiXG4gKiAvLyAgICAgaWQ9XCJhbm9ueW1vdXMwXCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCJcbiAqIC8vICAgICBhcmlhLWNvbnRyb2xzPVwiYW5vbnltb3VzMFwiPjwvZGl2PlxuICogLy8gPGRpdiBjbGFzcz1cInRocmVlXCJcbiAqIC8vICAgICBhcmlhLWJ1c3k9XCJmYWxzZVwiXG4gKiAvLyAgICAgYXJpYS1jb250cm9scz1cInRydWVcIlxuICogLy8gICAgIGFyaWEtbGFiZWw9XCJ0cnVlXCI+PC9kaXY+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0dGluZyB3aXRoIGFyaWEgbWV0aG9kczwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJ0ZXN0XCIgYXJpYS1mbG93dG89XCJmYWxzZVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cImZhbHNlXCI+PC9kaXY+XG4gKlxuICogJChcIiN0ZXN0XCIpLmFyaWEoXCJmbG93dG9cIik7ICAgICAgLy8gLT4gXCJmYWxzZVwiXG4gKiAkKFwiI3Rlc3RcIikuYXJpYVJlZihcImZsb3d0b1wiKTsgICAvLyAtPiBqUXVlcnkoPGRpdiBpZD1cImZhbHNlXCI+KVxuICogJChcIiN0ZXN0XCIpLmFyaWFTdGF0ZShcImZsb3d0b1wiKTsgLy8gLT4gZmFsc2VcbiAqL1xuJC5mbi5hcmlhID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuXG4gICAgcmV0dXJuIGFjY2VzcyhcbiAgICAgICAgdGhpcyxcbiAgICAgICAgcHJvcGVydHksXG4gICAgICAgIHZhbHVlXG4gICAgKTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL2FyaWFSZWYuanNcblxuXG5cbi8qKlxuICogR2V0cyBvciBzZXRzIGEgV0FJLUFSSUEgcmVmZXJlbmNlLiBUaGlzIGlzIGZ1bmN0aW9uYWxseSBpZGVudGljYWwgdG9cbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9IHdpdGggdGhlIG1haW4gZGlmZmVyZW5jZSBiZWluZyB0aGF0XG4gKiBhbiBlbGVtZW50IG1heSBiZSBwYXNzZWQgYXMgdGhlIDxjb2RlPnZhbHVlPC9jb2RlPiB3aGVuIHNldHRpbmcgYW5kIHRoYXQgYVxuICogalF1ZXJ5IG9iamVjdCBpcyByZXR1cm5lZCB3aGVuIGdldHRpbmcuXG4gKiA8YnI+PGJyPlxuICogQmVjYXVzZSBXQUktQVJJQSByZWZlcmVuY2VzIHdvcmsgd2l0aCBJRHMsIElEcyBhcmUgd29ya2VkIG91dCB1c2luZ1xuICogW2pRdWVyeSNpZGVudGlmeV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2lkZW50aWZ5fS4gQmUgYXdhcmUgdGhhdCBhbnkgc3RyaW5nXG4gKiBwYXNzZWQgdG8gW2pRdWVyeSNhcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVJlZn0gd2lsbCBiZSB0cmVhdGVkXG4gKiBsaWtlIGEgQ1NTIHNlbGVjdG9yIGFuZCBsb29rZWQgdXAgd2l0aCB0aGUgcmVzdWx0cyBiZWluZyB1c2VkIHRvIHNldCB0aGVcbiAqIHByb3BlcnR5LiBJZiB5b3UgYWxyZWFkeSBoYXZlIHRoZSBJRCBhbmQgd2lzaCB0byBzZXQgaXQgd2l0aG91dCB0aGUgbG9va3VwLFxuICogdXNlIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LlxuICogPGJyPjxicj5cbiAqIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyBhIGZ1bmN0aW9uIHRoZW4gdGhlIHJlc3VsdGluZyB2YWx1ZSBpcyBpZGVudGlmaWVkLlxuICogVGhpcyBjYW4gYmUgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgcGVyZm9ybWluZyBET00gdHJhdmVyc2FsIHRvIGZpbmQgdGhlXG4gKiByZWZlcmVuY2UgKHNlZSBleGFtcGxlcyBiZWxvdykuIEFzIHdpdGhcbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LCBpZiB0aGUgPGNvZGU+dmFsdWU8L2NvZGU+IGZ1bmN0aW9uXG4gKiByZXR1cm5zIG5vdGhpbmcgb3IgcmV0dXJucyA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IHRoZW4gbm8gYWN0aW9uIGlzIHRha2VuLlxuICogPGJyPjxicj5cbiAqIFdoZW4gYWNjZXNzaW5nIHRoZSBhdHRyaWJ1dGUgdXNpbmcgdGhpcyBmdW5jdGlvbiwgYSA8Y29kZT5qUXVlcnk8L2NvZGU+XG4gKiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZWZlcmVuY2UgaXMgcmV0dXJuZWQuIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBlbGVtZW50c1xuICogaW4gdGhlIGNvbGxlY3Rpb24sIG9ubHkgdGhlIHJlZmVyZW5jZSBmb3IgdGhlIGZpcnN0IGVsZW1lbnQgaXMgcmV0dXJuZWQuIFRvXG4gKiBnZXQgdGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUgcmF0aGVyIHRoYW4gdGhlIGVsZW1lbnQsIHVzZVxuICogW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0uXG4gKlxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQGluc3RhbmNlXG4gKiBAYWxpYXMgICAgYXJpYVJlZlxuICogQHBhcmFtICAgIHtPYmplY3R8U3RyaW5nfSBwcm9wZXJ0eVxuICogICAgICAgICAgIEVpdGhlciB0aGUgcHJvcGVydGllcyB0byBzZXQgaW4ga2V5L3ZhbHVlIHBhaXJzIG9yIHRoZSBuYW1lIG9mIHRoZVxuICogICAgICAgICAgIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSAgICB7QXR0cmlidXRlX0NhbGxiYWNrfGpRdWVyeV9wYXJhbX0gW3ZhbHVlXVxuICogICAgICAgICAgIFJlZmVyZW5jZSB0byBzZXQuXG4gKiBAcmV0dXJuICAge2pRdWVyeX1cbiAqICAgICAgICAgICBqUXVlcnkgb2JqZWN0IHJlcHJlc2VudGluZyBlaXRoZXIgdGhlIGVsZW1lbnRzIHRoYXQgd2VyZSBtb2RpZmllZFxuICogICAgICAgICAgICh3aGVuIHNldHRpbmcpIG9yIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQocykgKHdoZW4gZ2V0dGluZyAtIG1heSBiZVxuICogICAgICAgICAgIGFuIGVtcHR5IGpRdWVyeSBvYmplY3QpLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgcmVmZXJlbmNlczwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxoMT5IZWFkaW5nPC9oMT5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj5cbiAqIC8vICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCAuLi5cbiAqIC8vIDwvZGl2PlxuICpcbiAqICQoXCIub25lXCIpLmFyaWFSZWYoXCJsYWJlbGxlZGJ5XCIsICQoXCJoMVwiKSk7XG4gKiAvLyBvclxuICogJChcIi5vbmVcIikuYXJpYVJlZihcImxhYmVsbGVkYnlcIiwgXCJoMVwiKTtcbiAqIC8vIG9yXG4gKiAkKFwiLm9uZVwiKS5hcmlhUmVmKFwibGFiZWxsZWRieVwiLCAkKFwiaDFcIilbMF0pO1xuICogLy8gb3JcbiAqICQoXCIub25lXCIpLmFyaWFSZWYoe1xuICogICAgIGxhYmVsbGVkYnk6ICQoXCJoMVwiKSAvLyBvciBcImgxXCIgb3IgJChcImgxXCIpWzBdXG4gKiB9KTtcbiAqIC8vIEVhY2ggb2YgdGhlc2UgcmV0dXJuIGEgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgXCIub25lXCJcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGgxIGlkPVwiYW5vbnltb3VzMFwiPkhlYWRpbmc8L2gxPlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIGFyaWEtbGFiZWxsZWRieT1cImFub255bW91czBcIj5cbiAqIC8vICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCAuLi5cbiAqIC8vIDwvZGl2PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgcmVmZXJlbmNlcyB3aXRoIGEgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwianMtY29sbGFwc2VcIj5cbiAqIC8vICAgICA8ZGl2IGNsYXNzPVwianMtY29sbGFwc2UtY29udGVudFwiPlxuICogLy8gICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCAuLi5cbiAqIC8vICAgICA8L2Rpdj5cbiAqIC8vICAgICA8YnV0dG9uIGNsYXNzPVwianMtY29sbGFwc2UtdG9nZ2xlXCI+XG4gKiAvLyAgICAgICAgIFRvZ2dsZVxuICogLy8gICAgIDwvYnV0dG9uPlxuICogLy8gPC9kaXY+XG4gKlxuICogJChcIi5qcy1jb2xsYXBzZS10b2dnbGVcIikuYXJpYVJlZihcImNvbnRyb2xzXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKlxuICogICAgIHJldHVybiAkKHRoaXMpXG4gKiAgICAgICAgIC5jbG9zZXN0KFwiLmpzLWNvbGxhcHNlXCIpXG4gKiAgICAgICAgIC5maW5kKFwiLmpzLWNvbGxhcHNlLWNvbnRlbnRcIik7XG4gKlxuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJqcy1jb2xsYXBzZVwiPlxuICogLy8gICAgIDxkaXYgY2xhc3M9XCJqcy1jb2xsYXBzZS1jb250ZW50XCIgaWQ9XCJhbm9ueW1vdXMwXCI+XG4gKiAvLyAgICAgICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IC4uLlxuICogLy8gICAgIDwvZGl2PlxuICogLy8gICAgIDxidXR0b24gY2xhc3M9XCJqcy1jb2xsYXBzZS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwiYW5vbnltb3VzMFwiPlxuICogLy8gICAgICAgICBUb2dnbGVcbiAqIC8vICAgICA8L2J1dHRvbj5cbiAqIC8vIDwvZGl2PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldHRpbmcgYSByZWZlcmVuY2U8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8aDEgaWQ9XCJhbm9ueW1vdXMwXCI+SGVhZGluZzwvaDE+XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgYXJpYS1sYWJlbGxlZGJ5PVwiYW5vbnltb3VzMFwiPlxuICogLy8gICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IC4uLlxuICogLy8gPC9kaXY+XG4gKlxuICogJChcIi5vbmVcIikuYXJpYVJlZihcImxhYmVsbGVkYnlcIik7IC8vIC0+ICQoPGgxPilcbiAqICQoXCIub25lXCIpLmFyaWFSZWYoXCJjb250cm9sc1wiKTsgICAvLyAtPiAkKClcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5WYWx1ZSBpcyB0cmVhdGVkIGxpa2UgYSBDU1Mgc2VsZWN0b3I8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8YnV0dG9uIGlkPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gKiAvLyA8ZGl2IGlkPVwic2VjdGlvblwiPjwvZGl2PlxuICogLy8gPHNlY3Rpb24+PC9zZWN0aW9uPlxuICpcbiAqICQoXCIjYnV0dG9uXCIpLmFyaWFSZWYoXCJjb250cm9sc1wiLCBcInNlY3Rpb25cIik7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxidXR0b24gaWQ9XCJidXR0b25cIiBhcmlhLWNvbnRyb2xzPVwiYW5vbnltb3VzMFwiPjwvYnV0dG9uPlxuICogLy8gPGRpdiBpZD1cInNlY3Rpb25cIj48L2Rpdj5cbiAqIC8vIDxzZWN0aW9uIGlkPVwiYW5vbnltb3VzMFwiPjwvc2VjdGlvbj5cbiAqL1xuJC5mbi5hcmlhUmVmID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuXG4gICAgcmV0dXJuIGFjY2VzcyhcbiAgICAgICAgdGhpcyxcbiAgICAgICAgcHJvcGVydHksXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBIQU5ETEVSX1JFRkVSRU5DRVxuICAgICk7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9pbnN0YW5jZS9hcmlhU3RhdGUuanNcblxuXG5cbi8qKlxuICogU2V0cyBvciBnZXRzIHRoZSBXQUktQVJJQSBzdGF0ZSBvZiB0aGUgY29sbGVjdGlvbi5cbiAqIDxicj48YnI+XG4gKiBXaGVuIHNldHRpbmcgdGhlIHN0YXRlLCBmYWxzZSwgXCJmYWxzZVwiIChhbnkgY2FzZSksIDAgYW5kIFwiMFwiIHdpbGwgYmVcbiAqIGNvbnNpZGVyZWQgZmFsc2UuIEFsbCBvdGhlciB2YWx1ZXMgd2lsbCBiZSBjb25zaWRlcmVkIHRydWUgZXhjZXB0IGZvciBcIm1peGVkXCJcbiAqIChhbnkgY2FzZSkgd2hpY2ggd2lsbCBzZXQgdGhlIHN0YXRlIHRvIFwibWl4ZWRcIi4gVGhlIGRpZmZlcnMgZnJvbVxuICogW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0gd2hpY2ggd2lsbCBzaW1wbHkgc2V0IHRoZVxuICogYXR0cmlidXRlKHMpIHdpdGhvdXQgY29udmVydGluZyB0aGUgdmFsdWUuXG4gKiA8YnI+PGJyPlxuICogQWZ0ZXIgc2V0dGluZyB0aGUgc3RhdGUocyksIGEgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGFmZmVjdGVkXG4gKiBlbGVtZW50cyBpcyByZXR1cm5lZC4gVGhlIHN0YXRlIGZvciB0aGUgZmlyc3QgbWF0Y2hpbmcgZWxlbWVudCBpcyByZXR1cm5lZFxuICogd2hlbiBnZXR0aW5nLlxuICogPGJyPjxicj5cbiAqIEFsbCBhdHRyaWJ1dGVzIGFyZSBub3JtYWxpc2VkIC0gc2VlXG4gKiBbalF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSBmb3IgZnVsbCBkZXRhaWxzLlxuICpcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEBpbnN0YW5jZVxuICogQGFsaWFzICAgIGFyaWFTdGF0ZVxuICogQHBhcmFtICAgIHtPYmplY3R8U3RyaW5nfSBwcm9wZXJ0eVxuICogICAgICAgICAgIEVpdGhlciBhIGtleS92YWx1ZSBjb21iaW5hdGlvbiBwcm9wZXJ0aWVzIHRvIHNldCBvciB0aGUgbmFtZSBvZiB0aGVcbiAqICAgICAgICAgICBXQUktQVJJQSBzdGF0ZSB0byBzZXQuXG4gKiBAcGFyYW0gICAge0F0dHJpYnV0ZV9DYWxsYmFja3xCb29sZWFufE51bWJlcnxTdHJpbmd9IFt2YWx1ZV1cbiAqICAgICAgICAgICBWYWx1ZSBvZiB0aGUgYXR0cmlidXRlLlxuICogQHJldHVybiAgIHtBUklBX3N0YXRlfGpRdWVyeX1cbiAqICAgICAgICAgICBFaXRoZXIgdGhlIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RpZmllZCBlbGVtZW50c1xuICogICAgICAgICAgIChzZXR0aW5nKSBvciB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0IG1hdGNoaW5nIGVsZW1lbnQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0dGluZyBzdGF0ZTwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWJ1c3k9XCJ0cnVlXCIgYXJpYS1jaGVja2VkPVwibWl4ZWRcIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIpOyAgICAvLyAtPiB0cnVlXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJjaGVja2VkXCIpOyAvLyAtPiBcIm1peGVkXCJcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImhpZGRlblwiKTsgIC8vIC0+IHVuZGVmaW5lZFxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgc3RhdGU8L2NhcHRpb24+XG4gKiAvLyBFYWNoIG9mIHRoZXNlIHdpbGwgc2V0IHRoZSBzdGF0ZSB0byBmYWxzZTpcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJmYWxzZVwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJGQUxTRVwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgZmFsc2UpO1xuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKFwiYnVzeVwiLCAwKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCIwXCIpO1xuICpcbiAqIC8vIEVhY2ggb2YgdGhlc2Ugd2lsbCBzZXQgdGhlIHN0YXRlIHRvIFwibWl4ZWRcIjpcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIiwgXCJtaXhlZFwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIiwgXCJNSVhFRFwiKTtcbiAqXG4gKiAvLyBFYWNoIG9mIHRoZXNlIHdpbGwgc2V0IHRoZSBzdGF0ZSB0byB0cnVlXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIFwidHJ1ZVwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJUUlVFXCIpO1xuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKFwiYnVzeVwiLCB0cnVlKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgMSk7XG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIFwiMVwiKTtcbiAqIC8vIFdBUk5JTkc6IHRoZXNlIGFsc28gc2V0IHRoZSBzdGF0ZSB0byB0cnVlXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIHt9KTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgbnVsbCk7XG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIFwibm90aGluZ1wiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJcIik7XG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIC0xKTtcbiAqXG4gKiAvLyBFYWNoIGV4YW1wbGUgcmV0dXJucyBhIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIFwiI29uZVwiIGFuZCBhbiBvYmplY3RcbiAqIC8vIGNhbiBiZSBwYXNzZWQgYXMgcGFyYW1ldGVycyBhcyB3ZWxsOlxuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKHtcbiAqICAgICBidXN5OiB0cnVlXG4gKiB9KTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIHN0YXRlIHdpdGggYSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjwvZGl2PlxuICogLy8gPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ+XG4gKlxuICogJChcIi5jaGVja2JveFwiKS5hcmlhU3RhdGUoXCJjaGVja2VkXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKlxuICogICAgIHJldHVybiAkKHRoaXMpXG4gKiAgICAgICAgIC5uZXh0KFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXVwiKVxuICogICAgICAgICAucHJvcChcImNoZWNrZWRcIik7XG4gKlxuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIj48L2Rpdj5cbiAqIC8vIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxuICovXG4kLmZuLmFyaWFTdGF0ZSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcblxuICAgIHJldHVybiBhY2Nlc3MoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHByb3BlcnR5LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgSEFORExFUl9TVEFURVxuICAgICk7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9pbnN0YW5jZS9yZW1vdmVBcmlhLmpzXG5cblxuJC5mbi5leHRlbmQoe1xuXG4gICAgcmVtb3ZlQXJpYTogcmVtb3ZlQXR0cmlidXRlLFxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgW2pRdWVyeSNyZW1vdmVBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtICAgIHtTdHJpbmd9IG5hbWVcbiAgICAgKiAgICAgICAgICAgV0FJLUFSSUEgYXR0cmlidXRlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuICAge2pRdWVyeX1cbiAgICAgKiAgICAgICAgICAgalF1ZXJ5IGF0dHJpYnV0ZSByZXByZXNlbnRpbmcgdGhlIGVsZW1lbnRzIG1vZGlmaWVkLlxuICAgICAqL1xuICAgIHJlbW92ZUFyaWFSZWY6IHJlbW92ZUF0dHJpYnV0ZSxcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIFtqUXVlcnkjcmVtb3ZlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWF9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSAgICB7U3RyaW5nfSBuYW1lXG4gICAgICogICAgICAgICAgIFdBSS1BUklBIGF0dHJpYnV0ZSB0byByZW1vdmUuXG4gICAgICogQHJldHVybiAgIHtqUXVlcnl9XG4gICAgICogICAgICAgICAgIGpRdWVyeSBhdHRyaWJ1dGUgcmVwcmVzZW50aW5nIHRoZSBlbGVtZW50cyBtb2RpZmllZC5cbiAgICAgKi9cbiAgICByZW1vdmVBcmlhU3RhdGU6IHJlbW92ZUF0dHJpYnV0ZVxuXG59KTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL3JvbGUuanNcblxuXG5cbi8qKlxuICogU2V0cyB0aGUgcm9sZSBvZiBhbGwgZWxlbWVudHMgaW4gdGhlIGNvbGxlY3Rpb24gb3IgZ2V0cyB0aGUgcm9sZSBvZiB0aGUgZmlyc3RcbiAqIGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24sIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgPGNvZGU+cm9sZTwvY29kZT5cbiAqIGFyZ3VtZW50IGlzIHByb3ZpZGVkLiBBcyBbalF1ZXJ5I3JvbGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNyb2xlfSBpcyBqdXN0IGFcbiAqIHdyYXBwZXIgZm9yIFtqUXVlcnkjYXR0cl17QGxpbmsgaHR0cDovL2FwaS5qcXVlcnkuY29tL2F0dHIvfSwgdGhlXG4gKiA8Y29kZT5yb2xlPC9jb2RlPiBwYXJhbWV0ZXIgY2FuIGFjdHVhbGx5IGJlIGFueSB2YWx1ZSB0eXBlIHRoYXQgdGhlIG9mZmljaWFsXG4gKiBkb2N1bWVudGF0aW9uIG1lbnRpb25zLlxuICogPGJyPjxicj5cbiAqIEFjY29yZGluZyB0byB0aGUgV0FJLUFSSUEgc3BlY3MsIGFuIGVsZW1lbnQgY2FuIGhhdmUgbXV0bGlwbGUgcm9sZXMgYXMgYVxuICogc3BhY2Utc2VwYXJhdGVkIGxpc3QuIFRoaXMgbWV0aG9kIHdpbGwgb25seSBzZXQgdGhlIHJvbGUgYXR0cmlidXRlIHRvIHRoZVxuICogZ2l2ZW4gc3RyaW5nIHdoZW4gc2V0dGluZy4gSWYgeW91IHdhbnQgdG8gbW9kaWZ5IHRoZSByb2xlcywgdXNlXG4gKiBbalF1ZXJ5I2FkZFJvbGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhZGRSb2xlfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlUm9sZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZVJvbGV9LlxuICpcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEBpbnN0YW5jZVxuICogQGFsaWFzICAgIHJvbGVcbiAqIEBwYXJhbSAgICB7QXR0cmlidXRlX0NhbGxiYWNrfFN0cmluZ30gW3JvbGVdXG4gKiAgICAgICAgICAgUm9sZSB0byBnZXQgb3IgZnVuY3Rpb24gdG8gc2V0IHRoZSByb2xlLlxuICogQHJldHVybiAgIHtqUXVlcnl8U3RyaW5nfHVuZGVmaW5lZH1cbiAqICAgICAgICAgICBFaXRoZXIgdGhlIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBlbGVtZW50cyB0aGF0IHdlcmVcbiAqICAgICAgICAgICBtb2RpZmllZCBvciB0aGUgcm9sZSB2YWx1ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLnJvbGUoXCJwcmVzZW50YXRpb25cIik7IC8vIC0+IGpRdWVyeSg8ZGl2IGlkPVwib25lXCI+KVxuICpcbiAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGlkPVwib25lXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLnJvbGUoKTsgLy8gLT4gXCJwcmVzZW50YXRpb25cIlxuICogJChcIiN0d29cIikucm9sZSgpOyAvLyAtPiB1bmRlZmluZWRcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIGEgcm9sZSB3aXRoIGEgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGlkPVwib25lXCIgcm9sZT1cImJ1dHRvblwiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLnJvbGUoZnVuY3Rpb24gKGluZGV4LCBjdXJyZW50KSB7XG4gKiAgICAgcmV0dXJuIGN1cnJlbnQgKyBcIiB0b29sdGlwXCI7XG4gKiB9KTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIHJvbGU9XCJidXR0b24gdG9vbHRpcFwiPjwvZGl2PlxuICovXG4kLmZuLnJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xuXG4gICAgcmV0dXJuIHJvbGUgPT09IHVuZGVmaW5lZFxuICAgICAgICA/IHRoaXMuYXR0cihcInJvbGVcIilcbiAgICAgICAgOiB0aGlzLmF0dHIoXCJyb2xlXCIsIHJvbGUpO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvaW5zdGFuY2UvYWRkUm9sZS5qc1xuXG5cbi8qKlxuICogQWRkcyBhIHJvbGUgdG8gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzLiBUaGUgcm9sZSB3aWxsIG5vdCBiZSBhZGRlZCBpZiBpdCdzXG4gKiBlbXB0eSAoXCJcIiBvciB1bmRlZmluZWQpLCBpZiB0aGUgZnVuY3Rpb24gcmVzcG9uc2UgaXMgZW1wdHkgb3IgaWYgdGhlIGVsZW1lbnRcbiAqIGFscmVhZHkgaGFzIHRoYXQgcm9sZS4gSW4gdGhhdCB3YXkgaXQncyBzaW1pbGFyIHRvXG4gKiBbalF1ZXJ5I2FkZENsYXNzXXtAbGluayBodHRwczovL2FwaS5qcXVlcnkuY29tL2FkZENsYXNzL30uXG4gKlxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQGluc3RhbmNlXG4gKiBAYWxpYXMgICAgYWRkUm9sZVxuICogQHBhcmFtICAgIHtBdHRyaWJ1dGVfQ2FsbGJhY2t8U3RyaW5nfSByb2xlXG4gKiAgICAgICAgICAgUm9sZShzKSB0byBhZGQgdG8gdGhlIG1hdGNoaW5nIGVsZW1lbnRzIG9yIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRoZVxuICogICAgICAgICAgIHJvbGUocykgdG8gYWRkLlxuICogQHJldHVybiAgIHtqUXVlcnl9XG4gKiAgICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1hdGNoaW5nIGVsZW1lbnRzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFkZGluZyBhIHJvbGU8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvZGl2PlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiPjwvZGl2PlxuICpcbiAqICQoXCIub25lXCIpLmFkZFJvbGUoXCJhbGVydFwiKTsgLy8gLT4galF1ZXJ5KDxkaXY+LCA8ZGl2PilcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwiYWxlcnRcIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGRpbmcgYSByb2xlIHdpdGggYSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9kaXY+XG4gKlxuICogJChcIi5vbmVcIikuYWRkUm9sZShmdW5jdGlvbiAoaW5kZXgsIGN1cnJlbnQpIHtcbiAqICAgICByZXR1cm4gXCJhbGVydCBjb21ib2JveFwiO1xuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwicHJlc2VudGF0aW9uIGFsZXJ0IGNvbWJvYm94XCI+PC9kaXY+XG4gKi9cbiQuZm4uYWRkUm9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XG5cbiAgICB2YXIgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbihyb2xlKTtcblxuICAgIHJldHVybiB0aGlzLnJvbGUoZnVuY3Rpb24gKGluZGV4LCBjdXJyZW50KSB7XG5cbiAgICAgICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvblxuICAgICAgICAgICAgPyByb2xlLmNhbGwodGhpcywgaW5kZXgsIGN1cnJlbnQpXG4gICAgICAgICAgICA6IHJvbGU7XG4gICAgICAgIHZhciByb2xlcyA9IHRvV29yZHMoY3VycmVudCk7XG5cbiAgICAgICAgdG9Xb3Jkcyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB2YWwgIT09IFwiXCJcbiAgICAgICAgICAgICAgICAmJiB2YWwgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICYmIHJvbGVzLmluZGV4T2YodmFsKSA8IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJvbGVzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcm9sZXMuam9pbihcIiBcIik7XG5cbiAgICB9KTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL3JlbW92ZVJvbGUuanNcblxuXG5cbi8qKlxuICogUmVtb3ZlcyByb2xlcyBmcm9tIHRoZSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzLiBJZiB0aGUgbWV0aG9kIGlzIGNhbGxlZFxuICogd2l0aG91dCBhbnkgYXJndW1lbnRzIHRoZW4gdGhlIHJvbGUgYXR0cmlidXRlIGl0c2VsZiBpcyByZW1vdmVkLiBCZSBhd2FyZVxuICogdGhhdCB0aGlzIGlzIG5vdCB0aGUgc2FtZSBhcyBwYXNzaW5nIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB1bmRlZmluZWQgLVxuICogc3VjaCBhbiBhY3Rpb24gd2lsbCBoYXZlIG5vIGVmZmVjdC5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICByZW1vdmVSb2xlXG4gKiBAcGFyYW0gICAge0F0dHJpYnV0ZV9DYWxsYmFja3xTdHJpbmd9IFtyb2xlXVxuICogICAgICAgICAgIFJvbGUocykgdG8gcmVtb3ZlIG9yIGEgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGhlIHJvbGUocykgdG8gcmVtb3ZlLlxuICogQHJldHVybiAgIHtqUXVlcnl9XG4gKiAgICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1hdGNoZWQgZWxlbWVudHMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVtb3ZpbmcgYSByb2xlPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwiYWxlcnRcIj48L2Rpdj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5yZW1vdmVSb2xlKFwiYWxlcnRcIik7IC8vIC0+IGpRdWVyeSg8ZGl2PiwgPGRpdj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgcm9sZT1cIlwiPjwvZGl2PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbXBsZXRlbHkgcmVtb3ZpbmcgYSByb2xlPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwiYWxlcnRcIj48L2Rpdj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5yZW1vdmVSb2xlKCk7IC8vIC0+IGpRdWVyeSg8ZGl2PiwgPGRpdj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZW1vdmluZyBhIHJvbGUgd2l0aCBhIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnQgY29tYm9ib3hcIj48L2Rpdj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5yZW1vdmVSb2xlKGZ1bmN0aW9uIChpbmRleCwgY3VycmVudCkge1xuICogICAgIHJldHVybiBjdXJyZW50XG4gKiAgICAgICAgIC5zcGxpdCgvXFxzKy8pXG4gKiAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHJvbGUpIHtcbiAqICAgICAgICAgICAgIHJldHVybiByb2xlLmluZGV4T2YoXCJhXCIpID4gLTE7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAqICAgICAvLyBcInByZXNlbnRhdGlvbiBhbGVydFwiXG4gKiB9KTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJjb21ib2JveFwiPjwvZGl2PlxuICovXG4kLmZuLnJlbW92ZVJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xuXG4gICAgdmFyIGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb24ocm9sZSk7XG5cbiAgICByZXR1cm4gcm9sZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gdGhpcy5yZW1vdmVBdHRyKFwicm9sZVwiKVxuICAgICAgICA6IHRoaXMucm9sZShmdW5jdGlvbiAoaW5kZXgsIGN1cnJlbnQpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvblxuICAgICAgICAgICAgICAgID8gcm9sZS5jYWxsKHRoaXMsIGluZGV4LCBjdXJyZW50KVxuICAgICAgICAgICAgICAgIDogcm9sZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0b1dvcmRzKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRvV29yZHMoY3VycmVudClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChhUm9sZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YoYVJvbGUpIDwgMDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcblxuICAgICAgICB9KTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL2FyaWFGb2N1c2FibGUuanNcblxuXG5cbi8qKlxuICogU2V0cyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0Y2hpbmcgZWxlbWVudHMgYXJlIGZvY3VzYWJsZS4gU3RyaW5ncywgbnVtYmVycyBhbmRcbiAqIGJvb2xlYW5zIGFyZSB1bmRlcnN0b29kIGFzIDxjb2RlPnN0YXRlPC9jb2RlPiAtIHNlZVxuICogW2pRdWVyeSNhcmlhU3RhdGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhU3RhdGV9IGZvciBmdWxsIGRldGFpbHMgYXMgdGhlXG4gKiBhbGdvcnl0aG0gaXMgdGhlIHNhbWUuXG4gKiA8YnI+PGJyPlxuICogQmUgYXdhcmUgdGhpcyB0aGlzIGZ1bmN0aW9uIHdpbGwgb25seSBtb2RpZnkgdGhlIG1hdGNoaW5nIGVsZW1lbnRzLCBpdCB3aWxsXG4gKiBub3QgY2hlY2sgYW55IHBhcmVudHMgb3IgbW9kaWZ5IGFueSBvdGhlciBlbGVtZW50cyB0aGF0IGNvdWxkIGFmZmVjdCB0aGVcbiAqIGZvY3VzYWJpbGl0eSBvZiB0aGUgZWxlbWVudC5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICBhcmlhRm9jdXNhYmxlXG4gKiBAcGFyYW0gICAge0F0dHJpYnV0ZV9DYWxsYmFja3xCb29sZWFufE51bWJlcnxTdHJpbmd9IHN0YXRlXG4gKiAgICAgICAgICAgU3RhdGUgdG8gc2V0LlxuICogQHJldHVybiAgIHtqUXVlcnl9XG4gKiAgICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGFmZmVjdGVkIGVsZW1lbnQocykuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U2V0dGluZyBmb2N1c2FiaWxpdHk8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhRm9jdXNhYmxlKGZhbHNlKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKiAkKFwiI3R3b1wiKS5hcmlhRm9jdXNhYmxlKHRydWUpOyAgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJ0d29cIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiIHRhYmluZGV4PVwiLTFcIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5MaW1pdGF0aW9ucyBvZiB0aGUgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIiB0YWJpbmRleD1cIi0xXCI+XG4gKiAvLyAgICAgPGRpdiBpZD1cInR3b1wiIGRpc2FibGVkPjwvZGl2PlxuICogLy8gPC9kaXY+XG4gKlxuICogJChcIiN0d29cIikuYXJpYUZvY3VzYWJsZSh0cnVlKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJ0d29cIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIHRhYmluZGV4PVwiLTFcIj5cbiAqIC8vICAgICA8ZGl2IGlkPVwidHdvXCIgZGlzYWJsZWQgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG4gKiAvLyA8L2Rpdj5cbiAqL1xuJC5mbi5hcmlhRm9jdXNhYmxlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hdHRyKFxuICAgICAgICBcInRhYmluZGV4XCIsXG4gICAgICAgIGhhbmRsZXJzW0hBTkRMRVJfU1RBVEVdLnJlYWQoc3RhdGUpXG4gICAgICAgICAgICA/IDBcbiAgICAgICAgICAgIDogLTFcbiAgICApO1xuXG59O1xuXG59KGpRdWVyeSkpOyJdLCJmaWxlIjoianF1ZXJ5LmFyaWEuanMifQ==

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkuYXJpYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEganF1ZXJ5LWFyaWEgKGh0dHBzOi8vZ2l0aHViLmNvbS9Ta2F0ZXNpZGUvanF1ZXJ5LWFyaWEjcmVhZG1lKSAtIHYwLjYuMWEgLSBNSVQgbGljZW5zZSAtIDIwMTctMy0yNiAqL1xuKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFNvdXJjZTogL3NyYy9kb2MvZmlsZS5qc1xuLyoqXG4gKiBAZmlsZVxuICogVGhpcyBpcyBhIGpRdWVyeSBwbHVnaW4gdGhhdCBhZGRzIG1ldGhvZHMgZm9yIG1hbmlwdWxhdGluZyBXQUktQVJJQVxuICogYXR0cmlidXRlcy4gVW5saWtlIG90aGVyIHBsdWdpbnMgdGhhdCBkbyBzaW1pbGFyIHRoaW5ncywgdGhpcyBwbHVnaW4gaGFzIGJlZW5cbiAqIGRlc2lnbmVkIHRvIG1hdGNoIGpRdWVyeSdzIHN0eWxlIG1ha2luZyBpdCBtdWNoIGVhc2llciB0byBwaWNrIHVwLiBUaGUgcGx1Z2luXG4gKiBpbmNsdWRlczpcbiAqIDxicj48YnI+XG4gKiA8c3Ryb25nPkdldHRpbmcgYW5kIFNldHRpbmcgV0FJLUFSSUEgQXR0cmlidXRlczwvc3Ryb25nPlxuICogPGJyPltqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9IGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nXG4gKiBXQUktQVJJQSBhdHRyaWJ1dGVzLlxuICogPGJyPltqUXVlcnkjYXJpYVJlZl17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFSZWZ9IGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nXG4gKiByZWZlcmVuY2VzIHRvIG90aGVyIGVsZW1lbnRzLlxuICogPGJyPltqUXVlcnkjYXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVN0YXRlfSBmb3IgZ2V0dGluZyBhbmRcbiAqIHNldHRpbmcgc3RhdGVzLlxuICogPGJyPjxicj5cbiAqIDxzdHJvbmc+UmVtb3ZpbmcgV0FJLUFSSUEgQXR0cmlidXRlczwvc3Ryb25nPlxuICogPGJyPltqUXVlcnkjcmVtb3ZlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWF9IGZvciByZW1vdmluZ1xuICogV0FJLUFSSUEgYXR0cmlidXRlcyAoYWxpYXNlZCBhc1xuICogW2pRdWVyeSNyZW1vdmVBcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVJlZn0gYW5kXG4gKiBbalF1ZXJ5I3JlbW92ZUFyaWFTdGF0ZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWFTdGF0ZX0pLlxuICogPGJyPjxicj5cbiAqIDxzdHJvbmc+QWRqdXN0aW5nIFdBSS1BUklBIEF0dHJpYnV0ZSBNYW5pcHVsYXRpb248L3N0cm9uZz5cbiAqIDxicj5balF1ZXJ5LmFyaWFGaXhde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5hcmlhRml4fSB3aWxsIGNvbnZlcnQgdGhlIG5hbWVzIG9mXG4gKiBXQUktQVJJQSBhdHRyaWJ1dGVzLlxuICogPGJyPltqUXVlcnkuYXJpYUhvb2tzXXtAbGluayBleHRlcm5hbDpqUXVlcnkuYXJpYUhvb2tzfSBhbGxvdyBzcGVjaWFsXG4gKiBmdW5jdGlvbmFsaXR5IHRvIGJlIGRlZmluZWQgZm9yIHNwZWNpZmljIFdBSS1BUklBIGF0dHJpYnV0ZXMuXG4gKiA8YnI+PGJyPlxuICogPHN0cm9uZz5NYW5pcHVsYXRpbmcgTGFuZG1hcmtzPC9zdHJvbmc+XG4gKiA8YnI+W2pRdWVyeSNyb2xlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcm9sZX0sXG4gKiBbalF1ZXJ5I2FkZFJvbGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhZGRSb2xlfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlUm9sZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZVJvbGV9IGhhbmRsaW5nIFdBSS1BUklBXG4gKiBsYW5kbWFya3MuXG4gKiA8YnI+PGJyPlxuICogPHN0cm9uZz5IZWxwZXIgRnVuY3Rpb25zIGZvciBDb21tb24gRnVuY3Rpb25hbGl0eTwvc3Ryb25nPlxuICogPGJyPltqUXVlcnkjaWRlbnRpZnlde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNpZGVudGlmeX0gZm9yIGdlbmVyYXRpbmcgZWxlbWVudFxuICogSURzIGFzIG5lY2Vzc2FyeS5cbiAqIDxicj5balF1ZXJ5I2FyaWFGb2N1c2FibGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhRm9jdXNhYmxlfSBmb3IgdG9nZ2xpbmdcbiAqIGZvY3VzYWJpbGl0eS5cbiAqIDxicj5balF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSBmb3JcbiAqIHNpbXBsaWZ5aW5nIHRoZSBXQUktQVJJQSBhdHRyaWJ1dGVzIChhbGlhc2VkIGFzXG4gKiBbalF1ZXJ5Lm5vcm1hbGl6ZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpemVBcmlhfSkuXG4gKiA8YnI+PGJyPlxuICogVGhlIGZpbGVzIGNhbiBiZSBkb3dubG9hZGVkIG9uXG4gKiBbR2l0SHViXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vU2thdGVzaWRlL2pxdWVyeS1hcmlhfS5cbiAqXG4gKiBAYXV0aG9yIEphbWVzIFwiU2thdGVzaWRlXCIgTG9uZyA8c2s4NWlkZUBob3RtYWlsLmNvbT5cbiAqIEB2ZXJzaW9uIDAuNi4xYVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuLy8gU291cmNlOiAvc3JjL2RvYy9leHRlcm5hbC9qUXVlcnkuanNcbi8qKlxuICogQGV4dGVybmFsIGpRdWVyeVxuICogQHNlZSBbalF1ZXJ5XXtAbGluayBodHRwOi8vanF1ZXJ5LmNvbX1cbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL2NhbGxiYWNrL0F0dHJpYnV0ZV9DYWxsYmFjay5qc1xuLyoqXG4gKiBUaGUgW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0sXG4gKiBbalF1ZXJ5I2FyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhUmVmfSBhbmRcbiAqIFtqUXVlcnkjYXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVN0YXRlfSBtZXRob2RzIGFsbCB0YWtlXG4gKiBmdW5jdGlvbnMgdG8gc2V0IHRoZWlyIHZhbHVlLiBUaGUgZnVuY3Rpb25zIGFsbCBoYXZlIHRoZSBzYW1lIHNpZ25hdHVyZSxcbiAqIGRlc2NyaWJlZCBoZXJlLiBJdCBpcyBpbXBvcnRhbnQgdG8gcmVtZW1iZXIgdGhhdCB0aGUgdmFsdWUgdGhpcyBmdW5jdGlvblxuICogcmV0dXJucyB3aWxsIGJlIHRyZWF0ZWQgYXMgaWYgaXQgaGFkIG9yaWdpbmFsbHkgYmVlbiBwYXNzZWQgdG8gdGhlXG4gKiBmdW5jdGlvbi4gU2VlXG4gKiBbalF1ZXJ5I2F0dHJde0BsaW5rIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9hdHRyLyNhdHRyLWF0dHJpYnV0ZU5hbWUtZnVuY3Rpb259XG4gKiBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhbmQgZXhhbXBsZXMuXG4gKlxuICogQGNhbGxiYWNrIEF0dHJpYnV0ZV9DYWxsYmFja1xuICogQHRoaXMgICAgIEhUTUxFbGVtZW50XG4gKiAgICAgICAgICAgVGhlIGVsZW1lbnQgYmVpbmcgcmVmZXJlbmNlZC5cbiAqIEBwYXJhbSAgICB7TnVtYmVyfSBpbmRleFxuICogICAgICAgICAgIFRoZSBpbmRleCBvZiB0aGUgY3VycmVudCBlbGVtZW50IGZyb20gd2l0aGluIHRoZSBvdmVyYWxsIGpRdWVyeVxuICogICAgICAgICAgIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0gICAge1N0cmluZ3x1bmRlZmluZWR9IGF0dHJcbiAqICAgICAgICAgICBDdXJyZW50IGF0dHJpYnV0ZSB2YWx1ZSAodW5kZWZpbmVkIGlmIHRoZSBlbGVtZW50IGRvZXMgbm90XG4gKiAgICAgICAgICAgY3VycmVudGx5IGhhdmUgdGhlIGF0dHJpYnV0ZSBhc3NpZ25lZCkuXG4gKiBAcmV0dXJuICAge1N0cmluZ31cbiAqICAgICAgICAgICBUaGUgdmFsdWUgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogJChcIiNvbmVcIikuYXJpYShcImxhYmVsXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKiAgICAgcmV0dXJuIFwiVGVzdFwiO1xuICogfSk7XG4gKiAvLyBpcyB0aGUgc2FtZSBhc1xuICogJChcIiNvbmVcIikuYXJpYShcImxhYmVsXCIsIFwiVGVzdFwiKTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5FbGVtZW50cyB3aXRob3V0IHRoZSBhdHRyaWJ1dGUgcGFzcyB1bmRlZmluZWQ8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhKFwibGFiZWxcIiwgZnVuY3Rpb24gKGksIGF0dHIpIHtcbiAqICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGF0dHIpO1xuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJbb2JqZWN0IFVuZGVmaW5lZF1cIj48L2Rpdj5cbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL3R5cGVkZWYvQVJJQV9zdGF0ZS5qc1xuLyoqXG4gKiBBIGJvb2xlYW4gb3IgdGhlIHN0cmluZyBcIm1peGVkXCIgKGFsd2F5cyBpbiBsb3dlciBjYXNlKS4gVGhpcyB0eXBlIHdpbGxcbiAqIGJlIHVuZGVmaW5lZCB3aGVuIHRyeWluZyB0byByZWFkIGEgc3RhdGUgdGhhdCBoYXMgbm90IGJlZW4gc2V0IG9uIHRoZVxuICogZWxlbWVudC5cbiAqXG4gKiBAdHlwZWRlZiB7Qm9vbGVhbnxTdHJpbmd8dW5kZWZpbmVkfSBBUklBX3N0YXRlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIE1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtY2hlY2tlZD1cInRydWVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIiBhcmlhLWNoZWNrZWQ9XCJmYWxzZVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInRocmVlXCIgYXJpYS1jaGVja2VkPVwibWl4ZWRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJmb3VyXCI+PC9kaXY+XG4gKlxuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKFwiY2hlY2tlZFwiKTsgICAvLyAtPiB0cnVlXG4gKiAkKFwiI3R3b1wiKS5hcmlhU3RhdGUoXCJjaGVja2VkXCIpOyAgIC8vIC0+IGZhbHNlXG4gKiAkKFwiI3RocmVlXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIik7IC8vIC0+IFwibWl4ZWRcIlxuICogJChcIiNmb3VyXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIik7ICAvLyAtPiB1bmRlZmluZWRcbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL3R5cGVkZWYvQVJJQV9ob29rLmpzXG4vKipcbiAqIEEgaG9vayBmb3IgYSBXQUktQVJJQSBhdHRyaWJ1dGUuIEV2ZXJ5IHByb3BlcnR5IGlzIG9wdGlvbmFsIHNvIHRoZXJlIGlzIG5vXG4gKiBuZWVkIHRvIHNwZWNpZnkgb25lIHRvIGV4ZWN1dGUgdGhlIGRlZmF1bHQgZnVuY3Rpb25hbGl0eS5cbiAqIDxicj48YnI+XG4gKiBCZSBhd2FyZSB0aGF0IHRoZXNlIGhvb2tzIG9ubHkgYWZmZWN0IHRoZSBhcmlhIG1ldGhvZHM7XG4gKiBbalF1ZXJ5I2F0dHJde0BsaW5rIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9hdHRyL30gYW5kXG4gKiBbalF1ZXJ5I3Byb3Bde0BsaW5rIGh0dHA6Ly9hcGkuanF1ZXJ5LmNvbS9wcm9wL30gd2lsbCBub3QgYmUgYWZmZWN0ZWQgYnkgYW55XG4gKiBjaGFuZ2VzIGhlcmUuIFRoZXJlIGFyZSBzaW1pbGFyIDxjb2RlPmpRdWVyeS5hdHRySG9va3M8L2NvZGU+IGFuZFxuICogPGNvZGU+alF1ZXJ5LnByb3BIb29rczwvY29kZT4gKGZvciBzZXQgYW5kIGdldCkgdGhhdCB3b3JrIGluIHRoZSBzYW1lIHdheSBpZlxuICogeW91IG5lZWQgdG8gY29tcGxldGVseSBjb250cm9sIGF0dHJpYnV0ZS9wcm9wZXJ0eSBzZXR0aW5nLlxuICpcbiAqIEB0eXBlZGVmICB7T2JqZWN0fSAgICAgICAgICBBUklBX2hvb2tcbiAqIEBwcm9wZXJ0eSB7QVJJQV9ob29rX3NldH0gICBbc2V0XVxuICogICAgICAgICAgIEhhbmRsZXMgc2V0dGluZyB0aGUgYXR0cmlidXRlLlxuICogQHByb3BlcnR5IHtBUklBX2hvb2tfZ2V0fSAgIFtnZXRdXG4gKiAgICAgICAgICAgSGFuZGxlcyBnZXR0aW5nIHRoZSBhdHRyaWJ1dGUuXG4gKiBAcHJvcGVydHkge0FSSUFfaG9va19oYXN9ICAgW2hhc11cbiAqICAgICAgICAgICBIYW5kbGVycyBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCB0aGUgYXR0cmlidXRlIGlzIGFzc2lnbmVkLlxuICogQHByb3BlcnR5IHtBUklBX2hvb2tfdW5zZXR9IFt1bnNldF1cbiAqICAgICAgICAgICBIYW5kbGVzIHJlbW92aW5nIHRoZSBhdHRyaWJ1dGUuXG4gKi9cblxuLyoqXG4gKiBIYW5kbGVzIHRoZSBzZXR0aW5nIG9mIGEgV0FJLUFSSUEgYXR0cmlidXRlLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHZhbHVlLFxuICogdGhhdCB2YWx1ZSBpcyB1c2VkIHRvIHNldCB0aGUgYXR0cmlidXRlOyByZXR1cm5pbmcgbnVsbCwgdW5kZWZpbmVkLCBvciBub3RcbiAqIHJldHVybmluZyBhbnl0aGluZyB3aWxsIHByZXZlbnQgdGhlIG5vcm1hbCBhdHRyaWJ1dGUgc2V0dGluZyBwcm9jZXNzIGZyb21cbiAqIGNvbXBsZXRpbmcuXG4gKiA8YnI+PGJyPlxuICogV2hlbiBzZXR0aW5nIGFuIGF0dHJpYnV0ZSwgcGxlYXNlIGRvIG5vdCB1c2VcbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LFxuICogW2pRdWVyeSNhcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVJlZn0gb3JcbiAqIFtqUXVlcnkjYXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVN0YXRlfSBhcyB0aGlzIGNhbiBjcmVhdGUgYW5cbiAqIGluZmluaXRlIGxvb3AuXG4gKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSAgICBBUklBX2hvb2tfc2V0XG4gKiBAcGFyYW0gICB7SFRNTEVsZW1lbnR9ICAgICAgICAgICBlbGVtZW50XG4gKiAgICAgICAgICBFbGVtZW50IHdob3NlIGF0dHJpYnV0ZSBzaG91bGQgYmUgbW9kaWZpZWQuXG4gKiBAcGFyYW0gICB7Qm9vbGVhbnxOdW1iZXJ8U3RyaW5nfSB2YWx1ZVxuICogICAgICAgICAgVmFsdWUgb2YgdGhlIGF0dHJpYnV0ZSBpbiB0aGUgZm9ybSBnaXZlbiB0byB0aGUgYXJpYSBmdW5jdGlvbi5cbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVxuICogICAgICAgICAgRnVsbCBhdHRyaWJ1dGUgbmFtZSwgbG93ZXIgY2FzZSBhbmQgaW5jbHVkaW5nIFwiYXJpYS1cIiBwcmVmaXguXG4gKiBAcmV0dXJuICB7P31cbiAqICAgICAgICAgIFBvc3NpYmxlIGNvbnZlcnNpb24gb2YgdGhlIHZhbHVlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgZmljdGl0aW91cyBcInZvbHVtZVwiIG9yIFwic291bmRzZXR1cFwiIGF0dHJpYnV0ZXM8L2NhcHRpb24+XG4gKiAkLmFyaWFIb29rcy52b2x1bWUgPSB7XG4gKiAgICAgLy8gTGV0J3MgYXNzdW1lIHRoYXQgdGhlIHZhbHVlIG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyIGFuZCB0aGF0IGFueVxuICogICAgIC8vIG90aGVyIHZhbHVlIHNob3VsZCBiZSBpZ25vcmVkLlxuICogICAgIHNldDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlLCBhdHRyaWJ1dGUpIHtcbiAqICAgICAgICAgdmFyIHBvc0ludCA9IE1hdGguZmxvb3IoTWF0aC5hYnModmFsdWUpKTtcbiAqICAgICAgICAgcmV0dXJuIGlzTmFOKHBvc0ludClcbiAqICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gKiAgICAgICAgICAgICA6IHBvc0ludDtcbiAqICAgICB9XG4gKiB9O1xuICogJC5hcmlhSG9va3Muc291bmRzZXR1cCA9IHtcbiAqICAgICAvLyBMZXQncyBhc3N1bWUgdGhhdCB0aGUgdmFsdWUgY2FuIG9ubHkgYmUgc29tZXRoaW5nIGluIGEgc2V0IGxpc3QgYW5kXG4gKiAgICAgLy8gdGhhdCBldmVyeXRoaW5nIGVsc2Ugc2hvdWxkIGJlIGlnbm9yZWQuXG4gKiAgICAgc2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgdmFsdWUsIGF0dHJpYnV0ZSkge1xuICogICAgICAgICB2YXIgdmFsdWVzID0gW1wibW9ub1wiLCBcInN0ZXJlb1wiLCBcIjUuMVwiXTtcbiAqICAgICAgICAgcmV0dXJuIHZhbHVlcy5pbmRleE9mKHZhbHVlKSA+IC0xXG4gKiAgICAgICAgICAgICA/IHZhbHVlXG4gKiAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAqICAgICB9XG4gKiB9O1xuICpcbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhKHtcbiAqICAgICB2b2x1bWU6IDUsXG4gKiAgICAgc291bmRzZXR1cDogXCJtb25vXCJcbiAqIH0pO1xuICogJChcIiN0d29cIikuYXJpYSh7XG4gKiAgICAgdm9sdW1lOiBcImxvdWRcIixcbiAqICAgICBzb3VuZHNldHVwOiBcImxlZ2VuZGFyeVwiXG4gKiB9KTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtdm9sdW1lPVwiNVwiIGFyaWEtc291bmRzZXR1cD1cIm1vbm9cIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqL1xuXG4vKipcbiAqIEhhbmRsZXMgdGhlIGdldHRpbmcgb2YgYSBXQUktQVJJQSBhdHRyaWJ1dGUuIFRoZSBmdW5jdGlvbiB0YWtlcyB0aGUgZWxlbWVudFxuICogYW5kIHNob3VsZCByZXR1cm4gdGhlIHZhbHVlIHRoYXQgdGhlIGpRdWVyeSBhcmlhIG1ldGhvZHMgc2hvdWxkIHJldHVybi5cbiAqIDxicj48YnI+XG4gKiBXaGVuIGdldHRpbmcgYW4gYXR0cmlidXRlLCBwbGVhc2UgZG8gbm90IHVzZVxuICogW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0sXG4gKiBbalF1ZXJ5I2FyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhUmVmfSBvclxuICogW2pRdWVyeSNhcmlhU3RhdGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhU3RhdGV9IGFzIHRoaXMgY2FuIGNyZWF0ZSBhblxuICogaW5maW5pdGUgbG9vcC5cbiAqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259ICAgIEFSSUFfaG9va19nZXRcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICAgRWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgdmFsdWUgc2hvdWxkIGJlIHJldHVybmVkLlxuICogQHBhcmFtICAge1N0cmluZ30gICAgICBhdHRyaWJ1dGVcbiAqICAgICAgICAgIEZ1bGwgYXR0cmlidXRlIG5hbWUsIGxvd2VyIGNhc2UgYW5kIGluY2x1ZGluZyBcImFyaWEtXCIgcHJlZml4LlxuICogQHJldHVybiAgez9Cb29sZWFufE51bWJlcnxTdHJpbmd9XG4gKiAgICAgICAgICBWYWx1ZSBvZiB0aGUgYXR0cmlidXRlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldHRpbmcgYSBmaWN0aXRpb3VzIFwidm9sdW1lXCIgYXR0cmlidXRlPC9jYXB0aW9uPlxuICogJC5hcmlhSG9va3Mudm9sdW1lID0ge1xuICogICAgIC8vIExldCdzIGFzc3VtZSB0aGF0IHRoZSB2YWx1ZSB3aWxsIGJlIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgaWYgaXRcbiAqICAgICAvLyBjb250YWlucyBhbm90aGVyIHZhbHVlLCBvciBpcyBtaXNzaW5nLCBpdCBkZWZhdWx0cyB0byAwLlxuICogICAgIGdldDogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICogICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICogICAgICAgICByZXR1cm4gKHZhbHVlID09PSBudWxsIHx8IGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA8IDApXG4gKiAgICAgICAgICAgICA/IDBcbiAqICAgICAgICAgICAgIDogTWF0aC5mbG9vcih2YWx1ZSk7XG4gKiAgICAgfVxuICogfTtcbiAqXG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGlkPVwib25lXCIgYXJpYS12b2x1bWU9XCI1XCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGlkPVwidHdvXCIgYXJpYS12b2x1bWU9XCJsb3VkXCI+PC9kaXY+XG4gKlxuICogJChcIiNvbmVcIikuYXJpYShcInZvbHVtZVwiKTsgLy8gLT4gNVxuICogJChcIiN0d29cIikuYXJpYShcInZvbHVtZVwiKTsgLy8gLT4gMFxuICovXG5cbi8qKlxuICogSGFuZGxlcyBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCB0aGUgV0FJLUFSSUEgYXR0cmlidXRlIGV4aXN0cyBvbiB0aGUgZWxlbWVudFxuICogYW5kIGl0IHNob3VsZCByZXR1cm4gYSBib29sZWFuLiBDdXJyZW50bHkgdGhpcyBmdW5jdGlvbmFsaXR5IGlzIG5vdCBleHBvc2VkXG4gKiBpbiBhbiBhcmlhIG1ldGhvZCwgYnV0IHRoZSBleGlzdGVuY2Ugb2YgYSBXQUktQVJJQSBhdHRyaWJ1dGUgd2lsbCBiZSBjaGVja2VkXG4gKiBiZWZvcmUgZ2V0dGluZyBvY2N1cnMgKGFuZCB0aGUge0BsaW5rIEFSSUFfaG9va19nZXR9IGZ1bmN0aW9uIGV4ZWN1dGVzKS5cbiAqXG4gKiBAdHlwZWRlZiB7RnVuY3Rpb259ICAgIEFSSUFfaG9va19oYXNcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICAgRWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIGNoZWNrZWQuXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgIGF0dHJpYnV0ZVxuICogICAgICAgICAgRnVsbCBhdHRyaWJ1dGUgbmFtZSwgbG93ZXIgY2FzZSBhbmQgaW5jbHVkaW5nIFwiYXJpYS1cIiBwcmVmaXguXG4gKiBAcmV0dXJuICB7Qm9vbGVhbn1cbiAqICAgICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBhdHRyaWJ1dGUgZXhpc3RzIG9uIHRoZSBlbGVtZW50ICh0cnVlIGlmIGl0XG4gKiAgICAgICAgICBkb2VzLCBmYWxzZSBvdGhlcndpc2UpLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNoZWNraW5nIGZvciBhIGZpY3RpdGlvdXMgXCJ2b2x1bWVcIiBhdHRyaWJ1dGU8L2NhcHRpb24+XG4gKiAkLmFyaWFIb29rcy52b2x1bWUgPSB7XG4gKiAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKFwiaGlcIik7XG4gKiAgICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICogICAgIH0sXG4gKiAgICAgLy8gTGV0J3MgYXNzdW1lIHRoYXQgdGhlIGF0dHJpYnV0ZSBoYXMgdG8gY29udGFpbiBhIHBvc2l0aXZlIGludGVnZXIgYW5kXG4gKiAgICAgLy8gd2lsbCBiZSBjb25zaWRlcmVkIG5vbi1leGlzdGVudCBpZiBpdCBjb250YWlucyBhbnl0aGluZyBlbHNlLlxuICogICAgIGhhczogZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICogICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICogICAgICAgICB2YXIgaW50VmFsID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAqICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIGludFZhbCA9PT0gK3ZhbHVlICYmIGludFZhbCA8PSAwO1xuICogICAgIH1cbiAqIH07XG4gKlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtdm9sdW1lPVwiNVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiIGFyaWEtdm9sdW1lPVwibG91ZFwiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLmFyaWEoXCJ2b2x1bWVcIik7XG4gKiAvLyBMb2dzOiBcImhpXCJcbiAqIC8vIC0+IFwiNVwiXG4gKiAkKFwiI3R3b1wiKS5hcmlhKFwidm9sdW1lXCIpOyAvLyAtPiB1bmRlZmluZWRcbiAqL1xuXG4vKipcbiAqIENoZWNrcyB0byBzZWUgaWYgdGhlIFdBSS1BUklBIGF0dHJpYnV0ZSBzaG91bGQgYmUgcmVtb3ZlZC4gSWYgdGhlIGZ1bmN0aW9uXG4gKiByZXR1cm5zIDxjb2RlPnRydWU8L2NvZGU+IChvciBhIHRydXRoeSB2YWx1ZSkgdGhlbiB0aGUgYXR0cmlidXRlIHdpbGwgYmVcbiAqIHJlbW92ZWQsIGEgZmFsc3kgdmFsdWUgd2lsbCBwcmV2ZW50IHRoZSBhdHRyaWJ1dGUgYmVpbmcgcmVtb3ZlZCB0aHJvdWdoIHRoZVxuICogYXJpYSBtZXRob2RzIChhbHRob3VnaCB0aGVyZSBpcyBub3RoaW5nIHN0b3BwaW5nIGl0IGJlaW5nIHJlbW92ZWQgaW4gYW5vdGhlclxuICogd2F5IG9yIGV2ZW4gdGhyb3VnaCB0aGUgZnVuY3Rpb24gaXRzZWxmKS5cbiAqIDxicj48YnI+XG4gKiBXaGVuIHJlbW92aW5nIGFuIGF0dHJpYnV0ZSwgcGxlYXNlIGRvIG5vdCB1c2VcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWF9LFxuICogW2pRdWVyeSNyZW1vdmVBcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVJlZn0gb3JcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlfSBhcyB0aGlzIGNhblxuICogY3JlYXRlIGFuIGluZmluaXRlIGxvb3AuXG4gKlxuICogQHR5cGVkZWYge0Z1bmN0aW9ufSAgICBBUklBX2hvb2tfdW5zZXRcbiAqIEBwYXJhbSAgIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogICAgICAgICAgRWxlbWVudCB3aG9zZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIHJlbW92ZWQuXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgIGF0dHJpYnV0ZVxuICogICAgICAgICAgRnVsbCBhdHRyaWJ1dGUgbmFtZSwgbG93ZXIgY2FzZSBhbmQgaW5jbHVkaW5nIFwiYXJpYS1cIiBwcmVmaXguXG4gKiBAcmV0dXJuICB7Qm9vbGVhbn1cbiAqICAgICAgICAgIFdoZXRoZXIgb3Igbm90IHRoZSBhdHRyaWJ1dGUgc2hvdWxkIGJlIHJlbW92ZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVtb3ZpbmcgYSBmaWN0aXRpb3VzIFwidm9sdW1lXCIgYXR0cmlidXRlPC9jYXB0aW9uPlxuICogJC5hcmlhSG9va3Mudm9sdW1lID0ge1xuICogICAgIC8vIExldCdzIGFzc3VtZSB0aGF0IHRoZXJlIGlzIGFsc28gYSBcInNvdW5kc2V0dXBcIiBhdHRyaWJ1dGUgYW5kIHRoYXQgaXRcbiAqICAgICAvLyByZXF1aXJlcyB0aGUgXCJ2b2x1bWVcIiBhdHRyaWJ1dGUgdG8gZXhpc3QsIHRodXMgaWYgXCJ2b2x1bWVcIiBpcyByZW1vdmVkLFxuICogICAgIC8vIFwic291bmRzZXR1cFwiIHNob3VsZCBiZSByZW1vdmVkIGFzIHdlbGwuXG4gKiAgICAgdW5zZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyaWJ1dGUpIHtcbiAqICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJhcmlhLXNvdW5kc2V0dXBcIik7XG4gKiAgICAgICAgIHJldHVybiB0cnVlO1xuICogICAgIH1cbiAqIH07XG4gKlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtdm9sdW1lPVwiNVwiIGFyaWEtc291bmRzZXR1cD1cIm1vbm9cIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5yZW1vdmVBcmlhKFwidm9sdW1lXCIpO1xuICpcbiAqIC8vIE5vdyBtYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqL1xuXG4vLyBTb3VyY2U6IC9zcmMvZG9jL3R5cGVkZWYvalF1ZXJ5X3BhcmFtLmpzXG4vKipcbiAqIEFueSBwYXJhbWV0ZXIgdGhhdCBjYW4gYmUgcGFzc2VkIHRvXG4gKiBbalF1ZXJ5J3MgJCBmdW5jdGlvbl17QGxpbmsgaHR0cDovL2FwaS5qcXVlcnkuY29tL2pRdWVyeS99LiBCZSBhd2FyZSB0aGF0XG4gKiBpZiB0aGUgb2JqZWN0IChvciBBcnJheSBvciBOb2RlTGlzdCkgY29udGFpbnMgbXVsdGlwbGUgZWxlbWVudHMsIG9ubHkgdGhlXG4gKiBmaXJzdCB3aWxsIGJlIHVzZWQgd2hlbiBnZXR0aW5nIGluZm9ybWF0aW9uLlxuICpcbiAqIEB0eXBlZGVmIHtBcnJheXxFbGVtZW50fGpRdWVyeXxOb2RlTGlzdHxTdHJpbmd9IGpRdWVyeV9wYXJhbVxuICovXG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvdmFyaWFibGVzLmpzXG5cblxuLy8gQSBzaW1wbGUgY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGEgZ2xvYmFsIFByb3h5IGZ1bmN0aW9uIGFuZCBpdCdzIG5hdGl2ZS5cbi8vIEFsdGhvdWdoIHRoaXMgaXNuJ3QgZm9vbC1wcm9vZiwgaXQncyBhIGZhaXJseSByZWxpYWJsZSB3YXkgb2YgY2hlY2tpbmdcbi8vIHdoZXRoZXIgb3Igbm90IHRoZSBicm93c2VyIHN1cHBvcnRzIFByb3h5LlxudmFyIElTX1BST1hZX0FWQUlMQUJMRSA9IChcbiAgICB0eXBlb2Ygd2luZG93LlByb3h5ID09PSBcImZ1bmN0aW9uXCJcbiAgICAmJiB3aW5kb3cuUHJveHkudG9TdHJpbmcoKS5pbmRleE9mKFwiW25hdGl2ZSBjb2RlXVwiKSA+IC0xXG4pO1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2lkZW50aWZ5LmpzXG5cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGlkZW50aWZ5aW5nIHRoZSBnaXZlbiA8Y29kZT5yZWZlcmVuY2U8L2NvZGU+LiBUaGUgSUQgb2ZcbiAqIHRoZSBmaXJzdCBtYXRjaCBpcyByZXR1cm5lZCAtIHNlZVxuICogW2pRdWVyeSNpZGVudGlmeV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2lkZW50aWZ5fSBmb3IgZnVsbCBkZXRhaWxzLlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7alF1ZXJ5X3BhcmFtfSByZWZlcmVuY2VcbiAqICAgICAgICAgIEVsZW1lbnQgdG8gaWRlbnRpZnkuXG4gKiBAcmV0dXJuICB7U3RyaW5nfVxuICogICAgICAgICAgSUQgb2YgdGhlIGVsZW1lbnQuXG4gKi9cbnZhciBpZGVudGlmeSA9IGZ1bmN0aW9uIChyZWZlcmVuY2UpIHtcblxuICAgIHJldHVybiAkKHJlZmVyZW5jZSkuaWRlbnRpZnkoKTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9pZGVudGl0eS5qc1xuLyoqXG4gKiBBbiBpZGVudGl0eSBmdW5jdGlvbiB0aGF0IHNpbXBseSByZXR1cm5zIHdoYXRldmVyIGl0IGlzIGdpdmVuIHdpdGhvdXRcbiAqIG1vZGlmeWluZyBpdC4gVGhpcyBjYW4gYmUgdXNlZnVsIGZvciBjYXNlcyB3aGVuIGEgbW9kaWZpY2F0aW9uIGZ1bmN0aW9uIGlzXG4gKiBuZWVkZWQgYnV0IG9wdGlvbmFsLlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7P30geFxuICogICAgICAgICAgT2JqZWN0IHRvIHJldHVybi5cbiAqIEByZXR1cm4gIHs/fVxuICogICAgICAgICAgT3JpZ2luYWwgb2JqZWN0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpZGVudGl0eShcImFcIik7ICAgICAgICAgICAvLyAtPiBcImFcIlxuICogaWRlbnRpdHkoXCJhXCIsIFwiYlwiKTsgICAgICAvLyAtPiBcImFcIiwgb25seSBmaXJzdCBhcmd1bWVudCBpcyByZXR1cm5lZC5cbiAqIGlkZW50aXR5LmNhbGwoXCJiXCIsIFwiYVwiKTsgLy8gLT4gXCJhXCIsIGNvbnRleHQgaGFzIG5vIGVmZmVjdC5cbiAqL1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gKHgpIHtcblxuICAgIHJldHVybiB4O1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2ludGVycHJldFN0cmluZy5qc1xuLyoqXG4gKiBJbnRlcnByZXRzIHRoZSBnaXZlbiBvYmplY3QgYXMgYSBzdHJpbmcuIElmIHRoZSBvYmplY3QgaXMgPGNvZGU+bnVsbDwvY29kZT5cbiAqIG9yIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4sIGFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICAgez99IHN0cmluZ1xuICogICAgICAgICAgT2JqZWN0IHRvIGludGVycHJldC5cbiAqIEByZXR1cm4gIHtTdHJpbmd9XG4gKiAgICAgICAgICBJbnRlcnByZXRlZCBzdHJpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIGludGVycHJldFN0cmluZyhcIjFcIik7ICAgICAgIC8vIC0+IFwiMVwiXG4gKiBpbnRlcnByZXRTdHJpbmcoMSk7ICAgICAgICAgLy8gLT4gXCIxXCJcbiAqIGludGVycHJldFN0cmluZyhbMSwgMl0pOyAgICAvLyAtPiBcIjEsMlwiXG4gKiBpbnRlcnByZXRTdHJpbmcobnVsbCk7ICAgICAgLy8gLT4gXCJcIlxuICogaW50ZXJwcmV0U3RyaW5nKHVuZGVmaW5lZCk7IC8vIC0+IFwiXCJcbiAqIGludGVycHJldFN0cmluZygpOyAgICAgICAgICAvLyAtPiBcIlwiXG4gKi9cbnZhciBpbnRlcnByZXRTdHJpbmcgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG5cbiAgICByZXR1cm4gKHN0cmluZyA9PT0gbnVsbCB8fCBzdHJpbmcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgPyBcIlwiXG4gICAgICAgIDogU3RyaW5nKHN0cmluZyk7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvaXNFbGVtZW50LmpzXG4vKipcbiAqIFJldHVybnMgPGNvZGU+dHJ1ZTwvY29kZT4gaWYgdGhlIGdpdmVuIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIGFuIEhUTUxcbiAqIGVsZW1lbnQuXG4gKlxuICogQGdsb2JhbFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSAgIHs/fSBlbGVtZW50XG4gKiAgICAgICAgICBPYmplY3QgdG8gdGVzdC5cbiAqIEByZXR1cm4gIHtCb29sZWFufVxuICogICAgICAgICAgdHJ1ZSBpZiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBhbiBIVE1MRWxlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogaXNFbGVtZW50KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpOyAvLyAtPiB0cnVlXG4gKiBpc0VsZW1lbnQoZG9jdW1lbnQuYm9keSk7IC8vIC0+IHRydWVcbiAqIGlzRWxlbWVudChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKSk7IC8vIC0+IGZhbHNlXG4gKiBpc0VsZW1lbnQoJChcImJvZHlcIikpOyAvLyAtPiBmYWxzZVxuICogaXNFbGVtZW50KCQoXCJib2R5XCIpWzBdKTsgLy8gLT4gdHJ1ZVxuICovXG52YXIgaXNFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgIHJldHVybiAoL15cXFtvYmplY3RcXHNIVE1MW0EtWmEtel0rRWxlbWVudFxcXSQvKS50ZXN0KGVsZW1lbnQpO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL21lbW9pc2UuanNcblxuXG4vKipcbiAqIE1vZGlmaWVzIGEgZnVuY3Rpb24gc28gdGhhdCB0aGUgcmVzdWx0cyBhcmUgcmV0cmlldmVkIGZyb20gYSBjYWNoZSBpZlxuICogcG9zc2libGUgcmF0aGVyIHRoYW4gZnJvbSBleGVjdXRpbmcgdGhlIGZ1bmN0aW9uIGFnYWluLiBUaGUgY2FjaGUgaXMgcHVibGljbHlcbiAqIGV4cG9zZWQgKGFzIHRoZSBwcm9wZXJ0eSA8Y29kZT5jYWNoZTwvY29kZT4pIHRvIGFsbG93IGl0IHRvIGJlIGNsZWFyZWQsXG4gKiBmb3JjaW5nIHRoZSBmdW5jdGlvbiB0byByZS1leGVjdXRlLlxuICogPGJyPjxicj5cbiAqIElmIGRlZmluZWQsIHRoZSA8Y29kZT5yZXNvbHZlcjwvY29kZT4gaXMgcGFzc2VkIHRoZSBzYW1lIGFyZ3VtZW50cyBhcyB0aGVcbiAqIDxjb2RlPmhhbmRsZXI8L2NvZGU+OyBpdCBzaG91bGQgcmV0dXJuIGEgc3RyaW5nIGFuZCB0aGF0IHN0cmluZyB3aWxsIGJlIHVzZWRcbiAqIGFzIHRoZSBrZXkgZm9yIDxjb2RlPmNhY2hlPC9jb2RlPi4gSWYgYSA8Y29kZT5yZXNvbHZlcjwvY29kZT4gaXNuJ3QgZGVmaW5lZCxcbiAqIG9yIGlzbid0IGEgZnVuY3Rpb24sIHRoZSBhcmd1bWVudHMgYXJlIHNpbXBseSBqb2luZWQgdG9nZXRoZXIgYXMgYVxuICogY29tbWEtc2VwYXJhdGVkIHN0cmluZy5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBoYW5kbGVyXG4gKiAgICAgICAgICBGdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdXG4gKiAgICAgICAgICBPcHRpb25hbCBmdW5jdGlvbiBmb3Igd29ya2luZyBvdXQgdGhlIGtleSBmb3IgdGhlIGNhY2hlLlxuICogQHJldHVybiAge0Z1bmN0aW9ufVxuICogICAgICAgICAgQ29udmVydGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkJhc2ljIGV4YW1wbGU8L2NhcHRpb24+XG4gKiB2YXIgaW5jcmVhc2UgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gKiAgICAgY29uc29sZS5sb2cobnVtYmVyKTtcbiAqICAgICByZXR1cm4gbnVtYmVyICsgMTtcbiAqIH07XG4gKiB2YXIgbWVtSW5jcmVhc2UgPSBtZW1vaXNlKGluY3JlYXNlKTtcbiAqXG4gKiBtZW1JbmNyZWFzZSgxKTtcbiAqIC8vIExvZ3M6IDFcbiAqIC8vIC0+IDJcbiAqIG1lbUluY3JlYXNlKDEpOyAvLyAtPiAyXG4gKiBtZW1pbmNyZWFzZSgyKTtcbiAqIC8vIExvZ3M6IDJcbiAqIC8vIC0+IDNcbiAqIG1lbUluY3JlYXNlKDEpOyAvLyAtPiAxXG4gKiBtZW1JbmNyZWFzZS5jYWNoZTsgLy8gLT4ge1wiMVwiOiAyLCBcIjJcIjogM31cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TcGVjaWZ5aW5nIGEgcmVzb2x2ZXI8L2NhcHRpb24+XG4gKiB2YXIgc3VtID0gZnVuY3Rpb24gKG51bWJlcnMpIHtcbiAqICAgICByZXR1cm4gbnVtYmVycy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcbiAqICAgICAgICAgcmV0dXJuIHByZXYgKyBjdXJyO1xuICogICAgIH0sIDApO1xuICogfTtcbiAqIHZhciBtZW1TdW0gPSBtZW1vaXNlKHN1bSwgZnVuY3Rpb24gKG51bWJlcnMpIHtcbiAqICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkobnVtYmVycyk7XG4gKiB9KTtcbiAqIG1lbVN1bShbMSwgMiwgM10pOyAvLyAtPiA2XG4gKiBtZW1TdW0uY2FjaGU7IC8vIC0+IHtcIlsxLDIsM11cIjogNn1cbiAqL1xudmFyIG1lbW9pc2UgPSBmdW5jdGlvbiAoaGFuZGxlciwgcmVzb2x2ZXIpIHtcblxuICAgIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICB2YXIgbWVtb2lzZWQgPSBmdW5jdGlvbiBtZW0oKSB7XG5cbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciBrZXkgPSB0eXBlb2YgcmVzb2x2ZXIgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyByZXNvbHZlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpXG4gICAgICAgICAgICA6IGFyZ3Muam9pbihcIixcIik7XG4gICAgICAgIHZhciByZXNwb25zZSA9IG1lbS5jYWNoZVtrZXldO1xuY29uc29sZS5sb2coXCJtZW1vaXNlKCkga2V5ID0gXCIgKyBrZXkgKyBcIiBhbmQgcmVzcG9uc2UgPSBcIiArIChyZXNwb25zZSA9PT0gdW5kZWZpbmVkID8gXCIodW5kZWZpbmVkKVwiIDogcmVzcG9uc2UpKTtcbiAgICAgICAgaWYgKCFoYXNPd24uY2FsbChtZW0uY2FjaGUsIGtleSkpIHtcblxuICAgICAgICAgICAgcmVzcG9uc2UgPSBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgbWVtLmNhY2hlW2tleV0gPSByZXNwb25zZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuXG4gICAgfTtcblxuICAgIG1lbW9pc2VkLmNhY2hlID0ge307XG5cbiAgICByZXR1cm4gbWVtb2lzZWQ7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvbm9ybWFsaXNlLmpzXG5cblxuLyoqXG4gKiBOb3JtYWxpc2VzIGEgV0FJLUFSSUEgYXR0cmlidXRlIG5hbWUgc28gdGhhdCBpdCdzIGFsd2F5cyBsb3dlciBjYXNlIGFuZFxuICogYWx3YXlzIHN0YXJzIHdpdGggPGNvZGU+YXJpYS08L2NvZGU+LiBJZiB0aGUgdW5wcmVmaXhlZCB2YWx1ZSBhcHBlYXJzIGluXG4gKiBbalF1ZXJ5LmFyaWFGaXhde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5hcmlhRml4fSB0aGVuIHRoZSBtYXBwZWQgdmVyc2lvbiBpc1xuICogdXNlZCBiZWZvcmUgYmVpbmcgcHJlZml4ZWQuXG4gKiA8YnI+PGJyPlxuICogVGhlIHJlc3VsdHMgb2YgdGhpcyBmdW5jdGlvbiBhcmUgY2FjaGVkIHRvIGhlbHAgcmVkdWNlIHByb2Nlc3NpbmcuIFRoaXMgaXNcbiAqIGV4cG9zZWQgYXMgPGNvZGU+alF1ZXJ5Lm5vcm1hbGlzZUFyaWEuY2FjaGU8L2NvZGU+IGlmIG5lZWRlZCBidXQgdGhlcmUgaXMgbm9cbiAqIG5lZWQgdG8gY2xlYXIgdGhlIGNhY2hlIGFmdGVyIG1vZGlmeWluZ1xuICogW2pRdWVyeS5hcmlhRml4XXtAbGluayBleHRlcm5hbDpqUXVlcnkuYXJpYUZpeH0gLSBjaGFuZ2VzIGFyZSBhdXRvbWF0aWNhbGx5XG4gKiBjb25zaWRlcmVkIGluIHRoZSBjYWNoaW5nIHByb2Nlc3MuXG4gKiA8YnI+PGJyPlxuICogVGhpcyBmdW5jdGlvbiBpcyBhbGlhc2VkIGFzXG4gKiBbalF1ZXJ5Lm5vcm1hbGl6ZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpemVBcmlhfS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBhbGlhcyAgICBleHRlcm5hbDpqUXVlcnkubm9ybWFsaXNlQXJpYVxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQHBhcmFtICAgIHtTdHJpbmd9IG5hbWVcbiAqICAgICAgICAgICBBdHRyaWJ1dGUgbmFtZSB0byBub3JtYWxpc2UuXG4gKiBAcmV0dXJuICAge1N0cmluZ31cbiAqICAgICAgICAgICBOb3JtYWxpc2VkIGF0dHJpYnV0ZSBuYW1lLlxuICogQHByb3BlcnR5IHtPYmplY3QuPFN0cmluZz59IGNhY2hlXG4gKiAgICAgICAgICAgVGhlIGNhY2hlIG9mIHJlcXVlc3RzIHRvIHJlc3BvbnNlcy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5CYXNpYyBleGFtcGxlPC9jYXB0aW9uPlxuICogJC5ub3JtYWxpc2VBcmlhKFwibGFiZWxcIik7ICAgICAgLy8gLT4gXCJhcmlhLWxhYmVsXCJcbiAqICQubm9ybWFsaXNlQXJpYShcIkxBQkVMXCIpOyAgICAgIC8vIC0+IFwiYXJpYS1sYWJlbFwiXG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJhcmlhLWxhYmVsXCIpOyAvLyAtPiBcImFyaWEtbGFiZWxcIlxuICogJC5ub3JtYWxpc2VBcmlhKCk7ICAgICAgICAgICAgIC8vIC0+IFwiYXJpYS1cIlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFsaWFzPC9jYXB0aW9uPlxuICogJC5ub3JtYWxpemVBcmlhKFwibGFiZWxcIik7ICAgICAgLy8gLT4gXCJhcmlhLWxhYmVsXCJcbiAqICQubm9ybWFsaXplQXJpYShcIkxBQkVMXCIpOyAgICAgIC8vIC0+IFwiYXJpYS1sYWJlbFwiXG4gKiAkLm5vcm1hbGl6ZUFyaWEoXCJhcmlhLWxhYmVsXCIpOyAvLyAtPiBcImFyaWEtbGFiZWxcIlxuICogJC5ub3JtYWxpemVBcmlhKCk7ICAgICAgICAgICAgIC8vIC0+IFwiYXJpYS1cIlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPk1hcHBlZCBhdHRyaWJ1dGU8L2NhcHRpb24+XG4gKiAvLyAkLmFyaWFGaXggPSB7bGFiZWxlZGJ5OiBcImxhYmVsbGVkYnlcIn1cbiAqICQubm9ybWFsaXNlQXJpYShcImxhYmVsZWRieVwiKTsgICAgICAvLyAtPiBcImFyaWEtbGFiZWxsZWRieVwiXG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJMQUJFTEVEQllcIik7ICAgICAgLy8gLT4gXCJhcmlhLWxhYmVsbGVkYnlcIlxuICogJC5ub3JtYWxpc2VBcmlhKFwiYXJpYS1sYWJlbGVkYnlcIik7IC8vIC0+IFwiYXJpYS1sYWJlbGxlZGJ5XCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5UaGUgY2FjaGU8L2NhcHRpb24+XG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJidXN5XCIpOyAgICAvLyAtPiBcImFyaWEtYnVzeVwiXG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJidXN5XCIpOyAgICAvLyAtPiBcImFyaWEtYnVzeVwiIChmcm9tIGNhY2hlKVxuICogJC5ub3JtYWxpc2VBcmlhKFwiY2hlY2tlZFwiKTsgLy8gLT4gXCJhcmlhLWNoZWNrZWRcIlxuICogJC5ub3JtYWxpc2VBcmlhKFwiYnVzeVwiKTsgICAgLy8gLT4gXCJhcmlhLWJ1c3lcIiAoZnJvbSBjYWNoZSlcbiAqICQubm9ybWFsaXNlQXJpYS5jYWNoZTtcbiAqIC8vIC0+IHtcImJ1c3lcIjogXCJhcmlhLWJ1c3lcIiwgXCJjaGVja2VkXCI6IFwiYXJpYS1jaGVja2VkXCJ9XG4gKi9cbnZhciBub3JtYWxpc2UgPSBtZW1vaXNlKFxuICAgIGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgdmFyIHByZWZpeCA9IFwiYXJpYS1cIjtcbiAgICAgICAgdmFyIGxvd2VyID0gaW50ZXJwcmV0U3RyaW5nKG5hbWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBmdWxsID0gc3RhcnRzV2l0aC5jYWxsKGxvd2VyLCBwcmVmaXgpXG4gICAgICAgICAgICA/IGxvd2VyXG4gICAgICAgICAgICA6IHByZWZpeCArIGxvd2VyO1xuICAgICAgICB2YXIgc3RlbSA9IGZ1bGwuc2xpY2UocHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIHZhciBtYXAgPSAkLmFyaWFGaXhbc3RlbV07XG5cbiAgICAgICAgaWYgKG1hcCkge1xuXG4gICAgICAgICAgICBzdGVtID0gbWFwO1xuICAgICAgICAgICAgZnVsbCA9IHByZWZpeCArIHN0ZW07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdWxsO1xuXG4gICAgfSxcbiAgICBJU19QUk9YWV9BVkFJTEFCTEVcbiAgICAgICAgPyBpZGVudGl0eVxuICAgICAgICA6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBuYW1lICsgXCJ8XCIgKyBKU09OLnN0cmluZ2lmeSgkLmFyaWFGaXgpO1xuXG4gICAgICAgIH1cbik7XG5cbi8vIFNvdXJjZTogL3NyYy9nbG9iYWwvc3RhcnRzV2l0aC5qc1xuXG5cbi8qKlxuICogQSBmYWxsYmFjayBmb3Igb2xkZXIgYnJvd3NlcnMgdGhhdCBkbyBub3QgdW5kZXJzdGFuZFxuICogW1N0cmluZyNzdGFydHNXaXRoXXtAbGluayBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TdHJpbmcvc3RhcnRzV2l0aH1cbiAqIHdpdGhvdXQgbW9kaWZpeWluZyA8Y29kZT5TdHJpbmcucHJvdG90eXBlPC9jb2RlPiB1bm5lY2Vzc2FyaWx5LlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSAgICB7U3RyaW5nfSB0ZXh0XG4gKiAgICAgICAgICAgU3RyaW5nIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0gICAge051bWJlcn0gW29mZnNldD0wXVxuICogICAgICAgICAgIE9mZnNldCBmcm9tIHdoaWNoIHRvIHN0YXJ0LlxuICogQHJldHVybiAgIHtCb29sZWFufVxuICogICAgICAgICAgIFRydWUgaWYgdGhlIHN0cmluZyBzdGFydHMgd2l0aCA8Y29kZT50ZXh0PC9jb2RlPiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBzdGFydHNXaXRoLmNhbGwoXCJhYmNkZWZcIiwgXCJhYmNcIik7IC8vIC0+IHRydWVcbiAqL1xudmFyIHN0YXJ0c1dpdGggPSBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggfHwgZnVuY3Rpb24gKHRleHQsIG9mZnNldCkge1xuXG4gICAgcmV0dXJuIHRoaXMuaW5kZXhPZih0ZXh0LCBvZmZzZXQpID09PSAwO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL3RvV29yZHMuanNcblxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiBzdHJpbmcgaW50byBhbiBhcnJheSBvZiB0aGUgd29yZHMuIFRoZSA8Y29kZT5zdHJpbmc8L2NvZGU+XG4gKiBhcmd1bWVudCBpcyBjb252ZXJ0ZWQgaW50byBhIHN0cmluZyBiZWZvcmUgYmVpbmcgc3BsaXQgLSBzZWVcbiAqIHtAbGluayBpbnRlcnByZXRTdHJpbmd9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBnbG9iYWxcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBzdHJpbmdcbiAqICAgICAgICAgIFN0cmluZyAob3Igb3RoZXIgdmFyaWFibGUgdHlwZSkgdG8gYnJlYWsgaW50byB3b3Jkcy5cbiAqIEByZXR1cm4gIHtBcnJheS48U3RyaW5nPn1cbiAqICAgICAgICAgIFdvcmRzIGZyb20gdGhlIHN0cmluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogdG9Xb3JkcyhcImFiYyBkZWZcIik7ICAvLyAtPiBbXCJhYmNcIiwgXCJkZWZcIl1cbiAqIHRvV29yZHMoXCJhYmMgIGRlZlwiKTsgLy8gLT4gW1wiYWJjXCIsIFwiZGVmXCJdXG4gKiB0b1dvcmRzKFwiXCIpICAgICAgICAgIC8vIC0+IFtdXG4gKiB0b1dvcmRzKFwiICAgXCIpOyAgICAgIC8vIC0+IFtdXG4gKi9cbnZhciB0b1dvcmRzID0gZnVuY3Rpb24gKHN0cmluZykge1xuXG4gICAgcmV0dXJuIGludGVycHJldFN0cmluZyhzdHJpbmcpLnNwbGl0KC9cXHMrLykuZmlsdGVyKGlkZW50aXR5KTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9oYW5kbGVycy5qc1xudmFyIEhBTkRMRVJfUFJPUEVSVFkgPSBcInByb3BlcnR5XCI7XG52YXIgSEFORExFUl9SRUZFUkVOQ0UgPSBcInJlZmVyZW5jZVwiO1xudmFyIEhBTkRMRVJfU1RBVEUgPSBcInN0YXRlXCI7XG5cbi8qKlxuICogSGFuZGxlcnMgZm9yIHByb3BlcnRpZXMsIHJlZmVyZW5jZXMgYW5kIHN0YXRlcy4gRWFjaCBoYW5kbGVyIGhhcyBhdCBsZWFzdCBhXG4gKiA8Y29kZT5nZXQ8L2NvZGU+IGFuZCA8Y29kZT5zZXQ8L2NvZGU+IG1ldGhvZCB0byB3cml0ZSBhbmQgcmVhZCB0aGUgdmFsdWVzLlxuICogPGNvZGU+aGFzPC9jb2RlPiBtZXRob2RzIGNoZWNrIHdoZXRoZXIgdGhlIHByb3BlcnR5IGV4aXN0cyxcbiAqIDxjb2RlPnVuc2V0PC9jb2RlPiByZW1vdmVzIHRoZSBwcm9wZXJ0eS5cbiAqXG4gKiB7QGxpbmsgaGFuZGxlcnMucmVmZXJlbmNlfSBhbmQge0BsaW5rIGhhbmRsZXJzLnN0YXRlfSBkZWZlciB0b1xuICoge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5fSAodGhleSBkb24ndCBpbmhlcml0IGZyb20ge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5fVxuICogYnV0IHRoZXkgbWF5IGRvIGluIGFub3RoZXIgaW1wbGVtZW50YXRpb24gLSBhbnkgZnVuY3Rpb25hbGl0eSB0aGV5IGRvbid0IGhhdmVcbiAqIHdpbGwgYmUgdGFrZW4gZnJvbSB7QGxpbmsgaGFuZGxlcnMucHJvcGVydHl9KS5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAbmFtZXNwYWNlXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaGFuZGxlcnMgPSB7fTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9oYW5kbGVycy9wcm9wZXJ0eS5qc1xuXG5cbi8qKlxuICogSGFuZGxlcyBXQUktQVJJQSBwcm9wZXJ0aWVzIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSB2YWx1ZXMgYW55IG1vcmUgdGhhbiBpdFxuICogbmVlZHMgdG8uIFRoZXNlIG1ldGhvZHMgYWxzbyBhY3QgYXMgdGhlIGZhbGxiYWNrIGZvciBvdGhlciBuYW1lc3BhY2VzIHN1Y2ggYXNcbiAqIHtAbGluayBoYW5kbGVycy5yZWZlcmVuY2V9IGFuZCB7QGxpbmsgaGFuZGxlcnMuc3RhdGV9LlxuICogPGJyPntAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5wYXJzZX0gcGFyc2VzIHRoZSBhdHRyaWJ1dGUgbmFtZS5cbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucHJvcGVydHkuZ2V0fSBnZXRzIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkuXG4gKiA8YnI+e0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5LnNldH0gc2V0cyBhIHByb3BlcnR5LlxuICogPGJyPntAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5oYXN9IGNoZWNrcyB0byBzZWUgaWYgdGhlIHByb3BlcnR5IGV4aXN0cy5cbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucHJvcGVydHkudW5zZXR9IHJlbW92ZXMgdGhlIHByb3BlcnR5LlxuICpcbiAqIEBhbGlhcyAgICAgcHJvcGVydHlcbiAqIEBtZW1iZXJvZiAgaGFuZGxlcnNcbiAqIEBuYW1lc3BhY2VcbiAqIEBwcml2YXRlXG4gKi9cbmhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldID0ge1xuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHRoZSBuYW1lIGFuZCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIHRoZSBub3JtYWxpc2VkIG5hbWUgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9IGFuZCB0aGVcbiAgICAgKiB1bi1wcmVmaXhlZCBhdHRyaWJ1dGUgbmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxuICAgICAqICAgICAgICAgQXR0cmlidXRlIG5hbWUgdG8gcGFyc2UuXG4gICAgICogQHJldHVybiB7T2JqZWN0LjxTdHJpbmc+fVxuICAgICAqICAgICAgICAgQW4gb2JqZWN0IHdpdGggXCJmdWxsXCIgYW5kIFwic3RlbVwiIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LnBhcnNlKFwiYnVzeVwiKTtcbiAgICAgKiAvLyAtPiB7ZnVsbDogXCJhcmlhLWJ1c3lcIiwgc3RlbTogXCJidXN5XCJ9XG4gICAgICovXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICAgICAgdmFyIG5vcm1hbCA9IG5vcm1hbGlzZShuYW1lKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZnVsbDogbm9ybWFsLFxuICAgICAgICAgICAgc3RlbTogbm9ybWFsLnNsaWNlKDUpXG4gICAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvcGVydHkgb2YgYW4gZWxlbWVudC4gVGhlIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyB1bmNoYW5nZWRcbiAgICAgKiAob3RoZXIgdGhhbiBub3JtYWwgc3RyaW5nIGNvZXJjaW9uKSBhbmQgdGhlIDxjb2RlPm5hbWU8L2NvZGU+IGlzXG4gICAgICogbm9ybWFsaXNlZCBpbnRvIGEgV0FJLUFSSUEgcHJvcGVydHkgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAgICAgKiA8YnI+PGJyPlxuICAgICAqIElmIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIG5vdCBhbiBlbGVtZW50IChzZWUge0BsaW5rIGlzRWxlbWVudH0pIHRoZW4gbm9cbiAgICAgKiBhY3Rpb24gd2lsbCBiZSB0YWtlbi5cbiAgICAgKiA8YnI+PGJyPlxuICAgICAqIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyBhIGZ1bmN0aW9uLCBpdCBpcyB0cmVhdGVkIGxpa2UgYW5cbiAgICAgKiB7QGxpbmsgQXR0cmlidXRlX2NhbGxiYWNrfS4gVGhpcyBpcyBmb3IgY29uc2lzdGVuY3kgd2l0aFxuICAgICAqIFtqUXVlcnkjYXR0cl17QGxpbmsgaHR0cDovL2FwaS5qcXVlcnkuY29tL2F0dHIvfS5cbiAgICAgKiA8YnI+PGJyPlxuICAgICAqIEEgPGNvZGU+Y29udmVydDwvY29kZT4gZnVuY3Rpb24gY2FuIGFsc28gYmUgcGFzc2VkLiBUaGF0IGZ1bmN0aW9uIHdpbGxcbiAgICAgKiBjb252ZXJ0IDxjb2RlPnZhbHVlPC9jb2RlPiAoaWYgPGNvZGU+dmFsdWU8L2NvZGU+IGlzIGEgZnVuY3Rpb24sXG4gICAgICogPGNvZGU+Y29udmVydDwvY29kZT4gd2lsbCBjb252ZXJ0IHRoZSByZXN1bHQpIGJlZm9yZSBhc3NpZ25pbmcgaXQuIElmXG4gICAgICogPGNvZGU+Y29udmVydDwvY29kZT4gaXMgb21taXR0ZWQgb3Igbm90IGEgZnVuY3Rpb24gdGhlbiB7QGxpbmsgaWRlbnRpdHl9XG4gICAgICogaXMgdXNlZCBzbyA8Y29kZT52YWx1ZTwvY29kZT4gd2lsbCBub3QgYmUgY2hhbmdlZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICAge0VsZW1lbnR9ICBlbGVtZW50XG4gICAgICogICAgICAgICAgRWxlbWVudCB0byBoYXZlIGEgcHJvcGVydHkgc2V0LlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgbmFtZVxuICAgICAqICAgICAgICAgIFdBSS1BUklBIHByb3BlcnR5IHRvIHNldC5cbiAgICAgKiBAcGFyYW0gICB7P30gICAgICAgIHZhbHVlXG4gICAgICogICAgICAgICAgVmFsdWUgb2YgdGhlIHByb3BlcnR5LlxuICAgICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICAgW2luZGV4XVxuICAgICAqICAgICAgICAgIE9wdGlvbmFsIGluZGV4IG9mIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IHdpdGhpbiB0aGUgalF1ZXJ5IG9iamVjdC5cbiAgICAgKiAgICAgICAgICBUaGlzIGlzIG5lZWRlZCB0byBrZWVwIGNvbnNpc3RlbmN5IHdpdGggdGhlXG4gICAgICogICAgICAgICAgW2pRdWVyeSNhdHRyXXtAbGluayBodHRwOi8vYXBpLmpxdWVyeS5jb20vYXR0ci99IGZ1bmN0aW9uIGFuZFxuICAgICAqICAgICAgICAgIHNob3VsZCBiZSBkZXJpdmVkIHJhdGhlciB0aGFuIG1hbnVhbGx5IHBhc3NlZC5cbiAgICAgKiBAcGFyYW0gICB7RnVuY3Rpb259IFtjb252ZXJ0PWlkZW50aXR5XVxuICAgICAqICAgICAgICAgIE9wdGlvbmFsIGNvbnZlcnNpb24gcHJvY2Vzcy4gSWYgb21taXR0ZWQsIG5vIGNvbnZlcnNpb24gb2NjdXJzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgPGNhcHRpb24+U2V0dGluZyBhIHByb3BlcnR5PC9jYXB0aW9uPlxuICAgICAqIC8vIE1hcmt1cCBpczpcbiAgICAgKiAvLyA8ZGl2IGlkPVwib25lXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LnNldChlbGVtZW50LCBcImxhYmVsXCIsIFwidGVzdFwiKTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJ0ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIGEgcHJvcGVydHkgdXNpbmcgYSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAgICAgKiAvLyBNYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJ0ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LnNldChlbGVtZW50LCBcImxhYmVsXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gICAgICogICAgIHJldHVybiB0aGlzLmlkICsgXCJfX1wiICsgaSArIFwiX19cIiArIGF0dHI7XG4gICAgICogfSwgMCk7XG4gICAgICpcbiAgICAgKiAvLyBOb3cgbWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwib25lX18wX190ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0aW5nIHRoZSByZXN1bHQ8L2NhcHRpb24+XG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICAgICAqXG4gICAgICogdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uZVwiKTtcbiAgICAgKiBoYW5kbGVycy5wcm9wZXJ0eS5zZXQoZWxlbWVudCwgXCJsYWJlbFwiLCBmdW5jdGlvbiAoaSwgYXR0cikge1xuICAgICAqICAgICByZXR1cm4gdGhpcy5pZCArIFwiX19cIiArIGkgKyBcIl9fXCIgKyBhdHRyO1xuICAgICAqIH0sIDAsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAqICAgICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJPTkVfXzBfX1RFU1RcIj48L2Rpdj5cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lLCB2YWx1ZSwgaW5kZXgsIGNvbnZlcnQpIHtcblxuICAgICAgICB2YXIgcHJvcCA9IGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldLnBhcnNlKG5hbWUpO1xuICAgICAgICB2YXIgaG9vayA9ICQuYXJpYUhvb2tzW3Byb3Auc3RlbV07XG5cbiAgICAgICAgaWYgKGlzRWxlbWVudChlbGVtZW50KSkge1xuXG4gICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKHZhbHVlKSkge1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5jYWxsKFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5nZXRBdHRyaWJ1dGUocHJvcC5mdWxsKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCEkLmlzRnVuY3Rpb24oY29udmVydCkpIHtcbiAgICAgICAgICAgICAgICBjb252ZXJ0ID0gaWRlbnRpdHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoaG9vayAmJiBob29rLnNldCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGhvb2suc2V0KGVsZW1lbnQsIHZhbHVlLCBwcm9wLmZ1bGwpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gY29udmVydCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wLmZ1bGwsIGludGVycHJldFN0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdG8gc2VlIGlmIHRoZSBnaXZlbiA8Y29kZT5uYW1lPC9jb2RlPiBleGlzdHMgb24gdGhlIGdpdmVuXG4gICAgICogPGNvZGU+ZWxlbWVudDwvY29kZT4uIFRoZSA8Y29kZT5uYW1lPC9jb2RlPiBpcyBhbHdheXMgbm9ybWFsaXNlZCAoc2VlXG4gICAgICogW2pRdWVyeS5ub3JtYWxpc2VBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkubm9ybWFsaXNlQXJpYX0pIGFuZCBpZlxuICAgICAqIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIG5vdCBhbiBlbGVtZW50IChzZWUge0BsaW5rIGlzRWxlbWVudH0pIHRoZW5cbiAgICAgKiA8Y29kZT5mYWxzZTwvY29kZT4gd2lsbCBhbHdheXMgYmUgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAgIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogICAgICAgICAgRWxlbWVudCB0byB0ZXN0LlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgcHJvcGVydHkgdG8gY2hlY2suXG4gICAgICogQHJldHVybiAge0Jvb2xlYW59XG4gICAgICogICAgICAgICAgV2hldGhlciBvciBub3QgdGhlIGVsZW1lbnQgaGFzIHRoZSBnaXZlbiBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICAgICAqXG4gICAgICogdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uZVwiKTtcbiAgICAgKiBoYW5kbGVycy5wcm9wZXJ0eS5oYXMoZWxlbWVudCwgXCJsYWJlbFwiKTsgLy8gLT4gdHJ1ZVxuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LmhhcyhlbGVtZW50LCBcImJ1c3lcIik7ICAvLyAtPiBmYWxzZVxuICAgICAqL1xuICAgIGhhczogZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUpIHtcblxuICAgICAgICB2YXIgcHJvcCA9IGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldLnBhcnNlKG5hbWUpO1xuICAgICAgICB2YXIgaG9vayA9ICQuYXJpYUhvb2tzW3Byb3Auc3RlbV07XG5cbiAgICAgICAgcmV0dXJuIGlzRWxlbWVudChlbGVtZW50KVxuICAgICAgICAgICAgPyAoaG9vayAmJiBob29rLmhhcylcbiAgICAgICAgICAgICAgICA/IGhvb2suaGFzKGVsZW1lbnQsIHByb3AuZnVsbClcbiAgICAgICAgICAgICAgICA6IGVsZW1lbnQuaGFzQXR0cmlidXRlKHByb3AuZnVsbClcbiAgICAgICAgICAgIDogZmFsc2U7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgb2YgdGhlIFdBSS1BUklBIHByb3BlcnR5IGZyb20gdGhlIGdpdmVuXG4gICAgICogPGNvZGU+ZWxlbWVudDwvY29kZT4gYW5kIHJldHVybnMgaXQgdW5jaGFuZ2VkLiBUaGUgPGNvZGU+bmFtZTwvY29kZT4gaXNcbiAgICAgKiBub3JtYWxpc2VkIChzZWVcbiAgICAgKiBbalF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSkuIElmXG4gICAgICogPGNvZGU+ZWxlbWVudDwvY29kZT4gaXMgbm90IGFuIGVsZW1lbnQgKHNlZSB7QGxpbmsgaXNFbGVtZW50fSkgb3JcbiAgICAgKiA8Y29kZT5uYW1lPC9jb2RlPiBpcyBub3QgcmVjb2duaXNlZCAoc2VlXG4gICAgICoge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5Lmhhc30pIHRoZW4gPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpcyByZXR1cm5lZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICAge0VsZW1lbnR9ICAgICAgICAgIGVsZW1lbnRcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIGFjY2Vzcy5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgICAgbmFtZVxuICAgICAqICAgICAgICAgIFdBSS1BUklBIHByb3BlcnR5IHRvIGFjY2Vzcy5cbiAgICAgKiBAcmV0dXJuICB7U3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKiAgICAgICAgICBXQUktQVJJQSBhdHRyaWJ1dGUgb3IgdW5kZWZpbmVkIGlmIHRoZSBhdHRyaWJ1dGUgaXNuJ3Qgc2V0LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBNYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtbGFiZWw9XCJ0ZXN0XCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LmdldChlbGVtZW50LCBcImxhYmVsXCIpOyAvLyAtPiBcInRlc3RcIlxuICAgICAqIGhhbmRsZXJzLnByb3BlcnR5LmdldChlbGVtZW50LCBcImJ1c3lcIik7IC8vIC0+IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIGdldDogZnVuY3Rpb24gKGVsZW1lbnQsIG5hbWUpIHtcblxuICAgICAgICB2YXIgaGFuZGxlciA9IGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldO1xuICAgICAgICB2YXIgcHJvcCA9IGhhbmRsZXIucGFyc2UobmFtZSk7XG4gICAgICAgIHZhciBob29rID0gJC5hcmlhSG9va3NbcHJvcC5zdGVtXTtcbiAgICAgICAgdmFyIHJlc3BvbnNlID0gaGFuZGxlci5oYXMoZWxlbWVudCwgbmFtZSlcbiAgICAgICAgICAgID8gKGhvb2sgJiYgaG9vay5nZXQpXG4gICAgICAgICAgICAgICAgPyBob29rLmdldChlbGVtZW50LCBwcm9wLmZ1bGwpXG4gICAgICAgICAgICAgICAgOiBlbGVtZW50LmdldEF0dHJpYnV0ZShwcm9wLmZ1bGwpXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBnZXRBdHRyaWJ1dGUgY2FuIHJldHVybiBudWxsLCBub3JtYWxpc2UgdG8gdW5kZWZpbmVkLlxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgPT09IG51bGxcbiAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICA6IHJlc3BvbnNlO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBXQUktQVJJQSBhdHRyaWJ1dGUgZnJvbSB0aGUgZ2l2ZW4gPGNvZGU+ZWxlbWVudDwvY29kZT4uIFRoZVxuICAgICAqIDxjb2RlPm5hbWU8L2NvZGU+IGlmIG5vcm1hbGlzZWQgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KSBhbmQgaWZcbiAgICAgKiA8Y29kZT5lbGVtZW50PC9jb2RlPiBpcyBub3QgYW4gZWxlbWVudCAoc2VlIHtAbGluayBpc0VsZW1lbnR9KSB0aGVuIG5vXG4gICAgICogYWN0aW9uIGlzIHRha2VuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gICB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqICAgICAgICAgIEVsZW1lbnQgdG8gbW9kaWZ5LlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgYXR0cmlidXRlIHRvIHJlbW92ZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICAgICAqXG4gICAgICogdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9uZVwiKTtcbiAgICAgKiBoYW5kbGVycy5wcm9wZXJ0eS51bnNldChlbGVtZW50LCBcImxhYmVsXCIpO1xuICAgICAqXG4gICAgICogLy8gTm93IG1hcmt1cCBpczpcbiAgICAgKiAvLyA8ZGl2IGlkPVwib25lXCI+PC9kaXY+XG4gICAgICovXG4gICAgdW5zZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lKSB7XG5cbiAgICAgICAgdmFyIHByb3AgPSBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXS5wYXJzZShuYW1lKTtcbiAgICAgICAgdmFyIGhvb2sgPSAkLmFyaWFIb29rc1twcm9wLnN0ZW1dO1xuXG4gICAgICAgIGlmIChpc0VsZW1lbnQoZWxlbWVudCkpIHtcblxuICAgICAgICAgICAgaWYgKCFob29rIHx8ICFob29rLnVuc2V0IHx8IGhvb2sudW5zZXQoZWxlbWVudCwgcHJvcC5mdWxsKSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKHByb3AuZnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2hhbmRsZXJzL3JlZmVyZW5jZS5qc1xuXG5cbi8qKlxuICogSGFuZGxlcyBtb2RpZnlpbmcgV0FJLUFSSUEgcmVmZXJlbmNlcy4gVW5saWtlIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eX0sIHRoaXNcbiAqIHdpbGwgY3JlYXRlIHJlZmVyZW5jZXMgdG8gZWxlbWVudHMgYW5kIHJldHVybiB0aGVtLiBUaGUgb25seSBkZWZpbmVkIG1ldGhvZHNcbiAqIGFyZTpcbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucmVmZXJlbmNlLnNldH0gc2V0cyBhIHJlZmVyZW5jZS5cbiAqIDxicj57QGxpbmsgaGFuZGxlcnMucmVmZXJlbmNlLmdldH0gZ2V0cyBhIHJlZmVyZW5jZS5cbiAqXG4gKiBAYWxpYXMgICAgIHJlZmVyZW5jZVxuICogQG1lbWJlcm9mICBoYW5kbGVyc1xuICogQG5hbWVzcGFjZVxuICogQHByaXZhdGVcbiAqL1xuaGFuZGxlcnNbSEFORExFUl9SRUZFUkVOQ0VdID0ge1xuXG4gICAgLyoqXG4gICAgICogQWRkcyB0aGUgV0FJLUFSSUEgcmVmZXJlbmNlIHRvIDxjb2RlPmVsZW1lbnQ8L2NvZGU+LiBUaGlzIGRpZmZlcnMgZnJvbVxuICAgICAqIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5zZXR9IGluIHRoYXQgPGNvZGU+cmVmZXJlbmNlPC9jb2RlPiBpcyBwYXNzZWRcbiAgICAgKiB0aHJvdWdoIFtqUXVlcnkncyAkIGZ1bmN0aW9uXXtAbGluayBodHRwOi8vYXBpLmpxdWVyeS5jb20vanF1ZXJ5L30gYW5kXG4gICAgICogaWRlbnRpZmllZCAoc2VlIFtqUXVlcnkjaWRlbnRpZnlde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNpZGVudGlmeX0pIHdpdGhcbiAgICAgKiB0aGUgSUQgb2YgdGhlIGZpcnN0IG1hdGNoIGJlaW5nIHVzZWQuIFRoZXJlIGlzIGFsc28gbm9cbiAgICAgKiA8Y29kZT5jb252ZXJ0PC9jb2RlPiBwYXJhbWV0ZXIuXG4gICAgICogPGJyPjxicj5cbiAgICAgKiBUaGUgPGNvZGU+bmFtZTwvY29kZT4gaXMgc3RpbGwgbm9ybWFsaXNlZCAoc2VlXG4gICAgICogW2pRdWVyeS5ub3JtYWxpc2VBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkubm9ybWFsaXNlQXJpYX0pLiBJZlxuICAgICAqIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IGlzIG5vdCBhbiBlbGVtZW50IChzZWUge0BsaW5rIGlzRWxlbWVudH0pIHRoZW4gbm9cbiAgICAgKiBhY3Rpb24gaXMgdGFrZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAgIHtFbGVtZW50fSAgICAgIGVsZW1lbnRcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIG1vZGlmeS5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgYXR0cmlidXRlIHRvIHNldC5cbiAgICAgKiBAcGFyYW0gICB7alF1ZXJ5X3BhcmFtfSByZWZlcmVuY2VcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIHJlZmVyZW5jZS5cbiAgICAgKiBAcGFyYW0gICB7TnVtYmVyfSAgICAgICBpbmRleFxuICAgICAqICAgICAgICAgIEluZGV4IG9mIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IHdpdGhpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnJlZmVyZW5jZS5zZXQoZWxlbWVudCwgXCJsYWJlbGxlZGJ5XCIsIFwiLnR3b1wiKTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIGFyaWE9bGFiZWxsZWRieT1cImFub255bW91czBcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCIgaWQ9XCJhbm9ueW1vdXMwXCI+PC9kaXY+XG4gICAgICovXG4gICAgc2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSwgcmVmZXJlbmNlLCBpbmRleCkge1xuXG4gICAgICAgIGhhbmRsZXJzW0hBTkRMRVJfUFJPUEVSVFldLnNldChcbiAgICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgcmVmZXJlbmNlLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBpZGVudGlmeVxuICAgICAgICApO1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJlZmVyZW5jZSBmcm9tIHRoZSBnaXZlbiA8Y29kZT5lbGVtZW50PC9jb2RlPiBhbmQgcmV0dXJucyBpdCBhc1xuICAgICAqIGEgPGNvZGU+alF1ZXJ5PC9jb2RlPiBvYmplY3QuIFRoaXMgZGlmZmVycyBmcm9tXG4gICAgICoge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5LmdldH0gaW4gdGhhdCB0aGUgbWF0Y2ggaXMgYXNzdW1lZCB0byBiZSBhbiBJRFxuICAgICAqIGFuZCBhIERPTSBsb29rdXAgaXMgZG9uZSBiYXNlZCB1cG9uIHRoYXQuIFRoZSA8Y29kZT5uYW1lPC9jb2RlPiBpcyBzdGlsbFxuICAgICAqIG5vcm1hbGlzZWQgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS4gSWYgdGhlXG4gICAgICogV0FJLUFSSUEgYXR0cmlidXRlIGlzIG5vdCBmb3VuZCAoc2VlIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5oYXN9IHRoZW5cbiAgICAgKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gICB7RWxlbWVudH0gICAgICAgICAgZWxlbWVudFxuICAgICAqICAgICAgICAgIEVsZW1lbnQgdG8gY2hlY2suXG4gICAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgIG5hbWVcbiAgICAgKiAgICAgICAgICBXQUktQVJJQSByZWZlcmVuY2UuXG4gICAgICogQHJldHVybiAge2pRdWVyeXx1bmRlZmluZWR9XG4gICAgICogICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlZmVyZW5jZSBvciB1bmRlZmluZWQgaWYgdGhlXG4gICAgICogICAgICAgICAgYXR0cmlidXRlIGlzbid0IHNldC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhPWxhYmVsbGVkYnk9XCJ0d29cIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGlkPVwidHdvXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnJlZmVyZW5jZS5nZXQoZWxlbWVudCwgXCJsYWJlbGxlZGJ5XCIpO1xuICAgICAqIC8vIC0+ICQoPGRpdiBpZD1cInR3b1wiPilcbiAgICAgKiBoYW5kbGVycy5yZWZlcmVuY2UuZ2V0KGVsZW1lbnQsIFwiY29udHJvbHNcIik7XG4gICAgICogLy8gLT4gdW5kZWZpbmVkXG4gICAgICovXG4gICAgZ2V0OiBmdW5jdGlvbiAoZWxlbWVudCwgbmFtZSkge1xuXG4gICAgICAgIHZhciBoYW5kbGVyID0gaGFuZGxlcnNbSEFORExFUl9QUk9QRVJUWV07XG5cbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuaGFzKGVsZW1lbnQsIG5hbWUpXG4gICAgICAgICAgICA/ICQoXCIjXCIgKyBoYW5kbGVyLmdldChlbGVtZW50LCBuYW1lKSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgfVxuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL2hhbmRsZXJzL3N0YXRlLmpzXG5cblxudmFyIFJFR0VYUF9CT09MRUFOID0gL14oPzp0cnVlfGZhbHNlKSQvO1xudmFyIFZBTFVFX01JWEVEID0gXCJtaXhlZFwiO1xuXG4vKipcbiAqIEhhbmRsZXMgV0FJLUFSSUEgc3RhdGVzLiBUaGlzIGRpZmZlcnMgZnJvbSB7QGxpbmsgaGFuZGxlcnMucHJvcGVydHl9IGluIHRoYXRcbiAqIHZhbHVlcyBhcmUgY29lcmNlZCBpbnRvIGJvb2xlYW5zIGJlZm9yZSBiZWluZyBzZXQgYW5kIGEgYm9vbGVhbiAob3IgdGhlXG4gKiBzdHJpbmcgXCJtaXhlZFwiKSB3aWxsIGJlIHJldHVybmVkLlxuICogPGJyPntAbGluayBoYW5kbGVycy5zdGF0ZS5yZWFkfSBjb252ZXJ0cyB0aGUgdmFsdWUgaW50byBhIGJvb2xlYW4uXG4gKiA8YnI+e0BsaW5rIGhhbmRsZXJzLnN0YXRlLnNldH0gc2V0cyB0aGUgc3RhdGUuXG4gKiA8YnI+e0BsaW5rIGhhbmRsZXJzLnN0YXRlLmdldH0gZ2V0cyB0aGUgc3RhdGUuXG4gKlxuICogQGFsaWFzICAgICBzdGF0ZVxuICogQG1lbWJlcm9mICBoYW5kbGVyc1xuICogQG5hbWVzcGFjZVxuICogQHByaXZhdGVcbiAqL1xuaGFuZGxlcnNbSEFORExFUl9TVEFURV0gPSB7XG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyB0aGUgcmF3IHZhbHVlIGFuZCBjb252ZXJ0cyBpdCBpbnRvIGEgYm9vbGVhbiBvciB0aGUgc3RyaW5nXG4gICAgICogPGNvZGU+XCJtaXhlZFwiPC9jb2RlPiAoYWx3YXlzIGxvd2VyIGNhc2UpLiBJZiA8Y29kZT5yYXc8L2NvZGU+IGNhbm5vdCBiZVxuICAgICAqIGNvcnJlY3RseSBjb252ZXJ0ZWQsIGl0IGlzIGFzc3VtZWQgdG8gYmUgPGNvZGU+dHJ1ZTwvY29kZT4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSAgIHs/fSByYXdcbiAgICAgKiAgICAgICAgICBWYWx1ZSB0byByZWFkLlxuICAgICAqIEByZXR1cm4gIHtCb29sZWFufFN0cmluZ31cbiAgICAgKiAgICAgICAgICBDb252ZXJ0ZWQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db252ZXJ0aW5nIHZhbHVlczwvY2FwdGlvbj5cbiAgICAgKiBoYW5kbGVycy5zdGF0ZS5yZWFkKHRydWUpOyAgICAvLyAtPiB0cnVlXG4gICAgICogaGFuZGxlcnMuc3RhdGUucmVhZChcImZhbHNlXCIpOyAvLyAtPiBmYWxzZVxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoXCIxXCIpOyAgICAgLy8gLT4gdHJ1ZVxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoMCk7ICAgICAgIC8vIC0+IGZhbHNlXG4gICAgICogaGFuZGxlcnMuc3RhdGUucmVhZChcIm1peGVkXCIpOyAvLyAtPiBcIm1peGVkXCJcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIDxjYXB0aW9uPlVucmVjb2duaXNlZCB2YWx1ZXMgZGVmYXVsdCB0byB0cnVlPC9jYXB0aW9uPlxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoXCIyXCIpOyAgICAgIC8vIC0+IHRydWVcbiAgICAgKiBoYW5kbGVycy5zdGF0ZS5yZWFkKC0xKTsgICAgICAgLy8gLT4gdHJ1ZVxuICAgICAqIGhhbmRsZXJzLnN0YXRlLnJlYWQoW10pOyAgICAgICAvLyAtPiB0cnVlXG4gICAgICogaGFuZGxlcnMuc3RhdGUucmVhZChcIm1peGVkLlwiKTsgLy8gLT4gdHJ1ZVxuICAgICAqL1xuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWRTdGF0ZShyYXcpIHtcblxuICAgICAgICB2YXIgc3RhdGUgPSB0cnVlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHJhdykge1xuXG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG5cbiAgICAgICAgICAgIHN0YXRlID0gcmF3O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuXG4gICAgICAgICAgICByYXcgPSByYXcudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYgKHJhdyA9PT0gVkFMVUVfTUlYRUQpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHJhdztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmF3ID09PSBcIjFcIiB8fCByYXcgPT09IFwiMFwiKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSByZWFkU3RhdGUoK3Jhdyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFJFR0VYUF9CT09MRUFOLnRlc3QocmF3KSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gcmF3ID09PSBcInRydWVcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuXG4gICAgICAgICAgICBpZiAocmF3ID09PSAwIHx8IHJhdyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gISFyYXc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGU7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgV0FJLUFSSUEgc3RhdGUgZGVmaW5lZCBpbiA8Y29kZT5uYW1lPC9jb2RlPiBvbiB0aGUgZ2l2ZW5cbiAgICAgKiA8Y29kZT5lbGVtZW50PC9jb2RlPi4gVGhpcyBkaWZmZXJzIGZyb20ge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5LnNldH0gaW5cbiAgICAgKiB0aGF0IDxjb2RlPnN0YXRlPC9jb2RlPiBpcyBjb252ZXJ0ZWQgaW50byBhIGJvb2xlYW4gb3JcbiAgICAgKiA8Y29kZT5cIm1peGVkXCI8L2NvZGU+IGJlZm9yZSBiZWluZyBhc3NpZ25lZCAoc2VlXG4gICAgICoge0BsaW5rIGhhbmRsZXJzLnN0YXRlLnJlYWR9KSBhbmQgdGhlcmUgaXMgbm8gPGNvZGU+Y29udmVydDwvY29kZT5cbiAgICAgKiBwYXJhbXRlci4gVGhlIDxjb2RlPm5hbWU8L2NvZGU+IGlzIHN0aWxsIG5vcm1hbGlzZWQgKHNlZVxuICAgICAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtICAge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiAgICAgICAgICBFbGVtZW50IHRvIG1vZGlmeS5cbiAgICAgKiBAcGFyYW0gICB7U3RyaW5nfSAgbmFtZVxuICAgICAqICAgICAgICAgIFdBSS1BUklBIGF0dHJpYnV0ZSB0byBzZXQuXG4gICAgICogQHBhcmFtICAgez99ICAgICAgIHN0YXRlXG4gICAgICogICAgICAgICAgU3RhdGUgdG8gc2V0LlxuICAgICAqIEBwYXJhbSAgIHtOdW1iZXJ9ICBpbmRleFxuICAgICAqICAgICAgICAgIEluZGV4IG9mIDxjb2RlPmVsZW1lbnQ8L2NvZGU+IHdpdGhpbiB0aGUgY29sbGVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gTWFya3VwIGlzOlxuICAgICAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGlkPVwidHdvXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbmVcIik7XG4gICAgICogdmFyIHR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHdvXCIpO1xuICAgICAqIGhhbmRsZXJzLnN0YXRlLnNldChvbmUsIFwiYnVzeVwiLCB0cnVlKTtcbiAgICAgKiBoYW5kbGVycy5zdGF0ZS5zZXQodHdvLCBcImNoZWNrZWRcIiwgXCJtaXhlZFwiKTtcbiAgICAgKlxuICAgICAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gICAgICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtYnVzeT1cInRydWVcIj48L2Rpdj5cbiAgICAgKiAvLyA8ZGl2IGlkPVwidHdvXCIgYXJpYS1jaGVja2VkPVwibWl4ZWRcIj48L2Rpdj5cbiAgICAgKi9cbiAgICBzZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lLCBzdGF0ZSwgaW5kZXgpIHtcblxuICAgICAgICBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXS5zZXQoXG4gICAgICAgICAgICBlbGVtZW50LFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICBoYW5kbGVyc1tIQU5ETEVSX1NUQVRFXS5yZWFkXG4gICAgICAgICk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVhZHMgdGhlIFdBSS1BUklBIHN0YXRlIG9uIDxjb2RlPmVsZW1lbnQ8L2NvZGU+LiBUaGlzIGRpZmZlcnMgZnJvbVxuICAgICAqIHtAbGluayBoYW5kbGVycy5wcm9wZXJ0eS5nZXR9IGluIHRoYXQgdGhlIHJlc3VsdCBpcyBjb252ZXJ0ZWQgaW50byBhXG4gICAgICogYm9vbGVhbiBvciB0aGUgc3RyaWduIGBcIm1peGVkXCJgIGJlZm9yZSBiZWluZyByZXR1cm5lZC4gVGhlXG4gICAgICogPGNvZGU+bmFtZTwvY29kZT4gaXMgc3RpbGwgbm9ybWFsaXNlZCAoc2VlIHtAbGluayBqUXVlcnkubm9ybWFsaXNlQXJpYX0pLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0gICB7RWxlbWVudH0gICAgZWxlbWVudFxuICAgICAqICAgICAgICAgIEVsZW1lbnQgdG8gYWNjZXNzLlxuICAgICAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICBuYW1lXG4gICAgICogICAgICAgICAgV0FJLUFSSUEgc3RhdGUgdG8gcmVhZC5cbiAgICAgKiBAcmV0dXJuICB7QVJJQV9zdGF0ZX1cbiAgICAgKiAgICAgICAgICBTdGF0ZSBvZiB0aGUgV0FJLUFSSUEgcHJvcGVydHkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIE1hcmt1cCBpczpcbiAgICAgKiAvLyA8ZGl2IGlkPVwib25lXCIgYXJpYS1idXN5PVwidHJ1ZVwiIGFyaWEtY2hlY2tlZD1cIm1peGVkXCI+PC9kaXY+XG4gICAgICpcbiAgICAgKiB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib25lXCIpO1xuICAgICAqIGhhbmRsZXJzLnN0YXRlLmdldChlbGVtZW50LCBcImJ1c3lcIik7ICAgICAvLyAtPiB0cnVlXG4gICAgICogaGFuZGxlcnMuc3RhdGUuZ2V0KGVsZW1lbnQsIFwiY2hlY2tlZFwiKTsgIC8vIC0+IFwibWl4ZWRcIlxuICAgICAqIGhhbmRsZXJzLnN0YXRlLmdldChlbGVtZW50LCBcImRpc2FibGVkXCIpOyAvLyAtPiB1bmRlZmluZWRcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uIChlbGVtZW50LCBuYW1lKSB7XG5cbiAgICAgICAgdmFyIGhhbmRsZXIgPSBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXTtcbiAgICAgICAgdmFyIHN0YXRlO1xuICAgICAgICB2YXIgdmFsdWU7XG5cbiAgICAgICAgaWYgKGhhbmRsZXIuaGFzKGVsZW1lbnQsIG5hbWUpKSB7XG5cbiAgICAgICAgICAgIHZhbHVlID0gaGFuZGxlci5nZXQoZWxlbWVudCwgbmFtZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHN0YXRlID0gdmFsdWUgPT09IFZBTFVFX01JWEVEXG4gICAgICAgICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgICAgICAgIDogKFJFR0VYUF9CT09MRUFOLnRlc3QodmFsdWUpICYmIHZhbHVlID09PSBcInRydWVcIik7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGF0ZTtcblxuICAgIH1cblxufTtcblxuLy8gU291cmNlOiAvc3JjL2dsb2JhbC9hY2Nlc3MuanNcblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyBhbGwgdGhlIGhlYXZ5IGxpZnRpbmcgb2YgZ2V0dGluZyBvciBzZXR0aW5nIFdBSS1BUklBXG4gKiBhdHRyaWJ1dGVzLiBJdCBpcyBkZXNpZ25lZCB0byBiZSBhbGwgdGhhdCdzIG5lY2Vzc2FyeSBmb3JcbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LFxuICogW2pRdWVyeSNhcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVJlZn0gYW5kXG4gKiBbalF1ZXJ5I2FyaWFTdGF0ZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFTdGF0ZX0uIFRoaXMgZnVuY3Rpb24gd2lsbCBjaGVja1xuICogaXRzIGFyZ3VtZW50cyB0byBkZXRlcm1pbmUgd2hldGhlciBpdCBzaG91bGQgYmUgdXNlZCBhcyBhIGdldHRlciBvciBhIHNldHRlclxuICogYW5kIHBhc3NlcyB0aGUgYXBwcm9wcmlhdGUgYXJndW1lbnRzIHRvIHRoZSB7QGxpbmsgaGFuZGxlcnN9IG1ldGhvZHMgYmFzZWQgb25cbiAqIDxjb2RlPnR5cGU8L2NvZGU+ICh3aGljaCB3aWxsIGRlZmF1bHQgdG8ge0BsaW5rIGhhbmRsZXJzLnByb3BlcnR5fSBpZlxuICogb21taXR0ZWQgb3Igbm90IHJlY29nbmlzZWQpLlxuICogPGJyPjxicj5cbiAqIFRoZSByZXR1cm4gdmFsdWUgaXMgYmFzZWQgb24gdGhlIHR5cGUgb2YgYWN0aW9uIGJlaW5nIHBlcmZvcm1lZC4gSWYgdGhpc1xuICogZnVuY3Rpb24gaXMgc2V0dGluZyB0aGVuIGEgalF1ZXJ5IG9iamVjdCBvZiB0aGUgbWF0Y2hlcyBpcyByZXR1cm5lZCAod2hpY2ggaXNcbiAqIGFsbW9zdCBhbHdheXMgPGNvZGU+alFlbGVtZW50czwvY29kZT4pOyBpZiB0aGUgZnVuY3Rpb24gaXMgYSBnZXR0ZXIgdGhlbiB0aGVcbiAqIHJlc3VsdHMgYXJlIHJldHVybmVkIGZvciB0aGUgZmlyc3QgZWxlbWVudCBpbiA8Y29kZT5qUWVsZW1lbnRzPC9jb2RlPi5cbiAqIDxicj48YnI+XG4gKiBBbHRob3VnaCB0aGlzIGRlc2NyaXB0aW9uIGlzIG5vdCBlc3BlY2lhbGx5IGV4dGVuc2l2ZSwgdGhlIGNvZGUgc2hvdWxkIGJlXG4gKiB2ZXJ5IGVhc3kgdG8gZm9sbG93IGFuZCBjb21tZW50ZWQgc2hvdWxkIHRoZXJlIGJlIGFueSBuZWVkIHRvIG1vZGlmeSBpdC4gT25jZVxuICogdGhlIGNvcnJlY3QgYXJndW1lbnRzIGFyZSBiZWluZyBwYXNzZWQgdG8gdGhlIGFwcHJvcHJpYXRlIHtAbGluayBoYW5kbGVyc31cbiAqIG1ldGhvZCwgdGhleSB3aWxsIHRha2UgY2FyZSBvZiB0aGUgcmVzdC5cbiAqXG4gKiBAZ2xvYmFsXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICAge2pRdWVyeX0gICAgICAgICAgICBqUWVsZW1lbnRzXG4gKiAgICAgICAgICBqUXVlcnkgb2JqZWN0IHRvIG1vZGlmeS9hY2Nlc3MuXG4gKiBAcGFyYW0gICB7T2JqZWN0fFN0cmluZ30gICAgIHByb3BlcnR5XG4gKiAgICAgICAgICBFaXRoZXIgV0FJLUFSSUEgbmFtZXMgYW5kIHZhbHVlcyBvciB0aGUgV0FJLUFSSUEgcHJvcGVydHkgbmFtZS5cbiAqIEBwYXJhbSAgIHs/fSAgICAgICAgICAgICAgICAgW3ZhbHVlXVxuICogICAgICAgICAgVmFsdWUgdG8gc2V0LlxuICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgICBbdHlwZT1cInByb3BlcnR5XCJdXG4gKiAgICAgICAgICBPcHRpb25hbCBhdHRyaWJ1dGUgdHlwZS5cbiAqIEByZXR1cm4gIHtqUXVlcnl8QVJJQV9zdGF0ZX1cbiAqICAgICAgICAgIEVpdGhlciB0aGUgalF1ZXJ5IG9iamVjdCBvbiB3aGljaCBXQUktQVJJQSBwcm9wZXJ0aWVzIHdlcmUgc2V0IG9yXG4gKiAgICAgICAgICB0aGUgdmFsdWVzIG9mIHRoZSBXQUktQVJJQSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgYSBzaW5nbGUgcHJvcGVydHk8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqXG4gKiB2YXIgalFvbmUgPSAkKFwiI29uZVwiKTtcbiAqIGFjY2VzcyhqUW9uZSwgXCJjb250cm9sc1wiLCBcInR3b1wiKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtY29udHJvbHM9XCJ0d29cIj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIG11bHRpcGxlIHJlZmVyZW5jZXM8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiB2YXIgalFvbmUgPSAkKFwiI29uZVwiKTtcbiAqIGFjY2VzcyhqUW9uZSwge1xuICogICAgIGNvbnRyb2xzOiAkKFwiZGl2XCIpLmVxKDEpXG4gKiB9LCBcInJlZmVyZW5jZVwiKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtY29udHJvbHM9XCJ0d29cIj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXR0aW5nIGEgc3RhdGU8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWJ1c3k9XCJ0cnVlXCI+PC9kaXY+XG4gKlxuICogdmFyIGpRb25lID0gJChcIiNvbmVcIik7XG4gKiBhY2Nlc3MoalFvbmUsIFwiYnVzeVwiLCB1bmRlZmluZWQsIFwic3RhdGVcIik7IC8vIC0+IHRydWVcbiAqL1xuZnVuY3Rpb24gYWNjZXNzKGpRZWxlbWVudHMsIHByb3BlcnR5LCB2YWx1ZSwgdHlwZSkge1xuXG4gICAgdmFyIHRlbXBQcm9wZXJ0eSA9IHByb3BlcnR5O1xuICAgIHZhciBpc1Byb3BlcnR5T2JqZWN0ID0gJC5pc1BsYWluT2JqZWN0KHByb3BlcnR5KTtcbiAgICB2YXIgaXNHZXQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICFpc1Byb3BlcnR5T2JqZWN0O1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpcyBpbiB0aGUgZXhwZWN0ZWQgZm9ybWF0OiBhbiBvYmplY3QgZm9yXG4gICAgLy8gc2V0dGluZyBhbmQgYSBzdHJpbmcgZm9yIGdldHRpbmcuXG4gICAgaWYgKCFpc0dldCAmJiAhaXNQcm9wZXJ0eU9iamVjdCkge1xuXG4gICAgICAgIHByb3BlcnR5ID0ge307XG4gICAgICAgIHByb3BlcnR5W3RlbXBQcm9wZXJ0eV0gPSB2YWx1ZTtcblxuICAgIH1cblxuICAgIC8vIElmIHdlIGRvbid0IGhhdmUgb3IgZG9uJ3QgcmVjb2duaXNlIHRoZSB0eXBlLCBkZWZhdWx0IHRvIFwicHJvcGVydHlcIi5cbiAgICBpZiAoIXR5cGUgfHwgIWhhbmRsZXJzW3R5cGVdKSB7XG4gICAgICAgIHR5cGUgPSBIQU5ETEVSX1BST1BFUlRZO1xuICAgIH1cblxuICAgIHJldHVybiBpc0dldFxuICAgICAgICA/IGhhbmRsZXJzW3R5cGVdLmdldChqUWVsZW1lbnRzWzBdLCBwcm9wZXJ0eSlcbiAgICAgICAgOiBqUWVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG5cbiAgICAgICAgICAgICQuZWFjaChwcm9wZXJ0eSwgZnVuY3Rpb24gKGtleSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcnNbdHlwZV0uc2V0KGVsZW1lbnQsIGtleSwgdmFsLCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxufVxuXG4vLyBTb3VyY2U6IC9zcmMvZ2xvYmFsL3JlbW92ZUF0dHJpYnV0ZS5qc1xuXG5cblxuLyoqXG4gKiBSZW1vdmVzIHRoZSBuYW1lZCBXQUktQVJJQSBhdHRyaWJ1dGUgZnJvbSBhbGwgZWxlbWVudHMgaW4gdGhlIGN1cnJlbnRcbiAqIGNvbGxlY3Rpb24uIFRoZSA8Y29kZT5uYW1lPC9jb2RlPiBpcyBub3JtYWxpc2VkIChzZWVcbiAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS4gVGhpcyBmdW5jdGlvblxuICogaXMgYWxpYXNlZCBhcyBbalF1ZXJ5I3JlbW92ZUFyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNyZW1vdmVBcmlhUmVmfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlfS5cbiAqXG4gKiBAYWxpYXMgICAgcmVtb3ZlQXJpYVxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQGluc3RhbmNlXG4gKiBAcGFyYW0gICAge1N0cmluZ30gbmFtZVxuICogICAgICAgICAgIFdBSS1BUklBIGF0dHJpYnV0ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJuICAge2pRdWVyeX1cbiAqICAgICAgICAgICBqUXVlcnkgYXR0cmlidXRlIHJlcHJlc2VudGluZyB0aGUgZWxlbWVudHMgbW9kaWZpZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIE1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIGFyaWEtYnVzeT1cInRydWVcIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5yZW1vdmVBcmlhKFwiYnVzeVwiKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcblxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGlnbm9yZSwgZWxlbWVudCkge1xuICAgICAgICBoYW5kbGVyc1tIQU5ETEVSX1BST1BFUlRZXS51bnNldChlbGVtZW50LCBuYW1lKTtcbiAgICB9KTtcblxufVxuXG4vLyBTb3VyY2U6IC9zcmMvbWVtYmVyL25vcm1hbGlzZUFyaWEuanNcblxuXG4vKipcbiAqIEFsaWFzIG9mIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAYWxpYXMgICAgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGl6ZUFyaWFcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEBwYXJhbSAgICB7U3RyaW5nfSBuYW1lXG4gKiAgICAgICAgICAgQXR0cmlidXRlIG5hbWUgdG8gbm9ybWFsaXNlLlxuICogQHJldHVybiAgIHtTdHJpbmd9XG4gKiAgICAgICAgICAgTm9ybWFsaXNlZCBhdHRyaWJ1dGUgbmFtZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0LjxTdHJpbmc+fSBjYWNoZVxuICogICAgICAgICAgIFRoZSBjYWNoZSBvZiByZXF1ZXN0cyB0byByZXNwb25zZXMuXG4gKi9cbiQubm9ybWFsaXplQXJpYSA9IG5vcm1hbGlzZTtcbiQubm9ybWFsaXNlQXJpYSA9IG5vcm1hbGlzZTtcblxuLy8gU291cmNlOiAvc3JjL21lbWJlci9hcmlhRml4LmpzXG5cblxuLyoqXG4gKiBBIG1hcCBvZiB1bnByZWZpeGVkIFdBSS1BUklBIGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgY29udmVydGVkIGJlZm9yZSBiZWluZ1xuICogbm9ybWFsaXNlZCAoc2VlIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAqXG4gKiBAYWxpYXMgICAgZXh0ZXJuYWw6alF1ZXJ5LmFyaWFGaXhcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEB0eXBlICAgICB7T2JqZWN0LjxTdHJpbmc+fVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvcnJlY3RpbmcgYSBjb21tb24gdHlwbzwvY2FwdGlvbj5cbiAqICQuYXJpYUZpeC5idWR5ID0gXCJidXN5XCI7XG4gKiAkLm5vcm1hbGlzZUFyaWEoXCJidWR5XCIpOyAgICAgIC8vIC0+IFwiYXJpYS1idXN5XCJcbiAqICQubm9ybWFsaXNlQXJpYShcImFyaWEtYnVkeVwiKTsgLy8gLT4gXCJhcmlhLWJ1c3lcIlxuICovXG4kLmFyaWFGaXggPSB7XG5cbiAgICAvLyBUaGlzIGlzIHRoZSBVUyBFbmdsaXNoIHNwZWxsaW5nIGJ1dCB0aGUgY2Nlc3NpYmlsaXR5IEFQSSBkZWZpbmVkIHRoZVxuICAgIC8vIGF0dHJpYnV0ZSB3aXRoIHRoZSBkb3VibGUgTC5cbiAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEvc3RhdGVzX2FuZF9wcm9wZXJ0aWVzI2FyaWEtbGFiZWxsZWRieVxuICAgIGxhYmVsZWRieTogXCJsYWJlbGxlZGJ5XCJcblxufTtcblxuLy8gSWYgUHJveHkgaXMgYXZhaWxhYmxlLCB3ZSBjYW4gdXNlIGl0IHRvIGNoZWNrIHdoZW5ldmVyICQuYXJpYUZpeCBpcyBtb2RpZmllZFxuLy8gYW5kIGludmFsaWRhdGUgdGhlIGNhY2hlIG9mIG5vcm1hbGlzZSgpIHdoZW4gaXQgaXMuIFRoaXMgaXMgYSBsb3QgbW9yZVxuLy8gZWZmaWNpZW50IHRoYW4gYWx3YXlzIGNvbnZlcnRpbmcgJC5hcmlhRml4IHRvIGEgSlNPTiBzdHJpbmcgdG8gZW5zdXJlIHRoZVxuLy8gY2FjaGUgaXMgYWNjdXJhdGUuXG5pZiAoSVNfUFJPWFlfQVZBSUxBQkxFKSB7XG5cbiAgICAkLmFyaWFGaXggPSBuZXcgUHJveHkoJC5hcmlhRml4LCB7XG5cbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuXG4gICAgICAgICAgICBub3JtYWxpc2UuY2FjaGUgPSB7fTtcbiAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59XG5cbi8vIFNvdXJjZTogL3NyYy9tZW1iZXIvYXJpYUhvb2tzLmpzXG5cblxuLyoqXG4gKiBBIGNvbGxlY3Rpb24gb2YgaG9va3MgdGhhdCBjaGFuZ2UgdGhlIGJlaGF2aW91ciBvZiBhdHRyaWJ1dGVzIGJlaW5nIHNldCxcbiAqIHJldHJpZXZlZCwgY2hlY2tlZCBvciByZW1vdmVkIChjYWxsZWQgW3NldF17QGxpbmsgQVJJQV9ob29rX3NldH0sXG4gKiBbZ2V0XXtAbGluayBBUklBX2hvb2tfZ2V0fSwgW2hhc117QGxpbmsgQVJJQV9ob29rX2hhc30sXG4gKiBbdW5zZXRde0BsaW5rIEFSSUFfaG9va191bnNldH0gLSBzZWUge0BsaW5rIEFSSUFfaG9va30gZm9yIGZ1bGwgZGV0YWlscykuIFRoZVxuICogbmFtZSBvZiB0aGUgaG9vayBpcyBhbHdheXMgdGhlIHVuLXByZWZpeGVkIFdBSS1BUklBIGF0dHJpYnV0ZSBpbiBsb3dlciBjYXNlXG4gKiBhZnRlciBhbnkgbWFwcGluZyBoYXMgb2NjdXJyZWQgKHNlZVxuICogW2pRdWVyeS5hcmlhRml4XXtAbGluayBleHRlcm5hbDpqUXVlcnkuYXJpYUZpeH0pLiBJZiB5b3UgYXJlIGV2ZXIgaW4gZG91YnQsXG4gKiB0aGUgZWFzaWVzdCB3YXkgdG8ga25vdyB0aGUga2V5IGlzIHRvIHNsaWNlIHRoZSBub3JtYWxpc2VkIHZhbHVlOlxuICogPGNvZGU+JC5ub3JtYWxpc2VBcmlhKF9fV0FJLUFSSUFfQVRUUklCVVRFX18pLnNsaWNlKDUpPC9jb2RlPiAoc2VlXG4gKiBbalF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSBmb3IgbW9yZVxuICogaW5mb3JtYXRpb24pLlxuICogPGJyPjxicj5cbiAqIERvIG5vdCB1c2UgdGhlc2UgZnVuY3Rpb25zIHRvIHNldCBkaWZmZXJlbnQgV0FJLUFSSUEgYXR0cmlidXRlcyB3aXRob3V0XG4gKiBzZXR0aW5nIHRoZSBvbmUgYmVpbmcgcGFzc2VkIHRvIHRoZSBhcmlhIG1ldGhvZDsgZm9yIGV4YW1wbGU6IGRvIG5vdCBjcmVhdGUgYVxuICogc2V0IGZvciBcImF0dHJpYnV0ZTFcIiB0aGF0IHNldHMgXCJhdHRyaWJ1dGUyXCIgaW5zdGVhZCAtIHVubGVzcyB5b3UgYWRkIHRoZSBzYW1lXG4gKiBjb252ZXJzaW9uIHRvIDxjb2RlPmhhczwvY29kZT4sIDxjb2RlPmdldDwvY29kZT4gd2lsbCBub3QgYmUgdHJpZ2dlcmVkLlxuICogSW5zdGVhZCwgdXNlIFtqUXVlcnkuYXJpYUZpeF17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5LmFyaWFGaXh9IHRvIGNvbnZlcnQgdGhlXG4gKiBhdHRyaWJ1dGUgbmFtZS5cbiAqIDxicj48YnI+XG4gKiBbalF1ZXJ5I2FyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhfSxcbiAqIFtqUXVlcnkjYXJpYVJlZl17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFSZWZ9LFxuICogW2pRdWVyeSNhcmlhU3RhdGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhU3RhdGV9LFxuICogW2pRdWVyeSNyZW1vdmVBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYX0sXG4gKiBbalF1ZXJ5I3JlbW92ZUFyaWFSZWZde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNyZW1vdmVBcmlhUmVmfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYVN0YXRlfSBhbGwgcnVuXG4gKiB0aHJvdWdoIHRoZXNlIGhvb2tzIChpZiB0aGV5IGV4aXN0KSBhbmQgdGhlc2UgaG9va3MgcmVwbGFjZSB0aGUgZnVuY3Rpb25hbGl0eVxuICogb2YgbWFuaXB1bGF0aW5nIG9yIGNoZWNraW5nIHRoZSBhdHRyaWJ1dGVzIGFmdGVyIGFueSBjb252ZXJzaW9uIHByb2Nlc3MgaGFzXG4gKiBvY2N1cnJlZCB3aXRoaW4gdGhlIG1ldGhvZCBpdHNlbGYuXG4gKlxuICogQGFsaWFzICAgIGV4dGVybmFsOmpRdWVyeS5hcmlhSG9va3NcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEB0eXBlICAgICB7T2JqZWN0LjxBUklBX2hvb2s+fVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBhcmlhLWxldmVsIHNob3VsZCBiZSBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAxIHNvIHRoZSBnZXR0ZXJcbiAqIC8vIHNob3VsZCByZXR1cm4gYW4gaW50ZWdlci5cbiAqICQuYXJpYUhvb2tzLmxldmVsID0ge1xuICogICAgIHNldDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlKSB7XG4gKiAgICAgICAgIHZhciBpbnRWYWwgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHZhbHVlKSk7XG4gKiAgICAgICAgIGlmICghaXNOYU4oaW50VmFsKSkge1xuICogICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxldmVsXCIsIGludFZhbClcbiAqICAgICAgICAgfVxuICogICAgIH0sXG4gKiAgICAgZ2V0OiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICogICAgICAgICB2YXIgdmFsdWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImFyaWEtbGV2ZWxcIik7XG4gKiAgICAgICAgIHZhciBpbnRWYWwgPSAoTWF0aC5tYXgoMSwgTWF0aC5mbG9vcih2YWx1ZSkpO1xuICogICAgICAgICByZXR1cm4gKHZhbHVlID09PSBudWxsIHx8IGlzTmFOKGludFZhbCkpXG4gKiAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICogICAgICAgICAgICAgOiBpbnRWYWw7XG4gKiAgICAgfVxuICogfTtcbiAqL1xuJC5hcmlhSG9va3MgPSB7XG5cbiAgICBoaWRkZW46IHtcblxuICAgICAgICAvLyBTZXR0aW5nIGFyaWEtaGlkZGVuPVwiZmFsc2VcIiBpcyBjb25zaWRlcmVkIHZhbGlkLCBidXQgcmVtb3ZpbmcgdGhlXG4gICAgICAgIC8vIGFyaWEtaGlkZGVuIGF0dHJpYnV0ZSBoYXMgdGhlIHNhbWUgZWZmZWN0IGFuZCBJIHRoaW5rIGl0J3MgdGlkaWVyLlxuICAgICAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEvc3RhdGVzX2FuZF9wcm9wZXJ0aWVzI2FyaWEtaGlkZGVuXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGVsZW1lbnQsIHZhbHVlLCBuYW1lKSB7XG5cbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSB8fCArdmFsdWUgPT09IDAgfHwgKC9eZmFsc2UkL2kpLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9pbnN0YW5jZS9pZGVudGlmeS5qc1xuXG5cblxudmFyIGNvdW50ID0gMDtcblxuLyoqXG4gKiBJZGVudGlmaWVzIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uIGJ5IGdldHRpbmcgaXRzIElELiBJZiB0aGVcbiAqIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIElEIGF0dHJpYnV0ZSwgYSB1bmlxdWUgb24gaXMgZ2VuZXJhdGVkIGFuZCBhc3NpZ25lZFxuICogYmVmb3JlIGJlaW5nIHJldHVybmVkLiBJZiB0aGUgY29sbGVjdGlvbiBkb2VzIG5vdCBoYXZlIGEgZmlyc3QgZWxlbWVudCB0aGVuXG4gKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IGlzIHJldHVybmVkLlxuICogPGJyPjxicj5cbiAqIElEcyBhcmUgYSBjb25jYXRlbmF0aW9uIG9mIFwiYW5vbnltb3VzXCIgYW5kIGEgaGlkZGVuIGNvdW50ZXIgdGhhdCBpcyBpbmNyZWFzZWRcbiAqIGVhY2ggdGltZS4gSWYgdGhlIElEIGFscmVhZHkgZXhpc3RzIG9uIHRoZSBwYWdlLCB0aGF0IElEIGlzIHNraXBwZWQgYW5kIG5vdFxuICogYXNzaWduZWQgdG8gYSBzZWNvbmQgZWxlbWVudC5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICBpZGVudGlmeVxuICogQHJldHVybiAgIHtTdHJpbmd8dW5kZWZpbmVkfVxuICogICAgICAgICAgIFRoZSBJRCBvZiB0aGUgZmlyc3QgZWxlbWVudCBvciB1bmRlZmluZWQgaWYgdGhlcmUgaXMgbm8gZmlyc3RcbiAqICAgICAgICAgICBlbGVtZW50LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPklkZW50aWZ5aW5nIGVsZW1lbnRzPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzXG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCI+PC9kaXY+XG4gKiAvLyA8c3BhbiBjbGFzcz1cIm9uZVwiPjwvc3Bhbj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5pZGVudGlmeSgpOyAvLyAtPiBcImFub255bW91czBcIlxuICpcbiAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgaWQ9XCJhbm9ueW1vdXMwXCI+PC9kaXY+XG4gKiAvLyA8c3BhbiBjbGFzcz1cIm9uZVwiPjwvc3Bhbj5cbiAqIC8vIFJ1bm5pbmcgJChcIi5vbmVcIikuaWRlbnRpZnkoKTsgYWdhaW4gd291bGQgbm90IGNoYW5nZSB0aGUgbWFya3VwLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkV4aXN0aW5nIElEcyBhcmUgbm90IGR1cGxpY2F0ZWQ8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCIgaWQ9XCJhbm9ueW1vdXMxXCI+PCEtLSBtYW51YWxseSBzZXQgLS0+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCI+PC9kaXY+XG4gKlxuICogJChcIi50d29cIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gKiAgICAgJCh0aGlzKS5pZGVudGlmeSgpO1xuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIiBpZD1cImFub255bW91czFcIj48IS0tIG1hbnVhbGx5IHNldCAtLT48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIiBpZD1cImFub255bW91czBcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIiBpZD1cImFub255bW91czJcIj48L2Rpdj5cbiAqL1xuJC5mbi5pZGVudGlmeSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBlbGVtZW50ID0gdGhpc1swXTtcbiAgICB2YXIgaXNBbkVsZW1lbnQgPSBpc0VsZW1lbnQoZWxlbWVudCk7XG4gICAgdmFyIGlkID0gaXNBbkVsZW1lbnRcbiAgICAgICAgPyBlbGVtZW50LmlkXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGlzQW5FbGVtZW50ICYmICFpZCkge1xuXG4gICAgICAgIGRvIHtcblxuICAgICAgICAgICAgaWQgPSBcImFub255bW91c1wiICsgY291bnQ7XG4gICAgICAgICAgICBjb3VudCArPSAxO1xuXG4gICAgICAgIH0gd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG5cbiAgICAgICAgZWxlbWVudC5pZCA9IGlkO1xuXG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvaW5zdGFuY2UvYXJpYS5qc1xuXG5cblxuLyoqXG4gKiBHZXRzIG9yIHNldHMgV0FJLUFSSUEgcHJvcGVydGllcy4gVGhlIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgbW9kaWZpZWQgYW55XG4gKiBtb3JlIHRoYW4gdGhleSBuZWVkIHRvIGJlICh1bmxpa2VcbiAqIFtqUXVlcnkjYXJpYVJlZl17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFSZWZ9IG9yXG4gKiBbalF1ZXJ5I2FyaWFTdGF0ZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWFTdGF0ZX0gd2hpY2ggd2lsbCBpbnRlcnByZXQgdGhlXG4gKiB2YWx1ZXMpLlxuICogPGJyPjxicj5cbiAqIFRvIHNldCBXQUktQVJJQSBwcm9wZXJ0aWVzLCBwYXNzIGVpdGhlciBhXG4gKiA8Y29kZT5wcm9wZXJ0eTwvY29kZT4vPGNvZGU+dmFsdWU8L2NvZGU+IHBhaXIgb2YgYXJndW1lbnRzIG9yIGFuIG9iamVjdFxuICogY29udGFpbmluZyB0aG9zZSBwYWlycy4gV2hlbiB0aGlzIGlzIGRvbmUsIHRoZSBhdHRyaWJ1dGVzIGFyZSBzZXQgb24gYWxsXG4gKiBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvbiBhbmQgdGhlIDxjb2RlPmpRdWVyeTwvY29kZT4gb2JqZWN0IGlzIHJldHVybmVkIHRvXG4gKiBhbGxvdyBmb3IgY2hhaW5pbmcuIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyBhIGZ1bmN0aW9uIGFuZCByZXR1cm5zXG4gKiA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IChvciBub3RoaW5nKSB0aGVuIG5vIGFjdGlvbiBpcyB0YWtlbiBmb3IgdGhhdCBlbGVtZW50LlxuICogVGhpcyBjYW4gYmUgdXNlZnVsIGZvciBzZWxlY3RpdmVseSBzZXR0aW5nIHZhbHVlcyBvbmx5IHdoZW4gY2VydGFpbiBjcml0ZXJpYVxuICogYXJlIG1ldC5cbiAqIDxicj48YnI+XG4gKiBUbyBnZXQgV0FJLUFSSUEgcHJvcGVydGllcywgb25seSBwYXNzIHRoZSA8Y29kZT5wcm9wZXJ0eTwvY29kZT4gdGhhdCB5b3Ugd2FudFxuICogdG8gZ2V0LiBJZiB0aGVyZSBpcyBubyBtYXRjaGluZyBwcm9wZXJ0eSwgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpcyByZXR1cm5lZC5cbiAqIEFsbCBwcm9wZXJ0aWVzIGFyZSBub3JtYWxpc2VkIChzZWVcbiAqIFtqUXVlcnkubm9ybWFsaXNlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5Lm5vcm1hbGlzZUFyaWF9KS5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICBhcmlhXG4gKiBAcGFyYW0gICAge09iamVjdHxTdHJpbmd9IHByb3BlcnR5XG4gKiAgICAgICAgICAgRWl0aGVyIHRoZSBwcm9wZXJ0aWVzIHRvIHNldCBpbiBrZXkvdmFsdWUgcGFpcnMgb3IgdGhlIG5hbWUgb2YgdGhlXG4gKiAgICAgICAgICAgcHJvcGVydHkgdG8gZ2V0L3NldC5cbiAqIEBwYXJhbSAgICB7QXR0cmlidXRlX0NhbGxiYWNrfEJvb2xlYW58TnVtYmVyfFN0cmluZ30gW3ZhbHVlXVxuICogICAgICAgICAgIFRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHJldHVybiAgIHtqUXVlcnl8U3RyaW5nfHVuZGVmaW5lZH1cbiAqICAgICAgICAgICBFaXRoZXIgdGhlIGpRdWVyeSBvYmplY3QgKGFmdGVyIHNldHRpbmcpIG9yIGEgc3RyaW5nIG9yIHVuZGVmaW5lZFxuICogICAgICAgICAgIChhZnRlciBnZXR0aW5nKVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgV0FJLUFSSUEgYXR0cmlidXRlKHMpPC9jYXB0aW9uPlxuICogJChcIiNlbGVtZW50XCIpLmFyaWEoXCJhcmlhLWxhYmVsXCIsIFwidGVzdFwiKTtcbiAqIC8vIG9yXG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYShcImxhYmVsXCIsIFwidGVzdFwiKTtcbiAqIC8vIG9yXG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYSh7XG4gKiAgICAgXCJhcmlhLWxhYmVsXCI6IFwidGVzdFwiXG4gKiB9KTtcbiAqIC8vIG9yXG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYSh7XG4gKiAgICAgbGFiZWw6IFwidGVzdFwiXG4gKiB9KTtcbiAqIC8vIEFsbCBvZiB0aGVzZSBzZXQgYXJpYS1sYWJlbD1cInRlc3RcIiBvbiBhbGwgbWF0Y2hpbmcgZWxlbWVudHMgYW5kIHJldHVybiBhXG4gKiAvLyBqUXVlcnkgb2JqZWN0IHJlcHJlc2VudGluZyBcIiNlbGVtZW50XCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIFdBSS1BUklBIGF0dHJpYnV0ZShzKSB3aXRoIGEgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAkKFwiI2VsZW1lbnRcIikuYXJpYShcImxhYmVsXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKiAgICAgcmV0dXJuIHRoaXMuaWQgKyBcIl9fXCIgKyBpICsgXCJfX1wiICsgYXR0cjtcbiAqIH0pO1xuICogLy8gb3JcbiAqICQoXCIjZWxlbWVudFwiKS5hcmlhKHtcbiAqICAgICBsYWJlbDogZnVuY3Rpb24gKGksIGF0dHIpIHtcbiAqICAgICAgICAgcmV0dXJuIHRoaXMuaWQgKyBcIl9fXCIgKyBpICsgXCJfX1wiICsgYXR0cjtcbiAqICAgICB9XG4gKiB9KTtcbiAqIC8vIEJvdGggb2YgdGhlc2Ugc2V0IGFyaWEtbGFiZWw9XCJlbGVtZW50X18wX191bmRlZmluZWRcIiBvbiBhbGwgbWF0Y2hpbmdcbiAqIC8vIGVsZW1lbnRzIGFuZCByZXR1cm4gYSBqUXVlcnkgb2JqZWN0IHJlcHJlc2VudGluZyBcIiNlbGVtZW50XCJcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5HZXR0aW5nIGEgV0FJLUFSSUEgYXR0cmlidXRlPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cImVsZW1lbnRcIiBhcmlhLWxhYmVsPVwidGVzdFwiPjwvZGl2PlxuICogJChcIiNlbGVtZW50XCIpLmFyaWEoXCJsYWJlbFwiKTsgICAvLyAtPiBcInRlc3RcIlxuICogJChcIiNlbGVtZW50XCIpLmFyaWEoXCJjaGVja2VkXCIpOyAvLyAtPiB1bmRlZmluZWRcbiAqIC8vIElmIFwiI2VsZW1lbnRcIiBtYXRjaGVzIG11bHRpcGxlIGVsZW1lbnRzLCB0aGUgYXR0cmlidXRlcyBmcm9tIHRoZSBmaXJzdFxuICogLy8gZWxlbWVudCBhcmUgcmV0dXJuZWQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U2V0dGluZyB3aXRoIGFyaWEgbWV0aG9kczwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0d29cIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJ0aHJlZVwiPC9kaXY+XG4gKlxuICogdmFyIHNldHRpbmdzID0ge1xuICogICAgIGJ1c3k6IDAsXG4gKiAgICAgY29udHJvbHM6IFwiLm9uZVwiLFxuICogICAgIGxhYmVsOiBcImxvcmVtIGlwc3VtXCJcbiAqIH07XG4gKlxuICogJChcIi5vbmVcIikuYXJpYShzZXR0aW5ncyk7XG4gKiAkKFwiLnR3b1wiKS5hcmlhUmVmKHNldHRpbmdzKTtcbiAqICQoXCIudGhyZWVcIikuYXJpYVN0YXRlKHNldHRpbmdzKTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiXG4gKiAvLyAgICAgYXJpYS1idXN5PVwiMFwiXG4gKiAvLyAgICAgYXJpYS1jb250cm9scz1cIi5vbmVcIlxuICogLy8gICAgIGFyaWEtbGFiZWw9XCJsb3JlbSBpcHN1bVwiXG4gKiAvLyAgICAgaWQ9XCJhbm9ueW1vdXMwXCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwidHdvXCJcbiAqIC8vICAgICBhcmlhLWNvbnRyb2xzPVwiYW5vbnltb3VzMFwiPjwvZGl2PlxuICogLy8gPGRpdiBjbGFzcz1cInRocmVlXCJcbiAqIC8vICAgICBhcmlhLWJ1c3k9XCJmYWxzZVwiXG4gKiAvLyAgICAgYXJpYS1jb250cm9scz1cInRydWVcIlxuICogLy8gICAgIGFyaWEtbGFiZWw9XCJ0cnVlXCI+PC9kaXY+XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0dGluZyB3aXRoIGFyaWEgbWV0aG9kczwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJ0ZXN0XCIgYXJpYS1mbG93dG89XCJmYWxzZVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cImZhbHNlXCI+PC9kaXY+XG4gKlxuICogJChcIiN0ZXN0XCIpLmFyaWEoXCJmbG93dG9cIik7ICAgICAgLy8gLT4gXCJmYWxzZVwiXG4gKiAkKFwiI3Rlc3RcIikuYXJpYVJlZihcImZsb3d0b1wiKTsgICAvLyAtPiBqUXVlcnkoPGRpdiBpZD1cImZhbHNlXCI+KVxuICogJChcIiN0ZXN0XCIpLmFyaWFTdGF0ZShcImZsb3d0b1wiKTsgLy8gLT4gZmFsc2VcbiAqL1xuJC5mbi5hcmlhID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuXG4gICAgcmV0dXJuIGFjY2VzcyhcbiAgICAgICAgdGhpcyxcbiAgICAgICAgcHJvcGVydHksXG4gICAgICAgIHZhbHVlXG4gICAgKTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL2FyaWFSZWYuanNcblxuXG5cbi8qKlxuICogR2V0cyBvciBzZXRzIGEgV0FJLUFSSUEgcmVmZXJlbmNlLiBUaGlzIGlzIGZ1bmN0aW9uYWxseSBpZGVudGljYWwgdG9cbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9IHdpdGggdGhlIG1haW4gZGlmZmVyZW5jZSBiZWluZyB0aGF0XG4gKiBhbiBlbGVtZW50IG1heSBiZSBwYXNzZWQgYXMgdGhlIDxjb2RlPnZhbHVlPC9jb2RlPiB3aGVuIHNldHRpbmcgYW5kIHRoYXQgYVxuICogalF1ZXJ5IG9iamVjdCBpcyByZXR1cm5lZCB3aGVuIGdldHRpbmcuXG4gKiA8YnI+PGJyPlxuICogQmVjYXVzZSBXQUktQVJJQSByZWZlcmVuY2VzIHdvcmsgd2l0aCBJRHMsIElEcyBhcmUgd29ya2VkIG91dCB1c2luZ1xuICogW2pRdWVyeSNpZGVudGlmeV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2lkZW50aWZ5fS4gQmUgYXdhcmUgdGhhdCBhbnkgc3RyaW5nXG4gKiBwYXNzZWQgdG8gW2pRdWVyeSNhcmlhUmVmXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYVJlZn0gd2lsbCBiZSB0cmVhdGVkXG4gKiBsaWtlIGEgQ1NTIHNlbGVjdG9yIGFuZCBsb29rZWQgdXAgd2l0aCB0aGUgcmVzdWx0cyBiZWluZyB1c2VkIHRvIHNldCB0aGVcbiAqIHByb3BlcnR5LiBJZiB5b3UgYWxyZWFkeSBoYXZlIHRoZSBJRCBhbmQgd2lzaCB0byBzZXQgaXQgd2l0aG91dCB0aGUgbG9va3VwLFxuICogdXNlIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LlxuICogPGJyPjxicj5cbiAqIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBpcyBhIGZ1bmN0aW9uIHRoZW4gdGhlIHJlc3VsdGluZyB2YWx1ZSBpcyBpZGVudGlmaWVkLlxuICogVGhpcyBjYW4gYmUgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3IgcGVyZm9ybWluZyBET00gdHJhdmVyc2FsIHRvIGZpbmQgdGhlXG4gKiByZWZlcmVuY2UgKHNlZSBleGFtcGxlcyBiZWxvdykuIEFzIHdpdGhcbiAqIFtqUXVlcnkjYXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I2FyaWF9LCBpZiB0aGUgPGNvZGU+dmFsdWU8L2NvZGU+IGZ1bmN0aW9uXG4gKiByZXR1cm5zIG5vdGhpbmcgb3IgcmV0dXJucyA8Y29kZT51bmRlZmluZWQ8L2NvZGU+IHRoZW4gbm8gYWN0aW9uIGlzIHRha2VuLlxuICogPGJyPjxicj5cbiAqIFdoZW4gYWNjZXNzaW5nIHRoZSBhdHRyaWJ1dGUgdXNpbmcgdGhpcyBmdW5jdGlvbiwgYSA8Y29kZT5qUXVlcnk8L2NvZGU+XG4gKiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZWZlcmVuY2UgaXMgcmV0dXJuZWQuIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBlbGVtZW50c1xuICogaW4gdGhlIGNvbGxlY3Rpb24sIG9ubHkgdGhlIHJlZmVyZW5jZSBmb3IgdGhlIGZpcnN0IGVsZW1lbnQgaXMgcmV0dXJuZWQuIFRvXG4gKiBnZXQgdGhlIHZhbHVlIG9mIHRoZSBhdHRyaWJ1dGUgcmF0aGVyIHRoYW4gdGhlIGVsZW1lbnQsIHVzZVxuICogW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0uXG4gKlxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQGluc3RhbmNlXG4gKiBAYWxpYXMgICAgYXJpYVJlZlxuICogQHBhcmFtICAgIHtPYmplY3R8U3RyaW5nfSBwcm9wZXJ0eVxuICogICAgICAgICAgIEVpdGhlciB0aGUgcHJvcGVydGllcyB0byBzZXQgaW4ga2V5L3ZhbHVlIHBhaXJzIG9yIHRoZSBuYW1lIG9mIHRoZVxuICogICAgICAgICAgIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSAgICB7QXR0cmlidXRlX0NhbGxiYWNrfGpRdWVyeV9wYXJhbX0gW3ZhbHVlXVxuICogICAgICAgICAgIFJlZmVyZW5jZSB0byBzZXQuXG4gKiBAcmV0dXJuICAge2pRdWVyeX1cbiAqICAgICAgICAgICBqUXVlcnkgb2JqZWN0IHJlcHJlc2VudGluZyBlaXRoZXIgdGhlIGVsZW1lbnRzIHRoYXQgd2VyZSBtb2RpZmllZFxuICogICAgICAgICAgICh3aGVuIHNldHRpbmcpIG9yIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQocykgKHdoZW4gZ2V0dGluZyAtIG1heSBiZVxuICogICAgICAgICAgIGFuIGVtcHR5IGpRdWVyeSBvYmplY3QpLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgcmVmZXJlbmNlczwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxoMT5IZWFkaW5nPC9oMT5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj5cbiAqIC8vICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCAuLi5cbiAqIC8vIDwvZGl2PlxuICpcbiAqICQoXCIub25lXCIpLmFyaWFSZWYoXCJsYWJlbGxlZGJ5XCIsICQoXCJoMVwiKSk7XG4gKiAvLyBvclxuICogJChcIi5vbmVcIikuYXJpYVJlZihcImxhYmVsbGVkYnlcIiwgXCJoMVwiKTtcbiAqIC8vIG9yXG4gKiAkKFwiLm9uZVwiKS5hcmlhUmVmKFwibGFiZWxsZWRieVwiLCAkKFwiaDFcIilbMF0pO1xuICogLy8gb3JcbiAqICQoXCIub25lXCIpLmFyaWFSZWYoe1xuICogICAgIGxhYmVsbGVkYnk6ICQoXCJoMVwiKSAvLyBvciBcImgxXCIgb3IgJChcImgxXCIpWzBdXG4gKiB9KTtcbiAqIC8vIEVhY2ggb2YgdGhlc2UgcmV0dXJuIGEgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgXCIub25lXCJcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGgxIGlkPVwiYW5vbnltb3VzMFwiPkhlYWRpbmc8L2gxPlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIGFyaWEtbGFiZWxsZWRieT1cImFub255bW91czBcIj5cbiAqIC8vICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCAuLi5cbiAqIC8vIDwvZGl2PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgcmVmZXJlbmNlcyB3aXRoIGEgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwianMtY29sbGFwc2VcIj5cbiAqIC8vICAgICA8ZGl2IGNsYXNzPVwianMtY29sbGFwc2UtY29udGVudFwiPlxuICogLy8gICAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCAuLi5cbiAqIC8vICAgICA8L2Rpdj5cbiAqIC8vICAgICA8YnV0dG9uIGNsYXNzPVwianMtY29sbGFwc2UtdG9nZ2xlXCI+XG4gKiAvLyAgICAgICAgIFRvZ2dsZVxuICogLy8gICAgIDwvYnV0dG9uPlxuICogLy8gPC9kaXY+XG4gKlxuICogJChcIi5qcy1jb2xsYXBzZS10b2dnbGVcIikuYXJpYVJlZihcImNvbnRyb2xzXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKlxuICogICAgIHJldHVybiAkKHRoaXMpXG4gKiAgICAgICAgIC5jbG9zZXN0KFwiLmpzLWNvbGxhcHNlXCIpXG4gKiAgICAgICAgIC5maW5kKFwiLmpzLWNvbGxhcHNlLWNvbnRlbnRcIik7XG4gKlxuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJqcy1jb2xsYXBzZVwiPlxuICogLy8gICAgIDxkaXYgY2xhc3M9XCJqcy1jb2xsYXBzZS1jb250ZW50XCIgaWQ9XCJhbm9ueW1vdXMwXCI+XG4gKiAvLyAgICAgICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IC4uLlxuICogLy8gICAgIDwvZGl2PlxuICogLy8gICAgIDxidXR0b24gY2xhc3M9XCJqcy1jb2xsYXBzZS10b2dnbGVcIiBhcmlhLWNvbnRyb2xzPVwiYW5vbnltb3VzMFwiPlxuICogLy8gICAgICAgICBUb2dnbGVcbiAqIC8vICAgICA8L2J1dHRvbj5cbiAqIC8vIDwvZGl2PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkdldHRpbmcgYSByZWZlcmVuY2U8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8aDEgaWQ9XCJhbm9ueW1vdXMwXCI+SGVhZGluZzwvaDE+XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgYXJpYS1sYWJlbGxlZGJ5PVwiYW5vbnltb3VzMFwiPlxuICogLy8gICAgIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0IC4uLlxuICogLy8gPC9kaXY+XG4gKlxuICogJChcIi5vbmVcIikuYXJpYVJlZihcImxhYmVsbGVkYnlcIik7IC8vIC0+ICQoPGgxPilcbiAqICQoXCIub25lXCIpLmFyaWFSZWYoXCJjb250cm9sc1wiKTsgICAvLyAtPiAkKClcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5WYWx1ZSBpcyB0cmVhdGVkIGxpa2UgYSBDU1Mgc2VsZWN0b3I8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8YnV0dG9uIGlkPVwiYnV0dG9uXCI+PC9idXR0b24+XG4gKiAvLyA8ZGl2IGlkPVwic2VjdGlvblwiPjwvZGl2PlxuICogLy8gPHNlY3Rpb24+PC9zZWN0aW9uPlxuICpcbiAqICQoXCIjYnV0dG9uXCIpLmFyaWFSZWYoXCJjb250cm9sc1wiLCBcInNlY3Rpb25cIik7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxidXR0b24gaWQ9XCJidXR0b25cIiBhcmlhLWNvbnRyb2xzPVwiYW5vbnltb3VzMFwiPjwvYnV0dG9uPlxuICogLy8gPGRpdiBpZD1cInNlY3Rpb25cIj48L2Rpdj5cbiAqIC8vIDxzZWN0aW9uIGlkPVwiYW5vbnltb3VzMFwiPjwvc2VjdGlvbj5cbiAqL1xuJC5mbi5hcmlhUmVmID0gZnVuY3Rpb24gKHByb3BlcnR5LCB2YWx1ZSkge1xuXG4gICAgcmV0dXJuIGFjY2VzcyhcbiAgICAgICAgdGhpcyxcbiAgICAgICAgcHJvcGVydHksXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBIQU5ETEVSX1JFRkVSRU5DRVxuICAgICk7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9pbnN0YW5jZS9hcmlhU3RhdGUuanNcblxuXG5cbi8qKlxuICogU2V0cyBvciBnZXRzIHRoZSBXQUktQVJJQSBzdGF0ZSBvZiB0aGUgY29sbGVjdGlvbi5cbiAqIDxicj48YnI+XG4gKiBXaGVuIHNldHRpbmcgdGhlIHN0YXRlLCBmYWxzZSwgXCJmYWxzZVwiIChhbnkgY2FzZSksIDAgYW5kIFwiMFwiIHdpbGwgYmVcbiAqIGNvbnNpZGVyZWQgZmFsc2UuIEFsbCBvdGhlciB2YWx1ZXMgd2lsbCBiZSBjb25zaWRlcmVkIHRydWUgZXhjZXB0IGZvciBcIm1peGVkXCJcbiAqIChhbnkgY2FzZSkgd2hpY2ggd2lsbCBzZXQgdGhlIHN0YXRlIHRvIFwibWl4ZWRcIi4gVGhlIGRpZmZlcnMgZnJvbVxuICogW2pRdWVyeSNhcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjYXJpYX0gd2hpY2ggd2lsbCBzaW1wbHkgc2V0IHRoZVxuICogYXR0cmlidXRlKHMpIHdpdGhvdXQgY29udmVydGluZyB0aGUgdmFsdWUuXG4gKiA8YnI+PGJyPlxuICogQWZ0ZXIgc2V0dGluZyB0aGUgc3RhdGUocyksIGEgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGFmZmVjdGVkXG4gKiBlbGVtZW50cyBpcyByZXR1cm5lZC4gVGhlIHN0YXRlIGZvciB0aGUgZmlyc3QgbWF0Y2hpbmcgZWxlbWVudCBpcyByZXR1cm5lZFxuICogd2hlbiBnZXR0aW5nLlxuICogPGJyPjxicj5cbiAqIEFsbCBhdHRyaWJ1dGVzIGFyZSBub3JtYWxpc2VkIC0gc2VlXG4gKiBbalF1ZXJ5Lm5vcm1hbGlzZUFyaWFde0BsaW5rIGV4dGVybmFsOmpRdWVyeS5ub3JtYWxpc2VBcmlhfSBmb3IgZnVsbCBkZXRhaWxzLlxuICpcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEBpbnN0YW5jZVxuICogQGFsaWFzICAgIGFyaWFTdGF0ZVxuICogQHBhcmFtICAgIHtPYmplY3R8U3RyaW5nfSBwcm9wZXJ0eVxuICogICAgICAgICAgIEVpdGhlciBhIGtleS92YWx1ZSBjb21iaW5hdGlvbiBwcm9wZXJ0aWVzIHRvIHNldCBvciB0aGUgbmFtZSBvZiB0aGVcbiAqICAgICAgICAgICBXQUktQVJJQSBzdGF0ZSB0byBzZXQuXG4gKiBAcGFyYW0gICAge0F0dHJpYnV0ZV9DYWxsYmFja3xCb29sZWFufE51bWJlcnxTdHJpbmd9IFt2YWx1ZV1cbiAqICAgICAgICAgICBWYWx1ZSBvZiB0aGUgYXR0cmlidXRlLlxuICogQHJldHVybiAgIHtBUklBX3N0YXRlfGpRdWVyeX1cbiAqICAgICAgICAgICBFaXRoZXIgdGhlIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBtb2RpZmllZCBlbGVtZW50c1xuICogICAgICAgICAgIChzZXR0aW5nKSBvciB0aGUgc3RhdGUgb2YgdGhlIGZpcnN0IG1hdGNoaW5nIGVsZW1lbnQuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+R2V0dGluZyBzdGF0ZTwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIiBhcmlhLWJ1c3k9XCJ0cnVlXCIgYXJpYS1jaGVja2VkPVwibWl4ZWRcIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIpOyAgICAvLyAtPiB0cnVlXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJjaGVja2VkXCIpOyAvLyAtPiBcIm1peGVkXCJcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImhpZGRlblwiKTsgIC8vIC0+IHVuZGVmaW5lZFxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldHRpbmcgc3RhdGU8L2NhcHRpb24+XG4gKiAvLyBFYWNoIG9mIHRoZXNlIHdpbGwgc2V0IHRoZSBzdGF0ZSB0byBmYWxzZTpcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJmYWxzZVwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJGQUxTRVwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgZmFsc2UpO1xuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKFwiYnVzeVwiLCAwKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCIwXCIpO1xuICpcbiAqIC8vIEVhY2ggb2YgdGhlc2Ugd2lsbCBzZXQgdGhlIHN0YXRlIHRvIFwibWl4ZWRcIjpcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIiwgXCJtaXhlZFwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImNoZWNrZWRcIiwgXCJNSVhFRFwiKTtcbiAqXG4gKiAvLyBFYWNoIG9mIHRoZXNlIHdpbGwgc2V0IHRoZSBzdGF0ZSB0byB0cnVlXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIFwidHJ1ZVwiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJUUlVFXCIpO1xuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKFwiYnVzeVwiLCB0cnVlKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgMSk7XG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIFwiMVwiKTtcbiAqIC8vIFdBUk5JTkc6IHRoZXNlIGFsc28gc2V0IHRoZSBzdGF0ZSB0byB0cnVlXG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIHt9KTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgbnVsbCk7XG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIFwibm90aGluZ1wiKTtcbiAqICQoXCIjb25lXCIpLmFyaWFTdGF0ZShcImJ1c3lcIiwgXCJcIik7XG4gKiAkKFwiI29uZVwiKS5hcmlhU3RhdGUoXCJidXN5XCIsIC0xKTtcbiAqXG4gKiAvLyBFYWNoIGV4YW1wbGUgcmV0dXJucyBhIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIFwiI29uZVwiIGFuZCBhbiBvYmplY3RcbiAqIC8vIGNhbiBiZSBwYXNzZWQgYXMgcGFyYW1ldGVycyBhcyB3ZWxsOlxuICogJChcIiNvbmVcIikuYXJpYVN0YXRlKHtcbiAqICAgICBidXN5OiB0cnVlXG4gKiB9KTtcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIHN0YXRlIHdpdGggYSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiPjwvZGl2PlxuICogLy8gPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ+XG4gKlxuICogJChcIi5jaGVja2JveFwiKS5hcmlhU3RhdGUoXCJjaGVja2VkXCIsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gKlxuICogICAgIHJldHVybiAkKHRoaXMpXG4gKiAgICAgICAgIC5uZXh0KFwiaW5wdXRbdHlwZT1cXFwiY2hlY2tib3hcXFwiXVwiKVxuICogICAgICAgICAucHJvcChcImNoZWNrZWRcIik7XG4gKlxuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJjaGVja2JveFwiIGFyaWEtY2hlY2tlZD1cInRydWVcIj48L2Rpdj5cbiAqIC8vIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxuICovXG4kLmZuLmFyaWFTdGF0ZSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcblxuICAgIHJldHVybiBhY2Nlc3MoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIHByb3BlcnR5LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgSEFORExFUl9TVEFURVxuICAgICk7XG5cbn07XG5cbi8vIFNvdXJjZTogL3NyYy9pbnN0YW5jZS9yZW1vdmVBcmlhLmpzXG5cblxuJC5mbi5leHRlbmQoe1xuXG4gICAgcmVtb3ZlQXJpYTogcmVtb3ZlQXR0cmlidXRlLFxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgW2pRdWVyeSNyZW1vdmVBcmlhXXtAbGluayBleHRlcm5hbDpqUXVlcnkjcmVtb3ZlQXJpYX0uXG4gICAgICpcbiAgICAgKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gICAgICogQGluc3RhbmNlXG4gICAgICogQGZ1bmN0aW9uXG4gICAgICogQHBhcmFtICAgIHtTdHJpbmd9IG5hbWVcbiAgICAgKiAgICAgICAgICAgV0FJLUFSSUEgYXR0cmlidXRlIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuICAge2pRdWVyeX1cbiAgICAgKiAgICAgICAgICAgalF1ZXJ5IGF0dHJpYnV0ZSByZXByZXNlbnRpbmcgdGhlIGVsZW1lbnRzIG1vZGlmaWVkLlxuICAgICAqL1xuICAgIHJlbW92ZUFyaWFSZWY6IHJlbW92ZUF0dHJpYnV0ZSxcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIFtqUXVlcnkjcmVtb3ZlQXJpYV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZUFyaWF9LlxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICAgICAqIEBpbnN0YW5jZVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSAgICB7U3RyaW5nfSBuYW1lXG4gICAgICogICAgICAgICAgIFdBSS1BUklBIGF0dHJpYnV0ZSB0byByZW1vdmUuXG4gICAgICogQHJldHVybiAgIHtqUXVlcnl9XG4gICAgICogICAgICAgICAgIGpRdWVyeSBhdHRyaWJ1dGUgcmVwcmVzZW50aW5nIHRoZSBlbGVtZW50cyBtb2RpZmllZC5cbiAgICAgKi9cbiAgICByZW1vdmVBcmlhU3RhdGU6IHJlbW92ZUF0dHJpYnV0ZVxuXG59KTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL3JvbGUuanNcblxuXG5cbi8qKlxuICogU2V0cyB0aGUgcm9sZSBvZiBhbGwgZWxlbWVudHMgaW4gdGhlIGNvbGxlY3Rpb24gb3IgZ2V0cyB0aGUgcm9sZSBvZiB0aGUgZmlyc3RcbiAqIGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb24sIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB0aGUgPGNvZGU+cm9sZTwvY29kZT5cbiAqIGFyZ3VtZW50IGlzIHByb3ZpZGVkLiBBcyBbalF1ZXJ5I3JvbGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNyb2xlfSBpcyBqdXN0IGFcbiAqIHdyYXBwZXIgZm9yIFtqUXVlcnkjYXR0cl17QGxpbmsgaHR0cDovL2FwaS5qcXVlcnkuY29tL2F0dHIvfSwgdGhlXG4gKiA8Y29kZT5yb2xlPC9jb2RlPiBwYXJhbWV0ZXIgY2FuIGFjdHVhbGx5IGJlIGFueSB2YWx1ZSB0eXBlIHRoYXQgdGhlIG9mZmljaWFsXG4gKiBkb2N1bWVudGF0aW9uIG1lbnRpb25zLlxuICogPGJyPjxicj5cbiAqIEFjY29yZGluZyB0byB0aGUgV0FJLUFSSUEgc3BlY3MsIGFuIGVsZW1lbnQgY2FuIGhhdmUgbXV0bGlwbGUgcm9sZXMgYXMgYVxuICogc3BhY2Utc2VwYXJhdGVkIGxpc3QuIFRoaXMgbWV0aG9kIHdpbGwgb25seSBzZXQgdGhlIHJvbGUgYXR0cmlidXRlIHRvIHRoZVxuICogZ2l2ZW4gc3RyaW5nIHdoZW4gc2V0dGluZy4gSWYgeW91IHdhbnQgdG8gbW9kaWZ5IHRoZSByb2xlcywgdXNlXG4gKiBbalF1ZXJ5I2FkZFJvbGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhZGRSb2xlfSBhbmRcbiAqIFtqUXVlcnkjcmVtb3ZlUm9sZV17QGxpbmsgZXh0ZXJuYWw6alF1ZXJ5I3JlbW92ZVJvbGV9LlxuICpcbiAqIEBtZW1iZXJvZiBleHRlcm5hbDpqUXVlcnlcbiAqIEBpbnN0YW5jZVxuICogQGFsaWFzICAgIHJvbGVcbiAqIEBwYXJhbSAgICB7QXR0cmlidXRlX0NhbGxiYWNrfFN0cmluZ30gW3JvbGVdXG4gKiAgICAgICAgICAgUm9sZSB0byBnZXQgb3IgZnVuY3Rpb24gdG8gc2V0IHRoZSByb2xlLlxuICogQHJldHVybiAgIHtqUXVlcnl8U3RyaW5nfHVuZGVmaW5lZH1cbiAqICAgICAgICAgICBFaXRoZXIgdGhlIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBlbGVtZW50cyB0aGF0IHdlcmVcbiAqICAgICAgICAgICBtb2RpZmllZCBvciB0aGUgcm9sZSB2YWx1ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLnJvbGUoXCJwcmVzZW50YXRpb25cIik7IC8vIC0+IGpRdWVyeSg8ZGl2IGlkPVwib25lXCI+KVxuICpcbiAqIC8vIE5vdyBtYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGlkPVwib25lXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLnJvbGUoKTsgLy8gLT4gXCJwcmVzZW50YXRpb25cIlxuICogJChcIiN0d29cIikucm9sZSgpOyAvLyAtPiB1bmRlZmluZWRcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXR0aW5nIGEgcm9sZSB3aXRoIGEgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGlkPVwib25lXCIgcm9sZT1cImJ1dHRvblwiPjwvZGl2PlxuICpcbiAqICQoXCIjb25lXCIpLnJvbGUoZnVuY3Rpb24gKGluZGV4LCBjdXJyZW50KSB7XG4gKiAgICAgcmV0dXJuIGN1cnJlbnQgKyBcIiB0b29sdGlwXCI7XG4gKiB9KTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBpZD1cIm9uZVwiIHJvbGU9XCJidXR0b24gdG9vbHRpcFwiPjwvZGl2PlxuICovXG4kLmZuLnJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xuXG4gICAgcmV0dXJuIHJvbGUgPT09IHVuZGVmaW5lZFxuICAgICAgICA/IHRoaXMuYXR0cihcInJvbGVcIilcbiAgICAgICAgOiB0aGlzLmF0dHIoXCJyb2xlXCIsIHJvbGUpO1xuXG59O1xuXG4vLyBTb3VyY2U6IC9zcmMvaW5zdGFuY2UvYWRkUm9sZS5qc1xuXG5cbi8qKlxuICogQWRkcyBhIHJvbGUgdG8gYSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzLiBUaGUgcm9sZSB3aWxsIG5vdCBiZSBhZGRlZCBpZiBpdCdzXG4gKiBlbXB0eSAoXCJcIiBvciB1bmRlZmluZWQpLCBpZiB0aGUgZnVuY3Rpb24gcmVzcG9uc2UgaXMgZW1wdHkgb3IgaWYgdGhlIGVsZW1lbnRcbiAqIGFscmVhZHkgaGFzIHRoYXQgcm9sZS4gSW4gdGhhdCB3YXkgaXQncyBzaW1pbGFyIHRvXG4gKiBbalF1ZXJ5I2FkZENsYXNzXXtAbGluayBodHRwczovL2FwaS5qcXVlcnkuY29tL2FkZENsYXNzL30uXG4gKlxuICogQG1lbWJlcm9mIGV4dGVybmFsOmpRdWVyeVxuICogQGluc3RhbmNlXG4gKiBAYWxpYXMgICAgYWRkUm9sZVxuICogQHBhcmFtICAgIHtBdHRyaWJ1dGVfQ2FsbGJhY2t8U3RyaW5nfSByb2xlXG4gKiAgICAgICAgICAgUm9sZShzKSB0byBhZGQgdG8gdGhlIG1hdGNoaW5nIGVsZW1lbnRzIG9yIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHRoZVxuICogICAgICAgICAgIHJvbGUocykgdG8gYWRkLlxuICogQHJldHVybiAgIHtqUXVlcnl9XG4gKiAgICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1hdGNoaW5nIGVsZW1lbnRzLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkFkZGluZyBhIHJvbGU8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXM6XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvZGl2PlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiPjwvZGl2PlxuICpcbiAqICQoXCIub25lXCIpLmFkZFJvbGUoXCJhbGVydFwiKTsgLy8gLT4galF1ZXJ5KDxkaXY+LCA8ZGl2PilcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwiYWxlcnRcIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5BZGRpbmcgYSByb2xlIHdpdGggYSBmdW5jdGlvbjwvY2FwdGlvbj5cbiAqIC8vIE1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9kaXY+XG4gKlxuICogJChcIi5vbmVcIikuYWRkUm9sZShmdW5jdGlvbiAoaW5kZXgsIGN1cnJlbnQpIHtcbiAqICAgICByZXR1cm4gXCJhbGVydCBjb21ib2JveFwiO1xuICogfSk7XG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwicHJlc2VudGF0aW9uIGFsZXJ0IGNvbWJvYm94XCI+PC9kaXY+XG4gKi9cbiQuZm4uYWRkUm9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XG5cbiAgICB2YXIgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbihyb2xlKTtcblxuICAgIHJldHVybiB0aGlzLnJvbGUoZnVuY3Rpb24gKGluZGV4LCBjdXJyZW50KSB7XG5cbiAgICAgICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvblxuICAgICAgICAgICAgPyByb2xlLmNhbGwodGhpcywgaW5kZXgsIGN1cnJlbnQpXG4gICAgICAgICAgICA6IHJvbGU7XG4gICAgICAgIHZhciByb2xlcyA9IHRvV29yZHMoY3VycmVudCk7XG5cbiAgICAgICAgdG9Xb3Jkcyh2YWx1ZSkuZm9yRWFjaChmdW5jdGlvbiAodmFsKSB7XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB2YWwgIT09IFwiXCJcbiAgICAgICAgICAgICAgICAmJiB2YWwgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICYmIHJvbGVzLmluZGV4T2YodmFsKSA8IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJvbGVzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcm9sZXMuam9pbihcIiBcIik7XG5cbiAgICB9KTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL3JlbW92ZVJvbGUuanNcblxuXG5cbi8qKlxuICogUmVtb3ZlcyByb2xlcyBmcm9tIHRoZSBjb2xsZWN0aW9uIG9mIGVsZW1lbnRzLiBJZiB0aGUgbWV0aG9kIGlzIGNhbGxlZFxuICogd2l0aG91dCBhbnkgYXJndW1lbnRzIHRoZW4gdGhlIHJvbGUgYXR0cmlidXRlIGl0c2VsZiBpcyByZW1vdmVkLiBCZSBhd2FyZVxuICogdGhhdCB0aGlzIGlzIG5vdCB0aGUgc2FtZSBhcyBwYXNzaW5nIGEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB1bmRlZmluZWQgLVxuICogc3VjaCBhbiBhY3Rpb24gd2lsbCBoYXZlIG5vIGVmZmVjdC5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICByZW1vdmVSb2xlXG4gKiBAcGFyYW0gICAge0F0dHJpYnV0ZV9DYWxsYmFja3xTdHJpbmd9IFtyb2xlXVxuICogICAgICAgICAgIFJvbGUocykgdG8gcmVtb3ZlIG9yIGEgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgdGhlIHJvbGUocykgdG8gcmVtb3ZlLlxuICogQHJldHVybiAgIHtqUXVlcnl9XG4gKiAgICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIG1hdGNoZWQgZWxlbWVudHMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UmVtb3ZpbmcgYSByb2xlPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwiYWxlcnRcIj48L2Rpdj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5yZW1vdmVSb2xlKFwiYWxlcnRcIik7IC8vIC0+IGpRdWVyeSg8ZGl2PiwgPGRpdj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9kaXY+XG4gKiAvLyA8ZGl2IGNsYXNzPVwib25lXCIgcm9sZT1cIlwiPjwvZGl2PlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvbXBsZXRlbHkgcmVtb3ZpbmcgYSByb2xlPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnRcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIiByb2xlPVwiYWxlcnRcIj48L2Rpdj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5yZW1vdmVSb2xlKCk7IC8vIC0+IGpRdWVyeSg8ZGl2PiwgPGRpdj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpczpcbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgY2xhc3M9XCJvbmVcIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5SZW1vdmluZyBhIHJvbGUgd2l0aCBhIGZ1bmN0aW9uPC9jYXB0aW9uPlxuICogLy8gTWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJwcmVzZW50YXRpb24gYWxlcnQgY29tYm9ib3hcIj48L2Rpdj5cbiAqXG4gKiAkKFwiLm9uZVwiKS5yZW1vdmVSb2xlKGZ1bmN0aW9uIChpbmRleCwgY3VycmVudCkge1xuICogICAgIHJldHVybiBjdXJyZW50XG4gKiAgICAgICAgIC5zcGxpdCgvXFxzKy8pXG4gKiAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHJvbGUpIHtcbiAqICAgICAgICAgICAgIHJldHVybiByb2xlLmluZGV4T2YoXCJhXCIpID4gLTE7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5qb2luKFwiIFwiKTtcbiAqICAgICAvLyBcInByZXNlbnRhdGlvbiBhbGVydFwiXG4gKiB9KTtcbiAqXG4gKiAvLyBOb3cgbWFya3VwIGlzOlxuICogLy8gPGRpdiBjbGFzcz1cIm9uZVwiIHJvbGU9XCJjb21ib2JveFwiPjwvZGl2PlxuICovXG4kLmZuLnJlbW92ZVJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xuXG4gICAgdmFyIGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb24ocm9sZSk7XG5cbiAgICByZXR1cm4gcm9sZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgID8gdGhpcy5yZW1vdmVBdHRyKFwicm9sZVwiKVxuICAgICAgICA6IHRoaXMucm9sZShmdW5jdGlvbiAoaW5kZXgsIGN1cnJlbnQpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaXNGdW5jdGlvblxuICAgICAgICAgICAgICAgID8gcm9sZS5jYWxsKHRoaXMsIGluZGV4LCBjdXJyZW50KVxuICAgICAgICAgICAgICAgIDogcm9sZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB0b1dvcmRzKHZhbHVlKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRvV29yZHMoY3VycmVudClcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChhUm9sZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVzLmluZGV4T2YoYVJvbGUpIDwgMDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIFwiKTtcblxuICAgICAgICB9KTtcblxufTtcblxuLy8gU291cmNlOiAvc3JjL2luc3RhbmNlL2FyaWFGb2N1c2FibGUuanNcblxuXG5cbi8qKlxuICogU2V0cyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0Y2hpbmcgZWxlbWVudHMgYXJlIGZvY3VzYWJsZS4gU3RyaW5ncywgbnVtYmVycyBhbmRcbiAqIGJvb2xlYW5zIGFyZSB1bmRlcnN0b29kIGFzIDxjb2RlPnN0YXRlPC9jb2RlPiAtIHNlZVxuICogW2pRdWVyeSNhcmlhU3RhdGVde0BsaW5rIGV4dGVybmFsOmpRdWVyeSNhcmlhU3RhdGV9IGZvciBmdWxsIGRldGFpbHMgYXMgdGhlXG4gKiBhbGdvcnl0aG0gaXMgdGhlIHNhbWUuXG4gKiA8YnI+PGJyPlxuICogQmUgYXdhcmUgdGhpcyB0aGlzIGZ1bmN0aW9uIHdpbGwgb25seSBtb2RpZnkgdGhlIG1hdGNoaW5nIGVsZW1lbnRzLCBpdCB3aWxsXG4gKiBub3QgY2hlY2sgYW55IHBhcmVudHMgb3IgbW9kaWZ5IGFueSBvdGhlciBlbGVtZW50cyB0aGF0IGNvdWxkIGFmZmVjdCB0aGVcbiAqIGZvY3VzYWJpbGl0eSBvZiB0aGUgZWxlbWVudC5cbiAqXG4gKiBAbWVtYmVyb2YgZXh0ZXJuYWw6alF1ZXJ5XG4gKiBAaW5zdGFuY2VcbiAqIEBhbGlhcyAgICBhcmlhRm9jdXNhYmxlXG4gKiBAcGFyYW0gICAge0F0dHJpYnV0ZV9DYWxsYmFja3xCb29sZWFufE51bWJlcnxTdHJpbmd9IHN0YXRlXG4gKiAgICAgICAgICAgU3RhdGUgdG8gc2V0LlxuICogQHJldHVybiAgIHtqUXVlcnl9XG4gKiAgICAgICAgICAgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGFmZmVjdGVkIGVsZW1lbnQocykuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U2V0dGluZyBmb2N1c2FiaWxpdHk8L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIj48L2Rpdj5cbiAqIC8vIDxkaXYgaWQ9XCJ0d29cIj48L2Rpdj5cbiAqXG4gKiAkKFwiI29uZVwiKS5hcmlhRm9jdXNhYmxlKGZhbHNlKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJvbmVcIj4pXG4gKiAkKFwiI3R3b1wiKS5hcmlhRm9jdXNhYmxlKHRydWUpOyAgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJ0d29cIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIHRhYmluZGV4PVwiMFwiPjwvZGl2PlxuICogLy8gPGRpdiBpZD1cInR3b1wiIHRhYmluZGV4PVwiLTFcIj48L2Rpdj5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5MaW1pdGF0aW9ucyBvZiB0aGUgZnVuY3Rpb248L2NhcHRpb24+XG4gKiAvLyBNYXJrdXAgaXNcbiAqIC8vIDxkaXYgaWQ9XCJvbmVcIiB0YWJpbmRleD1cIi0xXCI+XG4gKiAvLyAgICAgPGRpdiBpZD1cInR3b1wiIGRpc2FibGVkPjwvZGl2PlxuICogLy8gPC9kaXY+XG4gKlxuICogJChcIiN0d29cIikuYXJpYUZvY3VzYWJsZSh0cnVlKTsgLy8gLT4galF1ZXJ5KDxkaXYgaWQ9XCJ0d29cIj4pXG4gKlxuICogLy8gTm93IG1hcmt1cCBpc1xuICogLy8gPGRpdiBpZD1cIm9uZVwiIHRhYmluZGV4PVwiLTFcIj5cbiAqIC8vICAgICA8ZGl2IGlkPVwidHdvXCIgZGlzYWJsZWQgdGFiaW5kZXg9XCIwXCI+PC9kaXY+XG4gKiAvLyA8L2Rpdj5cbiAqL1xuJC5mbi5hcmlhRm9jdXNhYmxlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG5cbiAgICByZXR1cm4gdGhpcy5hdHRyKFxuICAgICAgICBcInRhYmluZGV4XCIsXG4gICAgICAgIGhhbmRsZXJzW0hBTkRMRVJfU1RBVEVdLnJlYWQoc3RhdGUpXG4gICAgICAgICAgICA/IDBcbiAgICAgICAgICAgIDogLTFcbiAgICApO1xuXG59O1xuXG59KGpRdWVyeSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pSWl3aWMyOTFjbU5sY3lJNld5SnFjWFZsY25rdVlYSnBZUzVxY3lKZExDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaUVnYW5GMVpYSjVMV0Z5YVdFZ0tHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOVRhMkYwWlhOcFpHVXZhbkYxWlhKNUxXRnlhV0VqY21WaFpHMWxLU0F0SUhZd0xqWXVNV0VnTFNCTlNWUWdiR2xqWlc1elpTQXRJREl3TVRjdE15MHlOaUFxTDF4dUtHWjFibU4wYVc5dUlDZ2tLU0I3WEc0Z0lDQWdYQ0oxYzJVZ2MzUnlhV04wWENJN1hHNWNiaTh2SUZOdmRYSmpaVG9nTDNOeVl5OWtiMk12Wm1sc1pTNXFjMXh1THlvcVhHNGdLaUJBWm1sc1pWeHVJQ29nVkdocGN5QnBjeUJoSUdwUmRXVnllU0J3YkhWbmFXNGdkR2hoZENCaFpHUnpJRzFsZEdodlpITWdabTl5SUcxaGJtbHdkV3hoZEdsdVp5QlhRVWt0UVZKSlFWeHVJQ29nWVhSMGNtbGlkWFJsY3k0Z1ZXNXNhV3RsSUc5MGFHVnlJSEJzZFdkcGJuTWdkR2hoZENCa2J5QnphVzFwYkdGeUlIUm9hVzVuY3l3Z2RHaHBjeUJ3YkhWbmFXNGdhR0Z6SUdKbFpXNWNiaUFxSUdSbGMybG5ibVZrSUhSdklHMWhkR05vSUdwUmRXVnllU2R6SUhOMGVXeGxJRzFoYTJsdVp5QnBkQ0J0ZFdOb0lHVmhjMmxsY2lCMGJ5QndhV05ySUhWd0xpQlVhR1VnY0d4MVoybHVYRzRnS2lCcGJtTnNkV1JsY3pwY2JpQXFJRHhpY2o0OFluSStYRzRnS2lBOGMzUnliMjVuUGtkbGRIUnBibWNnWVc1a0lGTmxkSFJwYm1jZ1YwRkpMVUZTU1VFZ1FYUjBjbWxpZFhSbGN6d3ZjM1J5YjI1blBseHVJQ29nUEdKeVBsdHFVWFZsY25rallYSnBZVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkyRnlhV0Y5SUdadmNpQm5aWFIwYVc1bklHRnVaQ0J6WlhSMGFXNW5YRzRnS2lCWFFVa3RRVkpKUVNCaGRIUnlhV0oxZEdWekxseHVJQ29nUEdKeVBsdHFVWFZsY25rallYSnBZVkpsWmwxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVJMkZ5YVdGU1pXWjlJR1p2Y2lCblpYUjBhVzVuSUdGdVpDQnpaWFIwYVc1blhHNGdLaUJ5WldabGNtVnVZMlZ6SUhSdklHOTBhR1Z5SUdWc1pXMWxiblJ6TGx4dUlDb2dQR0p5UGx0cVVYVmxjbmtqWVhKcFlWTjBZWFJsWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pZWEpwWVZOMFlYUmxmU0JtYjNJZ1oyVjBkR2x1WnlCaGJtUmNiaUFxSUhObGRIUnBibWNnYzNSaGRHVnpMbHh1SUNvZ1BHSnlQanhpY2o1Y2JpQXFJRHh6ZEhKdmJtYytVbVZ0YjNacGJtY2dWMEZKTFVGU1NVRWdRWFIwY21saWRYUmxjend2YzNSeWIyNW5QbHh1SUNvZ1BHSnlQbHRxVVhWbGNua2pjbVZ0YjNabFFYSnBZVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkzSmxiVzkyWlVGeWFXRjlJR1p2Y2lCeVpXMXZkbWx1WjF4dUlDb2dWMEZKTFVGU1NVRWdZWFIwY21saWRYUmxjeUFvWVd4cFlYTmxaQ0JoYzF4dUlDb2dXMnBSZFdWeWVTTnlaVzF2ZG1WQmNtbGhVbVZtWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pjbVZ0YjNabFFYSnBZVkpsWm4wZ1lXNWtYRzRnS2lCYmFsRjFaWEo1STNKbGJXOTJaVUZ5YVdGVGRHRjBaVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkzSmxiVzkyWlVGeWFXRlRkR0YwWlgwcExseHVJQ29nUEdKeVBqeGljajVjYmlBcUlEeHpkSEp2Ym1jK1FXUnFkWE4wYVc1bklGZEJTUzFCVWtsQklFRjBkSEpwWW5WMFpTQk5ZVzVwY0hWc1lYUnBiMjQ4TDNOMGNtOXVaejVjYmlBcUlEeGljajViYWxGMVpYSjVMbUZ5YVdGR2FYaGRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVM1aGNtbGhSbWw0ZlNCM2FXeHNJR052Ym5abGNuUWdkR2hsSUc1aGJXVnpJRzltWEc0Z0tpQlhRVWt0UVZKSlFTQmhkSFJ5YVdKMWRHVnpMbHh1SUNvZ1BHSnlQbHRxVVhWbGNua3VZWEpwWVVodmIydHpYWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25rdVlYSnBZVWh2YjJ0emZTQmhiR3h2ZHlCemNHVmphV0ZzWEc0Z0tpQm1kVzVqZEdsdmJtRnNhWFI1SUhSdklHSmxJR1JsWm1sdVpXUWdabTl5SUhOd1pXTnBabWxqSUZkQlNTMUJVa2xCSUdGMGRISnBZblYwWlhNdVhHNGdLaUE4WW5JK1BHSnlQbHh1SUNvZ1BITjBjbTl1Wno1TllXNXBjSFZzWVhScGJtY2dUR0Z1WkcxaGNtdHpQQzl6ZEhKdmJtYytYRzRnS2lBOFluSStXMnBSZFdWeWVTTnliMnhsWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pjbTlzWlgwc1hHNGdLaUJiYWxGMVpYSjVJMkZrWkZKdmJHVmRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVNOaFpHUlNiMnhsZlNCaGJtUmNiaUFxSUZ0cVVYVmxjbmtqY21WdGIzWmxVbTlzWlYxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVJM0psYlc5MlpWSnZiR1Y5SUdoaGJtUnNhVzVuSUZkQlNTMUJVa2xCWEc0Z0tpQnNZVzVrYldGeWEzTXVYRzRnS2lBOFluSStQR0p5UGx4dUlDb2dQSE4wY205dVp6NUlaV3h3WlhJZ1JuVnVZM1JwYjI1eklHWnZjaUJEYjIxdGIyNGdSblZ1WTNScGIyNWhiR2wwZVR3dmMzUnliMjVuUGx4dUlDb2dQR0p5UGx0cVVYVmxjbmtqYVdSbGJuUnBabmxkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTnBaR1Z1ZEdsbWVYMGdabTl5SUdkbGJtVnlZWFJwYm1jZ1pXeGxiV1Z1ZEZ4dUlDb2dTVVJ6SUdGeklHNWxZMlZ6YzJGeWVTNWNiaUFxSUR4aWNqNWJhbEYxWlhKNUkyRnlhV0ZHYjJOMWMyRmliR1ZkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTmhjbWxoUm05amRYTmhZbXhsZlNCbWIzSWdkRzluWjJ4cGJtZGNiaUFxSUdadlkzVnpZV0pwYkdsMGVTNWNiaUFxSUR4aWNqNWJhbEYxWlhKNUxtNXZjbTFoYkdselpVRnlhV0ZkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTNXViM0p0WVd4cGMyVkJjbWxoZlNCbWIzSmNiaUFxSUhOcGJYQnNhV1o1YVc1bklIUm9aU0JYUVVrdFFWSkpRU0JoZEhSeWFXSjFkR1Z6SUNoaGJHbGhjMlZrSUdGelhHNGdLaUJiYWxGMVpYSjVMbTV2Y20xaGJHbDZaVUZ5YVdGZGUwQnNhVzVySUdWNGRHVnlibUZzT21wUmRXVnllUzV1YjNKdFlXeHBlbVZCY21saGZTa3VYRzRnS2lBOFluSStQR0p5UGx4dUlDb2dWR2hsSUdacGJHVnpJR05oYmlCaVpTQmtiM2R1Ykc5aFpHVmtJRzl1WEc0Z0tpQmJSMmwwU0hWaVhYdEFiR2x1YXlCb2RIUndjem92TDJkcGRHaDFZaTVqYjIwdlUydGhkR1Z6YVdSbEwycHhkV1Z5ZVMxaGNtbGhmUzVjYmlBcVhHNGdLaUJBWVhWMGFHOXlJRXBoYldWeklGd2lVMnRoZEdWemFXUmxYQ0lnVEc5dVp5QThjMnM0Tldsa1pVQm9iM1J0WVdsc0xtTnZiVDVjYmlBcUlFQjJaWEp6YVc5dUlEQXVOaTR4WVZ4dUlDb2dRR3hwWTJWdWMyVWdUVWxVWEc0Z0tpOWNibHh1THk4Z1UyOTFjbU5sT2lBdmMzSmpMMlJ2WXk5bGVIUmxjbTVoYkM5cVVYVmxjbmt1YW5OY2JpOHFLbHh1SUNvZ1FHVjRkR1Z5Ym1Gc0lHcFJkV1Z5ZVZ4dUlDb2dRSE5sWlNCYmFsRjFaWEo1WFh0QWJHbHVheUJvZEhSd09pOHZhbkYxWlhKNUxtTnZiWDFjYmlBcUwxeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZaRzlqTDJOaGJHeGlZV05yTDBGMGRISnBZblYwWlY5RFlXeHNZbUZqYXk1cWMxeHVMeW9xWEc0Z0tpQlVhR1VnVzJwUmRXVnllU05oY21saFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqWVhKcFlYMHNYRzRnS2lCYmFsRjFaWEo1STJGeWFXRlNaV1pkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTmhjbWxoVW1WbWZTQmhibVJjYmlBcUlGdHFVWFZsY25rallYSnBZVk4wWVhSbFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqWVhKcFlWTjBZWFJsZlNCdFpYUm9iMlJ6SUdGc2JDQjBZV3RsWEc0Z0tpQm1kVzVqZEdsdmJuTWdkRzhnYzJWMElIUm9aV2x5SUhaaGJIVmxMaUJVYUdVZ1puVnVZM1JwYjI1eklHRnNiQ0JvWVhabElIUm9aU0J6WVcxbElITnBaMjVoZEhWeVpTeGNiaUFxSUdSbGMyTnlhV0psWkNCb1pYSmxMaUJKZENCcGN5QnBiWEJ2Y25SaGJuUWdkRzhnY21WdFpXMWlaWElnZEdoaGRDQjBhR1VnZG1Gc2RXVWdkR2hwY3lCbWRXNWpkR2x2Ymx4dUlDb2djbVYwZFhKdWN5QjNhV3hzSUdKbElIUnlaV0YwWldRZ1lYTWdhV1lnYVhRZ2FHRmtJRzl5YVdkcGJtRnNiSGtnWW1WbGJpQndZWE56WldRZ2RHOGdkR2hsWEc0Z0tpQm1kVzVqZEdsdmJpNGdVMlZsWEc0Z0tpQmJhbEYxWlhKNUkyRjBkSEpkZTBCc2FXNXJJR2gwZEhBNkx5OWhjR2t1YW5GMVpYSjVMbU52YlM5aGRIUnlMeU5oZEhSeUxXRjBkSEpwWW5WMFpVNWhiV1V0Wm5WdVkzUnBiMjU5WEc0Z0tpQm1iM0lnYlc5eVpTQnBibVp2Y20xaGRHbHZiaUJoYm1RZ1pYaGhiWEJzWlhNdVhHNGdLbHh1SUNvZ1FHTmhiR3hpWVdOcklFRjBkSEpwWW5WMFpWOURZV3hzWW1GamExeHVJQ29nUUhSb2FYTWdJQ0FnSUVoVVRVeEZiR1Z0Wlc1MFhHNGdLaUFnSUNBZ0lDQWdJQ0FnVkdobElHVnNaVzFsYm5RZ1ltVnBibWNnY21WbVpYSmxibU5sWkM1Y2JpQXFJRUJ3WVhKaGJTQWdJQ0I3VG5WdFltVnlmU0JwYm1SbGVGeHVJQ29nSUNBZ0lDQWdJQ0FnSUZSb1pTQnBibVJsZUNCdlppQjBhR1VnWTNWeWNtVnVkQ0JsYkdWdFpXNTBJR1p5YjIwZ2QybDBhR2x1SUhSb1pTQnZkbVZ5WVd4c0lHcFJkV1Z5ZVZ4dUlDb2dJQ0FnSUNBZ0lDQWdJR052Ykd4bFkzUnBiMjR1WEc0Z0tpQkFjR0Z5WVcwZ0lDQWdlMU4wY21sdVozeDFibVJsWm1sdVpXUjlJR0YwZEhKY2JpQXFJQ0FnSUNBZ0lDQWdJQ0JEZFhKeVpXNTBJR0YwZEhKcFluVjBaU0IyWVd4MVpTQW9kVzVrWldacGJtVmtJR2xtSUhSb1pTQmxiR1Z0Wlc1MElHUnZaWE1nYm05MFhHNGdLaUFnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkR3g1SUdoaGRtVWdkR2hsSUdGMGRISnBZblYwWlNCaGMzTnBaMjVsWkNrdVhHNGdLaUJBY21WMGRYSnVJQ0FnZTFOMGNtbHVaMzFjYmlBcUlDQWdJQ0FnSUNBZ0lDQlVhR1VnZG1Gc2RXVWdkR2hoZENCemFHOTFiR1FnWW1VZ2NHRnpjMlZrSUhSdklIUm9aU0JtZFc1amRHbHZiaTVjYmlBcVhHNGdLaUJBWlhoaGJYQnNaVnh1SUNvZ0pDaGNJaU52Ym1WY0lpa3VZWEpwWVNoY0lteGhZbVZzWENJc0lHWjFibU4wYVc5dUlDaHBMQ0JoZEhSeUtTQjdYRzRnS2lBZ0lDQWdjbVYwZFhKdUlGd2lWR1Z6ZEZ3aU8xeHVJQ29nZlNrN1hHNGdLaUF2THlCcGN5QjBhR1VnYzJGdFpTQmhjMXh1SUNvZ0pDaGNJaU52Ym1WY0lpa3VZWEpwWVNoY0lteGhZbVZzWENJc0lGd2lWR1Z6ZEZ3aUtUdGNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNUZiR1Z0Wlc1MGN5QjNhWFJvYjNWMElIUm9aU0JoZEhSeWFXSjFkR1VnY0dGemN5QjFibVJsWm1sdVpXUThMMk5oY0hScGIyNCtYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTmNiaUFxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUFrS0Z3aUkyOXVaVndpS1M1aGNtbGhLRndpYkdGaVpXeGNJaXdnWm5WdVkzUnBiMjRnS0drc0lHRjBkSElwSUh0Y2JpQXFJQ0FnSUNCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeTVqWVd4c0tHRjBkSElwTzF4dUlDb2dmU2s3WEc0Z0tseHVJQ29nTHk4Z1RtOTNJRzFoY210MWNDQnBjMXh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0YkdGaVpXdzlYQ0piYjJKcVpXTjBJRlZ1WkdWbWFXNWxaRjFjSWo0OEwyUnBkajVjYmlBcUwxeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZaRzlqTDNSNWNHVmtaV1l2UVZKSlFWOXpkR0YwWlM1cWMxeHVMeW9xWEc0Z0tpQkJJR0p2YjJ4bFlXNGdiM0lnZEdobElITjBjbWx1WnlCY0ltMXBlR1ZrWENJZ0tHRnNkMkY1Y3lCcGJpQnNiM2RsY2lCallYTmxLUzRnVkdocGN5QjBlWEJsSUhkcGJHeGNiaUFxSUdKbElIVnVaR1ZtYVc1bFpDQjNhR1Z1SUhSeWVXbHVaeUIwYnlCeVpXRmtJR0VnYzNSaGRHVWdkR2hoZENCb1lYTWdibTkwSUdKbFpXNGdjMlYwSUc5dUlIUm9aVnh1SUNvZ1pXeGxiV1Z1ZEM1Y2JpQXFYRzRnS2lCQWRIbHdaV1JsWmlCN1FtOXZiR1ZoYm54VGRISnBibWQ4ZFc1a1pXWnBibVZrZlNCQlVrbEJYM04wWVhSbFhHNGdLbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFJQzh2SUUxaGNtdDFjQ0JwYzF4dUlDb2dMeThnUEdScGRpQnBaRDFjSW05dVpWd2lJR0Z5YVdFdFkyaGxZMnRsWkQxY0luUnlkV1ZjSWo0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0owZDI5Y0lpQmhjbWxoTFdOb1pXTnJaV1E5WENKbVlXeHpaVndpUGp3dlpHbDJQbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJblJvY21WbFhDSWdZWEpwWVMxamFHVmphMlZrUFZ3aWJXbDRaV1JjSWo0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0ptYjNWeVhDSStQQzlrYVhZK1hHNGdLbHh1SUNvZ0pDaGNJaU52Ym1WY0lpa3VZWEpwWVZOMFlYUmxLRndpWTJobFkydGxaRndpS1RzZ0lDQXZMeUF0UGlCMGNuVmxYRzRnS2lBa0tGd2lJM1IzYjF3aUtTNWhjbWxoVTNSaGRHVW9YQ0pqYUdWamEyVmtYQ0lwT3lBZ0lDOHZJQzArSUdaaGJITmxYRzRnS2lBa0tGd2lJM1JvY21WbFhDSXBMbUZ5YVdGVGRHRjBaU2hjSW1Ob1pXTnJaV1JjSWlrN0lDOHZJQzArSUZ3aWJXbDRaV1JjSWx4dUlDb2dKQ2hjSWlObWIzVnlYQ0lwTG1GeWFXRlRkR0YwWlNoY0ltTm9aV05yWldSY0lpazdJQ0F2THlBdFBpQjFibVJsWm1sdVpXUmNiaUFxTDF4dVhHNHZMeUJUYjNWeVkyVTZJQzl6Y21NdlpHOWpMM1I1Y0dWa1pXWXZRVkpKUVY5b2IyOXJMbXB6WEc0dktpcGNiaUFxSUVFZ2FHOXZheUJtYjNJZ1lTQlhRVWt0UVZKSlFTQmhkSFJ5YVdKMWRHVXVJRVYyWlhKNUlIQnliM0JsY25SNUlHbHpJRzl3ZEdsdmJtRnNJSE52SUhSb1pYSmxJR2x6SUc1dlhHNGdLaUJ1WldWa0lIUnZJSE53WldOcFpua2diMjVsSUhSdklHVjRaV04xZEdVZ2RHaGxJR1JsWm1GMWJIUWdablZ1WTNScGIyNWhiR2wwZVM1Y2JpQXFJRHhpY2o0OFluSStYRzRnS2lCQ1pTQmhkMkZ5WlNCMGFHRjBJSFJvWlhObElHaHZiMnR6SUc5dWJIa2dZV1ptWldOMElIUm9aU0JoY21saElHMWxkR2h2WkhNN1hHNGdLaUJiYWxGMVpYSjVJMkYwZEhKZGUwQnNhVzVySUdoMGRIQTZMeTloY0drdWFuRjFaWEo1TG1OdmJTOWhkSFJ5TDMwZ1lXNWtYRzRnS2lCYmFsRjFaWEo1STNCeWIzQmRlMEJzYVc1cklHaDBkSEE2THk5aGNHa3VhbkYxWlhKNUxtTnZiUzl3Y205d0wzMGdkMmxzYkNCdWIzUWdZbVVnWVdabVpXTjBaV1FnWW5rZ1lXNTVYRzRnS2lCamFHRnVaMlZ6SUdobGNtVXVJRlJvWlhKbElHRnlaU0J6YVcxcGJHRnlJRHhqYjJSbFBtcFJkV1Z5ZVM1aGRIUnlTRzl2YTNNOEwyTnZaR1UrSUdGdVpGeHVJQ29nUEdOdlpHVSthbEYxWlhKNUxuQnliM0JJYjI5cmN6d3ZZMjlrWlQ0Z0tHWnZjaUJ6WlhRZ1lXNWtJR2RsZENrZ2RHaGhkQ0IzYjNKcklHbHVJSFJvWlNCellXMWxJSGRoZVNCcFpseHVJQ29nZVc5MUlHNWxaV1FnZEc4Z1kyOXRjR3hsZEdWc2VTQmpiMjUwY205c0lHRjBkSEpwWW5WMFpTOXdjbTl3WlhKMGVTQnpaWFIwYVc1bkxseHVJQ3BjYmlBcUlFQjBlWEJsWkdWbUlDQjdUMkpxWldOMGZTQWdJQ0FnSUNBZ0lDQkJVa2xCWDJodmIydGNiaUFxSUVCd2NtOXdaWEowZVNCN1FWSkpRVjlvYjI5clgzTmxkSDBnSUNCYmMyVjBYVnh1SUNvZ0lDQWdJQ0FnSUNBZ0lFaGhibVJzWlhNZ2MyVjBkR2x1WnlCMGFHVWdZWFIwY21saWRYUmxMbHh1SUNvZ1FIQnliM0JsY25SNUlIdEJVa2xCWDJodmIydGZaMlYwZlNBZ0lGdG5aWFJkWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdTR0Z1Wkd4bGN5Qm5aWFIwYVc1bklIUm9aU0JoZEhSeWFXSjFkR1V1WEc0Z0tpQkFjSEp2Y0dWeWRIa2dlMEZTU1VGZmFHOXZhMTlvWVhOOUlDQWdXMmhoYzExY2JpQXFJQ0FnSUNBZ0lDQWdJQ0JJWVc1a2JHVnljeUJqYUdWamEybHVaeUIzYUdWMGFHVnlJRzl5SUc1dmRDQjBhR1VnWVhSMGNtbGlkWFJsSUdseklHRnpjMmxuYm1Wa0xseHVJQ29nUUhCeWIzQmxjblI1SUh0QlVrbEJYMmh2YjJ0ZmRXNXpaWFI5SUZ0MWJuTmxkRjFjYmlBcUlDQWdJQ0FnSUNBZ0lDQklZVzVrYkdWeklISmxiVzkyYVc1bklIUm9aU0JoZEhSeWFXSjFkR1V1WEc0Z0tpOWNibHh1THlvcVhHNGdLaUJJWVc1a2JHVnpJSFJvWlNCelpYUjBhVzVuSUc5bUlHRWdWMEZKTFVGU1NVRWdZWFIwY21saWRYUmxMaUJKWmlCMGFHVWdablZ1WTNScGIyNGdjbVYwZFhKdWN5QmhJSFpoYkhWbExGeHVJQ29nZEdoaGRDQjJZV3gxWlNCcGN5QjFjMlZrSUhSdklITmxkQ0IwYUdVZ1lYUjBjbWxpZFhSbE95QnlaWFIxY201cGJtY2diblZzYkN3Z2RXNWtaV1pwYm1Wa0xDQnZjaUJ1YjNSY2JpQXFJSEpsZEhWeWJtbHVaeUJoYm5sMGFHbHVaeUIzYVd4c0lIQnlaWFpsYm5RZ2RHaGxJRzV2Y20xaGJDQmhkSFJ5YVdKMWRHVWdjMlYwZEdsdVp5QndjbTlqWlhOeklHWnliMjFjYmlBcUlHTnZiWEJzWlhScGJtY3VYRzRnS2lBOFluSStQR0p5UGx4dUlDb2dWMmhsYmlCelpYUjBhVzVuSUdGdUlHRjBkSEpwWW5WMFpTd2djR3hsWVhObElHUnZJRzV2ZENCMWMyVmNiaUFxSUZ0cVVYVmxjbmtqWVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STJGeWFXRjlMRnh1SUNvZ1cycFJkV1Z5ZVNOaGNtbGhVbVZtWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pZWEpwWVZKbFpuMGdiM0pjYmlBcUlGdHFVWFZsY25rallYSnBZVk4wWVhSbFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqWVhKcFlWTjBZWFJsZlNCaGN5QjBhR2x6SUdOaGJpQmpjbVZoZEdVZ1lXNWNiaUFxSUdsdVptbHVhWFJsSUd4dmIzQXVYRzRnS2x4dUlDb2dRSFI1Y0dWa1pXWWdlMFoxYm1OMGFXOXVmU0FnSUNCQlVrbEJYMmh2YjJ0ZmMyVjBYRzRnS2lCQWNHRnlZVzBnSUNCN1NGUk5URVZzWlcxbGJuUjlJQ0FnSUNBZ0lDQWdJQ0JsYkdWdFpXNTBYRzRnS2lBZ0lDQWdJQ0FnSUNCRmJHVnRaVzUwSUhkb2IzTmxJR0YwZEhKcFluVjBaU0J6YUc5MWJHUWdZbVVnYlc5a2FXWnBaV1F1WEc0Z0tpQkFjR0Z5WVcwZ0lDQjdRbTl2YkdWaGJueE9kVzFpWlhKOFUzUnlhVzVuZlNCMllXeDFaVnh1SUNvZ0lDQWdJQ0FnSUNBZ1ZtRnNkV1VnYjJZZ2RHaGxJR0YwZEhKcFluVjBaU0JwYmlCMGFHVWdabTl5YlNCbmFYWmxiaUIwYnlCMGFHVWdZWEpwWVNCbWRXNWpkR2x2Ymk1Y2JpQXFJRUJ3WVhKaGJTQWdJSHRUZEhKcGJtZDlJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHRjBkSEpwWW5WMFpWeHVJQ29nSUNBZ0lDQWdJQ0FnUm5Wc2JDQmhkSFJ5YVdKMWRHVWdibUZ0WlN3Z2JHOTNaWElnWTJGelpTQmhibVFnYVc1amJIVmthVzVuSUZ3aVlYSnBZUzFjSWlCd2NtVm1hWGd1WEc0Z0tpQkFjbVYwZFhKdUlDQjdQMzFjYmlBcUlDQWdJQ0FnSUNBZ0lGQnZjM05wWW14bElHTnZiblpsY25OcGIyNGdiMllnZEdobElIWmhiSFZsTGx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGxObGRIUnBibWNnWm1samRHbDBhVzkxY3lCY0luWnZiSFZ0WlZ3aUlHOXlJRndpYzI5MWJtUnpaWFIxY0Z3aUlHRjBkSEpwWW5WMFpYTThMMk5oY0hScGIyNCtYRzRnS2lBa0xtRnlhV0ZJYjI5cmN5NTJiMngxYldVZ1BTQjdYRzRnS2lBZ0lDQWdMeThnVEdWMEozTWdZWE56ZFcxbElIUm9ZWFFnZEdobElIWmhiSFZsSUcxMWMzUWdZbVVnWVNCd2IzTnBkR2wyWlNCcGJuUmxaMlZ5SUdGdVpDQjBhR0YwSUdGdWVWeHVJQ29nSUNBZ0lDOHZJRzkwYUdWeUlIWmhiSFZsSUhOb2IzVnNaQ0JpWlNCcFoyNXZjbVZrTGx4dUlDb2dJQ0FnSUhObGREb2dablZ1WTNScGIyNGdLR1ZzWlcxbGJuUXNJSFpoYkhWbExDQmhkSFJ5YVdKMWRHVXBJSHRjYmlBcUlDQWdJQ0FnSUNBZ2RtRnlJSEJ2YzBsdWRDQTlJRTFoZEdndVpteHZiM0lvVFdGMGFDNWhZbk1vZG1Gc2RXVXBLVHRjYmlBcUlDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdselRtRk9LSEJ2YzBsdWRDbGNiaUFxSUNBZ0lDQWdJQ0FnSUNBZ0lEOGdkVzVrWldacGJtVmtYRzRnS2lBZ0lDQWdJQ0FnSUNBZ0lDQTZJSEJ2YzBsdWREdGNiaUFxSUNBZ0lDQjlYRzRnS2lCOU8xeHVJQ29nSkM1aGNtbGhTRzl2YTNNdWMyOTFibVJ6WlhSMWNDQTlJSHRjYmlBcUlDQWdJQ0F2THlCTVpYUW5jeUJoYzNOMWJXVWdkR2hoZENCMGFHVWdkbUZzZFdVZ1kyRnVJRzl1YkhrZ1ltVWdjMjl0WlhSb2FXNW5JR2x1SUdFZ2MyVjBJR3hwYzNRZ1lXNWtYRzRnS2lBZ0lDQWdMeThnZEdoaGRDQmxkbVZ5ZVhSb2FXNW5JR1ZzYzJVZ2MyaHZkV3hrSUdKbElHbG5ibTl5WldRdVhHNGdLaUFnSUNBZ2MyVjBPaUJtZFc1amRHbHZiaUFvWld4bGJXVnVkQ3dnZG1Gc2RXVXNJR0YwZEhKcFluVjBaU2tnZTF4dUlDb2dJQ0FnSUNBZ0lDQjJZWElnZG1Gc2RXVnpJRDBnVzF3aWJXOXViMXdpTENCY0luTjBaWEpsYjF3aUxDQmNJalV1TVZ3aVhUdGNiaUFxSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFpoYkhWbGN5NXBibVJsZUU5bUtIWmhiSFZsS1NBK0lDMHhYRzRnS2lBZ0lDQWdJQ0FnSUNBZ0lDQS9JSFpoYkhWbFhHNGdLaUFnSUNBZ0lDQWdJQ0FnSUNBNklIVnVaR1ZtYVc1bFpEdGNiaUFxSUNBZ0lDQjlYRzRnS2lCOU8xeHVJQ3BjYmlBcUlDOHZJRTFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lqNDhMMlJwZGo1Y2JpQXFJQzh2SUR4a2FYWWdhV1E5WENKMGQyOWNJajQ4TDJScGRqNWNiaUFxWEc0Z0tpQWtLRndpSTI5dVpWd2lLUzVoY21saEtIdGNiaUFxSUNBZ0lDQjJiMngxYldVNklEVXNYRzRnS2lBZ0lDQWdjMjkxYm1SelpYUjFjRG9nWENKdGIyNXZYQ0pjYmlBcUlIMHBPMXh1SUNvZ0pDaGNJaU4wZDI5Y0lpa3VZWEpwWVNoN1hHNGdLaUFnSUNBZ2RtOXNkVzFsT2lCY0lteHZkV1JjSWl4Y2JpQXFJQ0FnSUNCemIzVnVaSE5sZEhWd09pQmNJbXhsWjJWdVpHRnllVndpWEc0Z0tpQjlLVHRjYmlBcVhHNGdLaUF2THlCT2IzY2diV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0ZG05c2RXMWxQVndpTlZ3aUlHRnlhV0V0YzI5MWJtUnpaWFIxY0QxY0ltMXZibTljSWo0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0owZDI5Y0lqNDhMMlJwZGo1Y2JpQXFMMXh1WEc0dktpcGNiaUFxSUVoaGJtUnNaWE1nZEdobElHZGxkSFJwYm1jZ2IyWWdZU0JYUVVrdFFWSkpRU0JoZEhSeWFXSjFkR1V1SUZSb1pTQm1kVzVqZEdsdmJpQjBZV3RsY3lCMGFHVWdaV3hsYldWdWRGeHVJQ29nWVc1a0lITm9iM1ZzWkNCeVpYUjFjbTRnZEdobElIWmhiSFZsSUhSb1lYUWdkR2hsSUdwUmRXVnllU0JoY21saElHMWxkR2h2WkhNZ2MyaHZkV3hrSUhKbGRIVnliaTVjYmlBcUlEeGljajQ4WW5JK1hHNGdLaUJYYUdWdUlHZGxkSFJwYm1jZ1lXNGdZWFIwY21saWRYUmxMQ0J3YkdWaGMyVWdaRzhnYm05MElIVnpaVnh1SUNvZ1cycFJkV1Z5ZVNOaGNtbGhYWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25rallYSnBZWDBzWEc0Z0tpQmJhbEYxWlhKNUkyRnlhV0ZTWldaZGUwQnNhVzVySUdWNGRHVnlibUZzT21wUmRXVnllU05oY21saFVtVm1mU0J2Y2x4dUlDb2dXMnBSZFdWeWVTTmhjbWxoVTNSaGRHVmRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVNOaGNtbGhVM1JoZEdWOUlHRnpJSFJvYVhNZ1kyRnVJR055WldGMFpTQmhibHh1SUNvZ2FXNW1hVzVwZEdVZ2JHOXZjQzVjYmlBcVhHNGdLaUJBZEhsd1pXUmxaaUI3Um5WdVkzUnBiMjU5SUNBZ0lFRlNTVUZmYUc5dmExOW5aWFJjYmlBcUlFQndZWEpoYlNBZ0lIdElWRTFNUld4bGJXVnVkSDBnWld4bGJXVnVkRnh1SUNvZ0lDQWdJQ0FnSUNBZ1JXeGxiV1Z1ZENCM2FHOXpaU0JoZEhSeWFXSjFkR1VnZG1Gc2RXVWdjMmh2ZFd4a0lHSmxJSEpsZEhWeWJtVmtMbHh1SUNvZ1FIQmhjbUZ0SUNBZ2UxTjBjbWx1WjMwZ0lDQWdJQ0JoZEhSeWFXSjFkR1ZjYmlBcUlDQWdJQ0FnSUNBZ0lFWjFiR3dnWVhSMGNtbGlkWFJsSUc1aGJXVXNJR3h2ZDJWeUlHTmhjMlVnWVc1a0lHbHVZMngxWkdsdVp5QmNJbUZ5YVdFdFhDSWdjSEpsWm1sNExseHVJQ29nUUhKbGRIVnliaUFnZXo5Q2IyOXNaV0Z1ZkU1MWJXSmxjbnhUZEhKcGJtZDlYRzRnS2lBZ0lDQWdJQ0FnSUNCV1lXeDFaU0J2WmlCMGFHVWdZWFIwY21saWRYUmxMbHh1SUNwY2JpQXFJRUJsZUdGdGNHeGxJRHhqWVhCMGFXOXVQa2RsZEhScGJtY2dZU0JtYVdOMGFYUnBiM1Z6SUZ3aWRtOXNkVzFsWENJZ1lYUjBjbWxpZFhSbFBDOWpZWEIwYVc5dVBseHVJQ29nSkM1aGNtbGhTRzl2YTNNdWRtOXNkVzFsSUQwZ2UxeHVJQ29nSUNBZ0lDOHZJRXhsZENkeklHRnpjM1Z0WlNCMGFHRjBJSFJvWlNCMllXeDFaU0IzYVd4c0lHSmxJR0VnY0c5emFYUnBkbVVnYVc1MFpXZGxjaUJoYm1RZ2FXWWdhWFJjYmlBcUlDQWdJQ0F2THlCamIyNTBZV2x1Y3lCaGJtOTBhR1Z5SUhaaGJIVmxMQ0J2Y2lCcGN5QnRhWE56YVc1bkxDQnBkQ0JrWldaaGRXeDBjeUIwYnlBd0xseHVJQ29nSUNBZ0lHZGxkRG9nWm5WdVkzUnBiMjRnS0dWc1pXMWxiblFzSUdGMGRISnBZblYwWlNrZ2UxeHVJQ29nSUNBZ0lDQWdJQ0IyWVhJZ2RtRnNkV1VnUFNCbGJHVnRaVzUwTG1kbGRFRjBkSEpwWW5WMFpTaGhkSFJ5YVdKMWRHVXBPMXh1SUNvZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnS0haaGJIVmxJRDA5UFNCdWRXeHNJSHg4SUdselRtRk9LSFpoYkhWbEtTQjhmQ0IyWVd4MVpTQThJREFwWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdJQ0EvSURCY2JpQXFJQ0FnSUNBZ0lDQWdJQ0FnSURvZ1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrN1hHNGdLaUFnSUNBZ2ZWeHVJQ29nZlR0Y2JpQXFYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTTZYRzRnS2lBdkx5QThaR2wySUdsa1BWd2liMjVsWENJZ1lYSnBZUzEyYjJ4MWJXVTlYQ0kxWENJK1BDOWthWFkrWEc0Z0tpQXZMeUE4WkdsMklHbGtQVndpZEhkdlhDSWdZWEpwWVMxMmIyeDFiV1U5WENKc2IzVmtYQ0krUEM5a2FYWStYRzRnS2x4dUlDb2dKQ2hjSWlOdmJtVmNJaWt1WVhKcFlTaGNJblp2YkhWdFpWd2lLVHNnTHk4Z0xUNGdOVnh1SUNvZ0pDaGNJaU4wZDI5Y0lpa3VZWEpwWVNoY0luWnZiSFZ0WlZ3aUtUc2dMeThnTFQ0Z01GeHVJQ292WEc1Y2JpOHFLbHh1SUNvZ1NHRnVaR3hsY3lCamFHVmphMmx1WnlCM2FHVjBhR1Z5SUc5eUlHNXZkQ0IwYUdVZ1YwRkpMVUZTU1VFZ1lYUjBjbWxpZFhSbElHVjRhWE4wY3lCdmJpQjBhR1VnWld4bGJXVnVkRnh1SUNvZ1lXNWtJR2wwSUhOb2IzVnNaQ0J5WlhSMWNtNGdZU0JpYjI5c1pXRnVMaUJEZFhKeVpXNTBiSGtnZEdocGN5Qm1kVzVqZEdsdmJtRnNhWFI1SUdseklHNXZkQ0JsZUhCdmMyVmtYRzRnS2lCcGJpQmhiaUJoY21saElHMWxkR2h2WkN3Z1luVjBJSFJvWlNCbGVHbHpkR1Z1WTJVZ2IyWWdZU0JYUVVrdFFWSkpRU0JoZEhSeWFXSjFkR1VnZDJsc2JDQmlaU0JqYUdWamEyVmtYRzRnS2lCaVpXWnZjbVVnWjJWMGRHbHVaeUJ2WTJOMWNuTWdLR0Z1WkNCMGFHVWdlMEJzYVc1cklFRlNTVUZmYUc5dmExOW5aWFI5SUdaMWJtTjBhVzl1SUdWNFpXTjFkR1Z6S1M1Y2JpQXFYRzRnS2lCQWRIbHdaV1JsWmlCN1JuVnVZM1JwYjI1OUlDQWdJRUZTU1VGZmFHOXZhMTlvWVhOY2JpQXFJRUJ3WVhKaGJTQWdJSHRJVkUxTVJXeGxiV1Z1ZEgwZ1pXeGxiV1Z1ZEZ4dUlDb2dJQ0FnSUNBZ0lDQWdSV3hsYldWdWRDQjNhRzl6WlNCaGRIUnlhV0oxZEdVZ2MyaHZkV3hrSUdKbElHTm9aV05yWldRdVhHNGdLaUJBY0dGeVlXMGdJQ0I3VTNSeWFXNW5mU0FnSUNBZ0lHRjBkSEpwWW5WMFpWeHVJQ29nSUNBZ0lDQWdJQ0FnUm5Wc2JDQmhkSFJ5YVdKMWRHVWdibUZ0WlN3Z2JHOTNaWElnWTJGelpTQmhibVFnYVc1amJIVmthVzVuSUZ3aVlYSnBZUzFjSWlCd2NtVm1hWGd1WEc0Z0tpQkFjbVYwZFhKdUlDQjdRbTl2YkdWaGJuMWNiaUFxSUNBZ0lDQWdJQ0FnSUZkb1pYUm9aWElnYjNJZ2JtOTBJSFJvWlNCaGRIUnlhV0oxZEdVZ1pYaHBjM1J6SUc5dUlIUm9aU0JsYkdWdFpXNTBJQ2gwY25WbElHbG1JR2wwWEc0Z0tpQWdJQ0FnSUNBZ0lDQmtiMlZ6TENCbVlXeHpaU0J2ZEdobGNuZHBjMlVwTGx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGtOb1pXTnJhVzVuSUdadmNpQmhJR1pwWTNScGRHbHZkWE1nWENKMmIyeDFiV1ZjSWlCaGRIUnlhV0oxZEdVOEwyTmhjSFJwYjI0K1hHNGdLaUFrTG1GeWFXRkliMjlyY3k1MmIyeDFiV1VnUFNCN1hHNGdLaUFnSUNBZ1oyVjBPaUJtZFc1amRHbHZiaUFvWld4bGJXVnVkQ3dnWVhSMGNtbGlkWFJsS1NCN1hHNGdLaUFnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0Z3aWFHbGNJaWs3WEc0Z0tpQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCbGJHVnRaVzUwTG1kbGRFRjBkSEpwWW5WMFpTaGhkSFJ5YVdKMWRHVXBPMXh1SUNvZ0lDQWdJSDBzWEc0Z0tpQWdJQ0FnTHk4Z1RHVjBKM01nWVhOemRXMWxJSFJvWVhRZ2RHaGxJR0YwZEhKcFluVjBaU0JvWVhNZ2RHOGdZMjl1ZEdGcGJpQmhJSEJ2YzJsMGFYWmxJR2x1ZEdWblpYSWdZVzVrWEc0Z0tpQWdJQ0FnTHk4Z2QybHNiQ0JpWlNCamIyNXphV1JsY21Wa0lHNXZiaTFsZUdsemRHVnVkQ0JwWmlCcGRDQmpiMjUwWVdsdWN5QmhibmwwYUdsdVp5QmxiSE5sTGx4dUlDb2dJQ0FnSUdoaGN6b2dablZ1WTNScGIyNGdLR1ZzWlcxbGJuUXNJR0YwZEhKcFluVjBaU2tnZTF4dUlDb2dJQ0FnSUNBZ0lDQjJZWElnZG1Gc2RXVWdQU0JsYkdWdFpXNTBMbWRsZEVGMGRISnBZblYwWlNoaGRIUnlhV0oxZEdVcE8xeHVJQ29nSUNBZ0lDQWdJQ0IyWVhJZ2FXNTBWbUZzSUQwZ2NHRnljMlZKYm5Rb2RtRnNkV1VzSURFd0tUdGNiaUFxSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFpoYkhWbElDRTlQU0J1ZFd4c0lDWW1JR2x1ZEZaaGJDQTlQVDBnSzNaaGJIVmxJQ1ltSUdsdWRGWmhiQ0E4UFNBd08xeHVJQ29nSUNBZ0lIMWNiaUFxSUgwN1hHNGdLbHh1SUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0ZG05c2RXMWxQVndpTlZ3aVBqd3ZaR2wyUGx4dUlDb2dMeThnUEdScGRpQnBaRDFjSW5SM2Ixd2lJR0Z5YVdFdGRtOXNkVzFsUFZ3aWJHOTFaRndpUGp3dlpHbDJQbHh1SUNwY2JpQXFJQ1FvWENJamIyNWxYQ0lwTG1GeWFXRW9YQ0oyYjJ4MWJXVmNJaWs3WEc0Z0tpQXZMeUJNYjJkek9pQmNJbWhwWENKY2JpQXFJQzh2SUMwK0lGd2lOVndpWEc0Z0tpQWtLRndpSTNSM2Ixd2lLUzVoY21saEtGd2lkbTlzZFcxbFhDSXBPeUF2THlBdFBpQjFibVJsWm1sdVpXUmNiaUFxTDF4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCMGJ5QnpaV1VnYVdZZ2RHaGxJRmRCU1MxQlVrbEJJR0YwZEhKcFluVjBaU0J6YUc5MWJHUWdZbVVnY21WdGIzWmxaQzRnU1dZZ2RHaGxJR1oxYm1OMGFXOXVYRzRnS2lCeVpYUjFjbTV6SUR4amIyUmxQblJ5ZFdVOEwyTnZaR1UrSUNodmNpQmhJSFJ5ZFhSb2VTQjJZV3gxWlNrZ2RHaGxiaUIwYUdVZ1lYUjBjbWxpZFhSbElIZHBiR3dnWW1WY2JpQXFJSEpsYlc5MlpXUXNJR0VnWm1Gc2Mza2dkbUZzZFdVZ2QybHNiQ0J3Y21WMlpXNTBJSFJvWlNCaGRIUnlhV0oxZEdVZ1ltVnBibWNnY21WdGIzWmxaQ0IwYUhKdmRXZG9JSFJvWlZ4dUlDb2dZWEpwWVNCdFpYUm9iMlJ6SUNoaGJIUm9iM1ZuYUNCMGFHVnlaU0JwY3lCdWIzUm9hVzVuSUhOMGIzQndhVzVuSUdsMElHSmxhVzVuSUhKbGJXOTJaV1FnYVc0Z1lXNXZkR2hsY2x4dUlDb2dkMkY1SUc5eUlHVjJaVzRnZEdoeWIzVm5hQ0IwYUdVZ1puVnVZM1JwYjI0Z2FYUnpaV3htS1M1Y2JpQXFJRHhpY2o0OFluSStYRzRnS2lCWGFHVnVJSEpsYlc5MmFXNW5JR0Z1SUdGMGRISnBZblYwWlN3Z2NHeGxZWE5sSUdSdklHNXZkQ0IxYzJWY2JpQXFJRnRxVVhWbGNua2pjbVZ0YjNabFFYSnBZVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkzSmxiVzkyWlVGeWFXRjlMRnh1SUNvZ1cycFJkV1Z5ZVNOeVpXMXZkbVZCY21saFVtVm1YWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25ramNtVnRiM1psUVhKcFlWSmxabjBnYjNKY2JpQXFJRnRxVVhWbGNua2pjbVZ0YjNabFFYSnBZVk4wWVhSbFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqY21WdGIzWmxRWEpwWVZOMFlYUmxmU0JoY3lCMGFHbHpJR05oYmx4dUlDb2dZM0psWVhSbElHRnVJR2x1Wm1sdWFYUmxJR3h2YjNBdVhHNGdLbHh1SUNvZ1FIUjVjR1ZrWldZZ2UwWjFibU4wYVc5dWZTQWdJQ0JCVWtsQlgyaHZiMnRmZFc1elpYUmNiaUFxSUVCd1lYSmhiU0FnSUh0SVZFMU1SV3hsYldWdWRIMGdaV3hsYldWdWRGeHVJQ29nSUNBZ0lDQWdJQ0FnUld4bGJXVnVkQ0IzYUc5elpTQmhkSFJ5YVdKMWRHVWdjMmh2ZFd4a0lHSmxJSEpsYlc5MlpXUXVYRzRnS2lCQWNHRnlZVzBnSUNCN1UzUnlhVzVuZlNBZ0lDQWdJR0YwZEhKcFluVjBaVnh1SUNvZ0lDQWdJQ0FnSUNBZ1JuVnNiQ0JoZEhSeWFXSjFkR1VnYm1GdFpTd2diRzkzWlhJZ1kyRnpaU0JoYm1RZ2FXNWpiSFZrYVc1bklGd2lZWEpwWVMxY0lpQndjbVZtYVhndVhHNGdLaUJBY21WMGRYSnVJQ0I3UW05dmJHVmhibjFjYmlBcUlDQWdJQ0FnSUNBZ0lGZG9aWFJvWlhJZ2IzSWdibTkwSUhSb1pTQmhkSFJ5YVdKMWRHVWdjMmh2ZFd4a0lHSmxJSEpsYlc5MlpXUXVYRzRnS2x4dUlDb2dRR1Y0WVcxd2JHVWdQR05oY0hScGIyNCtVbVZ0YjNacGJtY2dZU0JtYVdOMGFYUnBiM1Z6SUZ3aWRtOXNkVzFsWENJZ1lYUjBjbWxpZFhSbFBDOWpZWEIwYVc5dVBseHVJQ29nSkM1aGNtbGhTRzl2YTNNdWRtOXNkVzFsSUQwZ2UxeHVJQ29nSUNBZ0lDOHZJRXhsZENkeklHRnpjM1Z0WlNCMGFHRjBJSFJvWlhKbElHbHpJR0ZzYzI4Z1lTQmNJbk52ZFc1a2MyVjBkWEJjSWlCaGRIUnlhV0oxZEdVZ1lXNWtJSFJvWVhRZ2FYUmNiaUFxSUNBZ0lDQXZMeUJ5WlhGMWFYSmxjeUIwYUdVZ1hDSjJiMngxYldWY0lpQmhkSFJ5YVdKMWRHVWdkRzhnWlhocGMzUXNJSFJvZFhNZ2FXWWdYQ0oyYjJ4MWJXVmNJaUJwY3lCeVpXMXZkbVZrTEZ4dUlDb2dJQ0FnSUM4dklGd2ljMjkxYm1SelpYUjFjRndpSUhOb2IzVnNaQ0JpWlNCeVpXMXZkbVZrSUdGeklIZGxiR3d1WEc0Z0tpQWdJQ0FnZFc1elpYUTZJR1oxYm1OMGFXOXVJQ2hsYkdWdFpXNTBMQ0JoZEhSeWFXSjFkR1VwSUh0Y2JpQXFJQ0FnSUNBZ0lDQWdaV3hsYldWdWRDNXlaVzF2ZG1WQmRIUnlhV0oxZEdVb1hDSmhjbWxoTFhOdmRXNWtjMlYwZFhCY0lpazdYRzRnS2lBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ29nSUNBZ0lIMWNiaUFxSUgwN1hHNGdLbHh1SUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0ZG05c2RXMWxQVndpTlZ3aUlHRnlhV0V0YzI5MWJtUnpaWFIxY0QxY0ltMXZibTljSWo0OEwyUnBkajVjYmlBcVhHNGdLaUFrS0Z3aUkyOXVaVndpS1M1eVpXMXZkbVZCY21saEtGd2lkbTlzZFcxbFhDSXBPMXh1SUNwY2JpQXFJQzh2SUU1dmR5QnRZWEpyZFhBZ2FYTmNiaUFxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcUwxeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZaRzlqTDNSNWNHVmtaV1l2YWxGMVpYSjVYM0JoY21GdExtcHpYRzR2S2lwY2JpQXFJRUZ1ZVNCd1lYSmhiV1YwWlhJZ2RHaGhkQ0JqWVc0Z1ltVWdjR0Z6YzJWa0lIUnZYRzRnS2lCYmFsRjFaWEo1SjNNZ0pDQm1kVzVqZEdsdmJsMTdRR3hwYm1zZ2FIUjBjRG92TDJGd2FTNXFjWFZsY25rdVkyOXRMMnBSZFdWeWVTOTlMaUJDWlNCaGQyRnlaU0IwYUdGMFhHNGdLaUJwWmlCMGFHVWdiMkpxWldOMElDaHZjaUJCY25KaGVTQnZjaUJPYjJSbFRHbHpkQ2tnWTI5dWRHRnBibk1nYlhWc2RHbHdiR1VnWld4bGJXVnVkSE1zSUc5dWJIa2dkR2hsWEc0Z0tpQm1hWEp6ZENCM2FXeHNJR0psSUhWelpXUWdkMmhsYmlCblpYUjBhVzVuSUdsdVptOXliV0YwYVc5dUxseHVJQ3BjYmlBcUlFQjBlWEJsWkdWbUlIdEJjbkpoZVh4RmJHVnRaVzUwZkdwUmRXVnllWHhPYjJSbFRHbHpkSHhUZEhKcGJtZDlJR3BSZFdWeWVWOXdZWEpoYlZ4dUlDb3ZYRzVjYmk4dklGTnZkWEpqWlRvZ0wzTnlZeTluYkc5aVlXd3ZkbUZ5YVdGaWJHVnpMbXB6WEc1Y2JseHVMeThnUVNCemFXMXdiR1VnWTJobFkyc2dkRzhnYzJWbElHbG1JSFJvWlhKbElHbHpJR0VnWjJ4dlltRnNJRkJ5YjNoNUlHWjFibU4wYVc5dUlHRnVaQ0JwZENkeklHNWhkR2wyWlM1Y2JpOHZJRUZzZEdodmRXZG9JSFJvYVhNZ2FYTnVKM1FnWm05dmJDMXdjbTl2Wml3Z2FYUW5jeUJoSUdaaGFYSnNlU0J5Wld4cFlXSnNaU0IzWVhrZ2IyWWdZMmhsWTJ0cGJtZGNiaTh2SUhkb1pYUm9aWElnYjNJZ2JtOTBJSFJvWlNCaWNtOTNjMlZ5SUhOMWNIQnZjblJ6SUZCeWIzaDVMbHh1ZG1GeUlFbFRYMUJTVDFoWlgwRldRVWxNUVVKTVJTQTlJQ2hjYmlBZ0lDQjBlWEJsYjJZZ2QybHVaRzkzTGxCeWIzaDVJRDA5UFNCY0ltWjFibU4wYVc5dVhDSmNiaUFnSUNBbUppQjNhVzVrYjNjdVVISnZlSGt1ZEc5VGRISnBibWNvS1M1cGJtUmxlRTltS0Z3aVcyNWhkR2wyWlNCamIyUmxYVndpS1NBK0lDMHhYRzRwTzF4dVhHNHZMeUJUYjNWeVkyVTZJQzl6Y21NdloyeHZZbUZzTDJsa1pXNTBhV1o1TG1welhHNWNibHh1THlvcVhHNGdLaUJJWld4d1pYSWdablZ1WTNScGIyNGdabTl5SUdsa1pXNTBhV1o1YVc1bklIUm9aU0JuYVhabGJpQThZMjlrWlQ1eVpXWmxjbVZ1WTJVOEwyTnZaR1UrTGlCVWFHVWdTVVFnYjJaY2JpQXFJSFJvWlNCbWFYSnpkQ0J0WVhSamFDQnBjeUJ5WlhSMWNtNWxaQ0F0SUhObFpWeHVJQ29nVzJwUmRXVnllU05wWkdWdWRHbG1lVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkybGtaVzUwYVdaNWZTQm1iM0lnWm5Wc2JDQmtaWFJoYVd4ekxseHVJQ3BjYmlBcUlFQm5iRzlpWVd4Y2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnSUNCN2FsRjFaWEo1WDNCaGNtRnRmU0J5WldabGNtVnVZMlZjYmlBcUlDQWdJQ0FnSUNBZ0lFVnNaVzFsYm5RZ2RHOGdhV1JsYm5ScFpua3VYRzRnS2lCQWNtVjBkWEp1SUNCN1UzUnlhVzVuZlZ4dUlDb2dJQ0FnSUNBZ0lDQWdTVVFnYjJZZ2RHaGxJR1ZzWlcxbGJuUXVYRzRnS2k5Y2JuWmhjaUJwWkdWdWRHbG1lU0E5SUdaMWJtTjBhVzl1SUNoeVpXWmxjbVZ1WTJVcElIdGNibHh1SUNBZ0lISmxkSFZ5YmlBa0tISmxabVZ5Wlc1alpTa3VhV1JsYm5ScFpua29LVHRjYmx4dWZUdGNibHh1THk4Z1UyOTFjbU5sT2lBdmMzSmpMMmRzYjJKaGJDOXBaR1Z1ZEdsMGVTNXFjMXh1THlvcVhHNGdLaUJCYmlCcFpHVnVkR2wwZVNCbWRXNWpkR2x2YmlCMGFHRjBJSE5wYlhCc2VTQnlaWFIxY201eklIZG9ZWFJsZG1WeUlHbDBJR2x6SUdkcGRtVnVJSGRwZEdodmRYUmNiaUFxSUcxdlpHbG1lV2x1WnlCcGRDNGdWR2hwY3lCallXNGdZbVVnZFhObFpuVnNJR1p2Y2lCallYTmxjeUIzYUdWdUlHRWdiVzlrYVdacFkyRjBhVzl1SUdaMWJtTjBhVzl1SUdselhHNGdLaUJ1WldWa1pXUWdZblYwSUc5d2RHbHZibUZzTGx4dUlDcGNiaUFxSUVCbmJHOWlZV3hjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdJQ0I3UDMwZ2VGeHVJQ29nSUNBZ0lDQWdJQ0FnVDJKcVpXTjBJSFJ2SUhKbGRIVnliaTVjYmlBcUlFQnlaWFIxY200Z0lIcy9mVnh1SUNvZ0lDQWdJQ0FnSUNBZ1QzSnBaMmx1WVd3Z2IySnFaV04wTGx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsWEc0Z0tpQnBaR1Z1ZEdsMGVTaGNJbUZjSWlrN0lDQWdJQ0FnSUNBZ0lDQXZMeUF0UGlCY0ltRmNJbHh1SUNvZ2FXUmxiblJwZEhrb1hDSmhYQ0lzSUZ3aVlsd2lLVHNnSUNBZ0lDQXZMeUF0UGlCY0ltRmNJaXdnYjI1c2VTQm1hWEp6ZENCaGNtZDFiV1Z1ZENCcGN5QnlaWFIxY201bFpDNWNiaUFxSUdsa1pXNTBhWFI1TG1OaGJHd29YQ0ppWENJc0lGd2lZVndpS1RzZ0x5OGdMVDRnWENKaFhDSXNJR052Ym5SbGVIUWdhR0Z6SUc1dklHVm1abVZqZEM1Y2JpQXFMMXh1ZG1GeUlHbGtaVzUwYVhSNUlEMGdablZ1WTNScGIyNGdLSGdwSUh0Y2JseHVJQ0FnSUhKbGRIVnliaUI0TzF4dVhHNTlPMXh1WEc0dkx5QlRiM1Z5WTJVNklDOXpjbU12WjJ4dlltRnNMMmx1ZEdWeWNISmxkRk4wY21sdVp5NXFjMXh1THlvcVhHNGdLaUJKYm5SbGNuQnlaWFJ6SUhSb1pTQm5hWFpsYmlCdlltcGxZM1FnWVhNZ1lTQnpkSEpwYm1jdUlFbG1JSFJvWlNCdlltcGxZM1FnYVhNZ1BHTnZaR1UrYm5Wc2JEd3ZZMjlrWlQ1Y2JpQXFJRzl5SUR4amIyUmxQblZ1WkdWbWFXNWxaRHd2WTI5a1pUNHNJR0Z1SUdWdGNIUjVJSE4wY21sdVp5QnBjeUJ5WlhSMWNtNWxaQzVjYmlBcVhHNGdLaUJBWjJ4dlltRnNYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElDQWdlejk5SUhOMGNtbHVaMXh1SUNvZ0lDQWdJQ0FnSUNBZ1QySnFaV04wSUhSdklHbHVkR1Z5Y0hKbGRDNWNiaUFxSUVCeVpYUjFjbTRnSUh0VGRISnBibWQ5WEc0Z0tpQWdJQ0FnSUNBZ0lDQkpiblJsY25CeVpYUmxaQ0J6ZEhKcGJtY3VYRzRnS2x4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxSUdsdWRHVnljSEpsZEZOMGNtbHVaeWhjSWpGY0lpazdJQ0FnSUNBZ0lDOHZJQzArSUZ3aU1Wd2lYRzRnS2lCcGJuUmxjbkJ5WlhSVGRISnBibWNvTVNrN0lDQWdJQ0FnSUNBZ0x5OGdMVDRnWENJeFhDSmNiaUFxSUdsdWRHVnljSEpsZEZOMGNtbHVaeWhiTVN3Z01sMHBPeUFnSUNBdkx5QXRQaUJjSWpFc01sd2lYRzRnS2lCcGJuUmxjbkJ5WlhSVGRISnBibWNvYm5Wc2JDazdJQ0FnSUNBZ0x5OGdMVDRnWENKY0lseHVJQ29nYVc1MFpYSndjbVYwVTNSeWFXNW5LSFZ1WkdWbWFXNWxaQ2s3SUM4dklDMCtJRndpWENKY2JpQXFJR2x1ZEdWeWNISmxkRk4wY21sdVp5Z3BPeUFnSUNBZ0lDQWdJQ0F2THlBdFBpQmNJbHdpWEc0Z0tpOWNiblpoY2lCcGJuUmxjbkJ5WlhSVGRISnBibWNnUFNCbWRXNWpkR2x2YmlBb2MzUnlhVzVuS1NCN1hHNWNiaUFnSUNCeVpYUjFjbTRnS0hOMGNtbHVaeUE5UFQwZ2JuVnNiQ0I4ZkNCemRISnBibWNnUFQwOUlIVnVaR1ZtYVc1bFpDbGNiaUFnSUNBZ0lDQWdQeUJjSWx3aVhHNGdJQ0FnSUNBZ0lEb2dVM1J5YVc1bktITjBjbWx1WnlrN1hHNWNibjA3WEc1Y2JpOHZJRk52ZFhKalpUb2dMM055WXk5bmJHOWlZV3d2YVhORmJHVnRaVzUwTG1welhHNHZLaXBjYmlBcUlGSmxkSFZ5Ym5NZ1BHTnZaR1UrZEhKMVpUd3ZZMjlrWlQ0Z2FXWWdkR2hsSUdkcGRtVnVJRHhqYjJSbFBtVnNaVzFsYm5ROEwyTnZaR1UrSUdseklHRnVJRWhVVFV4Y2JpQXFJR1ZzWlcxbGJuUXVYRzRnS2x4dUlDb2dRR2RzYjJKaGJGeHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNBZ0lIcy9mU0JsYkdWdFpXNTBYRzRnS2lBZ0lDQWdJQ0FnSUNCUFltcGxZM1FnZEc4Z2RHVnpkQzVjYmlBcUlFQnlaWFIxY200Z0lIdENiMjlzWldGdWZWeHVJQ29nSUNBZ0lDQWdJQ0FnZEhKMVpTQnBaaUE4WTI5a1pUNWxiR1Z0Wlc1MFBDOWpiMlJsUGlCcGN5QmhiaUJJVkUxTVJXeGxiV1Z1ZEM1Y2JpQXFYRzRnS2lCQVpYaGhiWEJzWlZ4dUlDb2dhWE5GYkdWdFpXNTBLR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb1hDSmthWFpjSWlrcE95QXZMeUF0UGlCMGNuVmxYRzRnS2lCcGMwVnNaVzFsYm5Rb1pHOWpkVzFsYm5RdVltOWtlU2s3SUM4dklDMCtJSFJ5ZFdWY2JpQXFJR2x6Uld4bGJXVnVkQ2hrYjJOMWJXVnVkQzVqY21WaGRHVlVaWGgwVG05a1pTaGNJbHdpS1NrN0lDOHZJQzArSUdaaGJITmxYRzRnS2lCcGMwVnNaVzFsYm5Rb0pDaGNJbUp2WkhsY0lpa3BPeUF2THlBdFBpQm1ZV3h6WlZ4dUlDb2dhWE5GYkdWdFpXNTBLQ1FvWENKaWIyUjVYQ0lwV3pCZEtUc2dMeThnTFQ0Z2RISjFaVnh1SUNvdlhHNTJZWElnYVhORmJHVnRaVzUwSUQwZ1puVnVZM1JwYjI0Z0tHVnNaVzFsYm5RcElIdGNibHh1SUNBZ0lISmxkSFZ5YmlBb0wxNWNYRnR2WW1wbFkzUmNYSE5JVkUxTVcwRXRXbUV0ZWwwclJXeGxiV1Z1ZEZ4Y1hTUXZLUzUwWlhOMEtHVnNaVzFsYm5RcE8xeHVYRzU5TzF4dVhHNHZMeUJUYjNWeVkyVTZJQzl6Y21NdloyeHZZbUZzTDIxbGJXOXBjMlV1YW5OY2JseHVYRzR2S2lwY2JpQXFJRTF2WkdsbWFXVnpJR0VnWm5WdVkzUnBiMjRnYzI4Z2RHaGhkQ0IwYUdVZ2NtVnpkV3gwY3lCaGNtVWdjbVYwY21sbGRtVmtJR1p5YjIwZ1lTQmpZV05vWlNCcFpseHVJQ29nY0c5emMybGliR1VnY21GMGFHVnlJSFJvWVc0Z1puSnZiU0JsZUdWamRYUnBibWNnZEdobElHWjFibU4wYVc5dUlHRm5ZV2x1TGlCVWFHVWdZMkZqYUdVZ2FYTWdjSFZpYkdsamJIbGNiaUFxSUdWNGNHOXpaV1FnS0dGeklIUm9aU0J3Y205d1pYSjBlU0E4WTI5a1pUNWpZV05vWlR3dlkyOWtaVDRwSUhSdklHRnNiRzkzSUdsMElIUnZJR0psSUdOc1pXRnlaV1FzWEc0Z0tpQm1iM0pqYVc1bklIUm9aU0JtZFc1amRHbHZiaUIwYnlCeVpTMWxlR1ZqZFhSbExseHVJQ29nUEdKeVBqeGljajVjYmlBcUlFbG1JR1JsWm1sdVpXUXNJSFJvWlNBOFkyOWtaVDV5WlhOdmJIWmxjand2WTI5a1pUNGdhWE1nY0dGemMyVmtJSFJvWlNCellXMWxJR0Z5WjNWdFpXNTBjeUJoY3lCMGFHVmNiaUFxSUR4amIyUmxQbWhoYm1Sc1pYSThMMk52WkdVK095QnBkQ0J6YUc5MWJHUWdjbVYwZFhKdUlHRWdjM1J5YVc1bklHRnVaQ0IwYUdGMElITjBjbWx1WnlCM2FXeHNJR0psSUhWelpXUmNiaUFxSUdGeklIUm9aU0JyWlhrZ1ptOXlJRHhqYjJSbFBtTmhZMmhsUEM5amIyUmxQaTRnU1dZZ1lTQThZMjlrWlQ1eVpYTnZiSFpsY2p3dlkyOWtaVDRnYVhOdUozUWdaR1ZtYVc1bFpDeGNiaUFxSUc5eUlHbHpiaWQwSUdFZ1puVnVZM1JwYjI0c0lIUm9aU0JoY21kMWJXVnVkSE1nWVhKbElITnBiWEJzZVNCcWIybHVaV1FnZEc5blpYUm9aWElnWVhNZ1lWeHVJQ29nWTI5dGJXRXRjMlZ3WVhKaGRHVmtJSE4wY21sdVp5NWNiaUFxWEc0Z0tpQkFaMnh2WW1Gc1hHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUNBZ2UwWjFibU4wYVc5dWZTQm9ZVzVrYkdWeVhHNGdLaUFnSUNBZ0lDQWdJQ0JHZFc1amRHbHZiaUIwYnlCamIyNTJaWEowTGx4dUlDb2dRSEJoY21GdElDQWdlMFoxYm1OMGFXOXVmU0JiY21WemIyeDJaWEpkWEc0Z0tpQWdJQ0FnSUNBZ0lDQlBjSFJwYjI1aGJDQm1kVzVqZEdsdmJpQm1iM0lnZDI5eWEybHVaeUJ2ZFhRZ2RHaGxJR3RsZVNCbWIzSWdkR2hsSUdOaFkyaGxMbHh1SUNvZ1FISmxkSFZ5YmlBZ2UwWjFibU4wYVc5dWZWeHVJQ29nSUNBZ0lDQWdJQ0FnUTI5dWRtVnlkR1ZrSUdaMWJtTjBhVzl1TGx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGtKaGMybGpJR1Y0WVcxd2JHVThMMk5oY0hScGIyNCtYRzRnS2lCMllYSWdhVzVqY21WaGMyVWdQU0JtZFc1amRHbHZiaUFvYm5WdFltVnlLU0I3WEc0Z0tpQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb2JuVnRZbVZ5S1R0Y2JpQXFJQ0FnSUNCeVpYUjFjbTRnYm5WdFltVnlJQ3NnTVR0Y2JpQXFJSDA3WEc0Z0tpQjJZWElnYldWdFNXNWpjbVZoYzJVZ1BTQnRaVzF2YVhObEtHbHVZM0psWVhObEtUdGNiaUFxWEc0Z0tpQnRaVzFKYm1OeVpXRnpaU2d4S1R0Y2JpQXFJQzh2SUV4dlozTTZJREZjYmlBcUlDOHZJQzArSURKY2JpQXFJRzFsYlVsdVkzSmxZWE5sS0RFcE95QXZMeUF0UGlBeVhHNGdLaUJ0WlcxcGJtTnlaV0Z6WlNneUtUdGNiaUFxSUM4dklFeHZaM002SURKY2JpQXFJQzh2SUMwK0lETmNiaUFxSUcxbGJVbHVZM0psWVhObEtERXBPeUF2THlBdFBpQXhYRzRnS2lCdFpXMUpibU55WldGelpTNWpZV05vWlRzZ0x5OGdMVDRnZTF3aU1Wd2lPaUF5TENCY0lqSmNJam9nTTMxY2JpQXFYRzRnS2lCQVpYaGhiWEJzWlNBOFkyRndkR2x2Ymo1VGNHVmphV1o1YVc1bklHRWdjbVZ6YjJ4MlpYSThMMk5oY0hScGIyNCtYRzRnS2lCMllYSWdjM1Z0SUQwZ1puVnVZM1JwYjI0Z0tHNTFiV0psY25NcElIdGNiaUFxSUNBZ0lDQnlaWFIxY200Z2JuVnRZbVZ5Y3k1eVpXUjFZMlVvWm5WdVkzUnBiMjRnS0hCeVpYWXNJR04xY25JcElIdGNiaUFxSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEJ5WlhZZ0t5QmpkWEp5TzF4dUlDb2dJQ0FnSUgwc0lEQXBPMXh1SUNvZ2ZUdGNiaUFxSUhaaGNpQnRaVzFUZFcwZ1BTQnRaVzF2YVhObEtITjFiU3dnWm5WdVkzUnBiMjRnS0c1MWJXSmxjbk1wSUh0Y2JpQXFJQ0FnSUNCeVpYUjFjbTRnU2xOUFRpNXpkSEpwYm1kcFpua29iblZ0WW1WeWN5azdYRzRnS2lCOUtUdGNiaUFxSUcxbGJWTjFiU2hiTVN3Z01pd2dNMTBwT3lBdkx5QXRQaUEyWEc0Z0tpQnRaVzFUZFcwdVkyRmphR1U3SUM4dklDMCtJSHRjSWxzeExESXNNMTFjSWpvZ05uMWNiaUFxTDF4dWRtRnlJRzFsYlc5cGMyVWdQU0JtZFc1amRHbHZiaUFvYUdGdVpHeGxjaXdnY21WemIyeDJaWElwSUh0Y2JseHVJQ0FnSUhaaGNpQm9ZWE5QZDI0Z1BTQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TzF4dUlDQWdJSFpoY2lCemJHbGpaU0E5SUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpUdGNiaUFnSUNCMllYSWdiV1Z0YjJselpXUWdQU0JtZFc1amRHbHZiaUJ0Wlcwb0tTQjdYRzVjYmlBZ0lDQWdJQ0FnZG1GeUlHRnlaM01nUFNCemJHbGpaUzVqWVd4c0tHRnlaM1Z0Wlc1MGN5azdYRzRnSUNBZ0lDQWdJSFpoY2lCclpYa2dQU0IwZVhCbGIyWWdjbVZ6YjJ4MlpYSWdQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lseHVJQ0FnSUNBZ0lDQWdJQ0FnUHlCeVpYTnZiSFpsY2k1aGNIQnNlU2gxYm1SbFptbHVaV1FzSUdGeVozTXBYRzRnSUNBZ0lDQWdJQ0FnSUNBNklHRnlaM011YW05cGJpaGNJaXhjSWlrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ5WlhOd2IyNXpaU0E5SUcxbGJTNWpZV05vWlZ0clpYbGRPMXh1WTI5dWMyOXNaUzVzYjJjb1hDSnRaVzF2YVhObEtDa2dhMlY1SUQwZ1hDSWdLeUJyWlhrZ0t5QmNJaUJoYm1RZ2NtVnpjRzl1YzJVZ1BTQmNJaUFySUNoeVpYTndiMjV6WlNBOVBUMGdkVzVrWldacGJtVmtJRDhnWENJb2RXNWtaV1pwYm1Wa0tWd2lJRG9nY21WemNHOXVjMlVwS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0ZvWVhOUGQyNHVZMkZzYkNodFpXMHVZMkZqYUdVc0lHdGxlU2twSUh0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WemNHOXVjMlVnUFNCb1lXNWtiR1Z5TG1Gd2NHeDVLSFJvYVhNc0lHRnlaM01wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdiV1Z0TG1OaFkyaGxXMnRsZVYwZ1BTQnlaWE53YjI1elpUdGNibHh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMzQnZibk5sTzF4dVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUcxbGJXOXBjMlZrTG1OaFkyaGxJRDBnZTMwN1hHNWNiaUFnSUNCeVpYUjFjbTRnYldWdGIybHpaV1E3WEc1Y2JuMDdYRzVjYmk4dklGTnZkWEpqWlRvZ0wzTnlZeTluYkc5aVlXd3ZibTl5YldGc2FYTmxMbXB6WEc1Y2JseHVMeW9xWEc0Z0tpQk9iM0p0WVd4cGMyVnpJR0VnVjBGSkxVRlNTVUVnWVhSMGNtbGlkWFJsSUc1aGJXVWdjMjhnZEdoaGRDQnBkQ2R6SUdGc2QyRjVjeUJzYjNkbGNpQmpZWE5sSUdGdVpGeHVJQ29nWVd4M1lYbHpJSE4wWVhKeklIZHBkR2dnUEdOdlpHVStZWEpwWVMwOEwyTnZaR1UrTGlCSlppQjBhR1VnZFc1d2NtVm1hWGhsWkNCMllXeDFaU0JoY0hCbFlYSnpJR2x1WEc0Z0tpQmJhbEYxWlhKNUxtRnlhV0ZHYVhoZGUwQnNhVzVySUdWNGRHVnlibUZzT21wUmRXVnllUzVoY21saFJtbDRmU0IwYUdWdUlIUm9aU0J0WVhCd1pXUWdkbVZ5YzJsdmJpQnBjMXh1SUNvZ2RYTmxaQ0JpWldadmNtVWdZbVZwYm1jZ2NISmxabWw0WldRdVhHNGdLaUE4WW5JK1BHSnlQbHh1SUNvZ1ZHaGxJSEpsYzNWc2RITWdiMllnZEdocGN5Qm1kVzVqZEdsdmJpQmhjbVVnWTJGamFHVmtJSFJ2SUdobGJIQWdjbVZrZFdObElIQnliMk5sYzNOcGJtY3VJRlJvYVhNZ2FYTmNiaUFxSUdWNGNHOXpaV1FnWVhNZ1BHTnZaR1UrYWxGMVpYSjVMbTV2Y20xaGJHbHpaVUZ5YVdFdVkyRmphR1U4TDJOdlpHVStJR2xtSUc1bFpXUmxaQ0JpZFhRZ2RHaGxjbVVnYVhNZ2JtOWNiaUFxSUc1bFpXUWdkRzhnWTJ4bFlYSWdkR2hsSUdOaFkyaGxJR0ZtZEdWeUlHMXZaR2xtZVdsdVoxeHVJQ29nVzJwUmRXVnllUzVoY21saFJtbDRYWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25rdVlYSnBZVVpwZUgwZ0xTQmphR0Z1WjJWeklHRnlaU0JoZFhSdmJXRjBhV05oYkd4NVhHNGdLaUJqYjI1emFXUmxjbVZrSUdsdUlIUm9aU0JqWVdOb2FXNW5JSEJ5YjJObGMzTXVYRzRnS2lBOFluSStQR0p5UGx4dUlDb2dWR2hwY3lCbWRXNWpkR2x2YmlCcGN5QmhiR2xoYzJWa0lHRnpYRzRnS2lCYmFsRjFaWEo1TG01dmNtMWhiR2w2WlVGeWFXRmRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVM1dWIzSnRZV3hwZW1WQmNtbGhmUzVjYmlBcVhHNGdLaUJBWm5WdVkzUnBiMjVjYmlBcUlFQmhiR2xoY3lBZ0lDQmxlSFJsY201aGJEcHFVWFZsY25rdWJtOXliV0ZzYVhObFFYSnBZVnh1SUNvZ1FHMWxiV0psY205bUlHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVZ4dUlDb2dRSEJoY21GdElDQWdJSHRUZEhKcGJtZDlJRzVoYldWY2JpQXFJQ0FnSUNBZ0lDQWdJQ0JCZEhSeWFXSjFkR1VnYm1GdFpTQjBieUJ1YjNKdFlXeHBjMlV1WEc0Z0tpQkFjbVYwZFhKdUlDQWdlMU4wY21sdVozMWNiaUFxSUNBZ0lDQWdJQ0FnSUNCT2IzSnRZV3hwYzJWa0lHRjBkSEpwWW5WMFpTQnVZVzFsTGx4dUlDb2dRSEJ5YjNCbGNuUjVJSHRQWW1wbFkzUXVQRk4wY21sdVp6NTlJR05oWTJobFhHNGdLaUFnSUNBZ0lDQWdJQ0FnVkdobElHTmhZMmhsSUc5bUlISmxjWFZsYzNSeklIUnZJSEpsYzNCdmJuTmxjeTVjYmlBcVhHNGdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVDWVhOcFl5QmxlR0Z0Y0d4bFBDOWpZWEIwYVc5dVBseHVJQ29nSkM1dWIzSnRZV3hwYzJWQmNtbGhLRndpYkdGaVpXeGNJaWs3SUNBZ0lDQWdMeThnTFQ0Z1hDSmhjbWxoTFd4aFltVnNYQ0pjYmlBcUlDUXVibTl5YldGc2FYTmxRWEpwWVNoY0lreEJRa1ZNWENJcE95QWdJQ0FnSUM4dklDMCtJRndpWVhKcFlTMXNZV0psYkZ3aVhHNGdLaUFrTG01dmNtMWhiR2x6WlVGeWFXRW9YQ0poY21saExXeGhZbVZzWENJcE95QXZMeUF0UGlCY0ltRnlhV0V0YkdGaVpXeGNJbHh1SUNvZ0pDNXViM0p0WVd4cGMyVkJjbWxoS0NrN0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUMwK0lGd2lZWEpwWVMxY0lseHVJQ3BjYmlBcUlFQmxlR0Z0Y0d4bElEeGpZWEIwYVc5dVBrRnNhV0Z6UEM5allYQjBhVzl1UGx4dUlDb2dKQzV1YjNKdFlXeHBlbVZCY21saEtGd2liR0ZpWld4Y0lpazdJQ0FnSUNBZ0x5OGdMVDRnWENKaGNtbGhMV3hoWW1Wc1hDSmNiaUFxSUNRdWJtOXliV0ZzYVhwbFFYSnBZU2hjSWt4QlFrVk1YQ0lwT3lBZ0lDQWdJQzh2SUMwK0lGd2lZWEpwWVMxc1lXSmxiRndpWEc0Z0tpQWtMbTV2Y20xaGJHbDZaVUZ5YVdFb1hDSmhjbWxoTFd4aFltVnNYQ0lwT3lBdkx5QXRQaUJjSW1GeWFXRXRiR0ZpWld4Y0lseHVJQ29nSkM1dWIzSnRZV3hwZW1WQmNtbGhLQ2s3SUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJQzArSUZ3aVlYSnBZUzFjSWx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGsxaGNIQmxaQ0JoZEhSeWFXSjFkR1U4TDJOaGNIUnBiMjQrWEc0Z0tpQXZMeUFrTG1GeWFXRkdhWGdnUFNCN2JHRmlaV3hsWkdKNU9pQmNJbXhoWW1Wc2JHVmtZbmxjSW4xY2JpQXFJQ1F1Ym05eWJXRnNhWE5sUVhKcFlTaGNJbXhoWW1Wc1pXUmllVndpS1RzZ0lDQWdJQ0F2THlBdFBpQmNJbUZ5YVdFdGJHRmlaV3hzWldSaWVWd2lYRzRnS2lBa0xtNXZjbTFoYkdselpVRnlhV0VvWENKTVFVSkZURVZFUWxsY0lpazdJQ0FnSUNBZ0x5OGdMVDRnWENKaGNtbGhMV3hoWW1Wc2JHVmtZbmxjSWx4dUlDb2dKQzV1YjNKdFlXeHBjMlZCY21saEtGd2lZWEpwWVMxc1lXSmxiR1ZrWW5sY0lpazdJQzh2SUMwK0lGd2lZWEpwWVMxc1lXSmxiR3hsWkdKNVhDSmNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNVVhR1VnWTJGamFHVThMMk5oY0hScGIyNCtYRzRnS2lBa0xtNXZjbTFoYkdselpVRnlhV0VvWENKaWRYTjVYQ0lwT3lBZ0lDQXZMeUF0UGlCY0ltRnlhV0V0WW5WemVWd2lYRzRnS2lBa0xtNXZjbTFoYkdselpVRnlhV0VvWENKaWRYTjVYQ0lwT3lBZ0lDQXZMeUF0UGlCY0ltRnlhV0V0WW5WemVWd2lJQ2htY205dElHTmhZMmhsS1Z4dUlDb2dKQzV1YjNKdFlXeHBjMlZCY21saEtGd2lZMmhsWTJ0bFpGd2lLVHNnTHk4Z0xUNGdYQ0poY21saExXTm9aV05yWldSY0lseHVJQ29nSkM1dWIzSnRZV3hwYzJWQmNtbGhLRndpWW5WemVWd2lLVHNnSUNBZ0x5OGdMVDRnWENKaGNtbGhMV0oxYzNsY0lpQW9abkp2YlNCallXTm9aU2xjYmlBcUlDUXVibTl5YldGc2FYTmxRWEpwWVM1allXTm9aVHRjYmlBcUlDOHZJQzArSUh0Y0ltSjFjM2xjSWpvZ1hDSmhjbWxoTFdKMWMzbGNJaXdnWENKamFHVmphMlZrWENJNklGd2lZWEpwWVMxamFHVmphMlZrWENKOVhHNGdLaTljYm5aaGNpQnViM0p0WVd4cGMyVWdQU0J0WlcxdmFYTmxLRnh1SUNBZ0lHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNWNiaUFnSUNBZ0lDQWdkbUZ5SUhCeVpXWnBlQ0E5SUZ3aVlYSnBZUzFjSWp0Y2JpQWdJQ0FnSUNBZ2RtRnlJR3h2ZDJWeUlEMGdhVzUwWlhKd2NtVjBVM1J5YVc1bktHNWhiV1VwTG5SdlRHOTNaWEpEWVhObEtDazdYRzRnSUNBZ0lDQWdJSFpoY2lCbWRXeHNJRDBnYzNSaGNuUnpWMmwwYUM1allXeHNLR3h2ZDJWeUxDQndjbVZtYVhncFhHNGdJQ0FnSUNBZ0lDQWdJQ0EvSUd4dmQyVnlYRzRnSUNBZ0lDQWdJQ0FnSUNBNklIQnlaV1pwZUNBcklHeHZkMlZ5TzF4dUlDQWdJQ0FnSUNCMllYSWdjM1JsYlNBOUlHWjFiR3d1YzJ4cFkyVW9jSEpsWm1sNExteGxibWQwYUNrN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ0WVhBZ1BTQWtMbUZ5YVdGR2FYaGJjM1JsYlYwN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0cxaGNDa2dlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpkR1Z0SUQwZ2JXRndPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1puVnNiQ0E5SUhCeVpXWnBlQ0FySUhOMFpXMDdYRzVjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCbWRXeHNPMXh1WEc0Z0lDQWdmU3hjYmlBZ0lDQkpVMTlRVWs5WVdWOUJWa0ZKVEVGQ1RFVmNiaUFnSUNBZ0lDQWdQeUJwWkdWdWRHbDBlVnh1SUNBZ0lDQWdJQ0E2SUdaMWJtTjBhVzl1SUNodVlXMWxLU0I3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVZVzFsSUNzZ1hDSjhYQ0lnS3lCS1UwOU9Mbk4wY21sdVoybG1lU2drTG1GeWFXRkdhWGdwTzF4dVhHNGdJQ0FnSUNBZ0lIMWNiaWs3WEc1Y2JpOHZJRk52ZFhKalpUb2dMM055WXk5bmJHOWlZV3d2YzNSaGNuUnpWMmwwYUM1cWMxeHVYRzVjYmk4cUtseHVJQ29nUVNCbVlXeHNZbUZqYXlCbWIzSWdiMnhrWlhJZ1luSnZkM05sY25NZ2RHaGhkQ0JrYnlCdWIzUWdkVzVrWlhKemRHRnVaRnh1SUNvZ1cxTjBjbWx1WnlOemRHRnlkSE5YYVhSb1hYdEFiR2x1YXlCb2RIUndjem92TDJSbGRtVnNiM0JsY2k1dGIzcHBiR3hoTG05eVp5OWxiaTlrYjJOekwxZGxZaTlLWVhaaFUyTnlhWEIwTDFKbFptVnlaVzVqWlM5SGJHOWlZV3hmVDJKcVpXTjBjeTlUZEhKcGJtY3ZjM1JoY25SelYybDBhSDFjYmlBcUlIZHBkR2h2ZFhRZ2JXOWthV1pwZVdsdVp5QThZMjlrWlQ1VGRISnBibWN1Y0hKdmRHOTBlWEJsUEM5amIyUmxQaUIxYm01bFkyVnpjMkZ5YVd4NUxseHVJQ3BjYmlBcUlFQm5iRzlpWVd4Y2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQVpuVnVZM1JwYjI1Y2JpQXFJRUJ3WVhKaGJTQWdJQ0I3VTNSeWFXNW5mU0IwWlhoMFhHNGdLaUFnSUNBZ0lDQWdJQ0FnVTNSeWFXNW5JSFJ2SUhObFlYSmphQ0JtYjNJdVhHNGdLaUJBY0dGeVlXMGdJQ0FnZTA1MWJXSmxjbjBnVzI5bVpuTmxkRDB3WFZ4dUlDb2dJQ0FnSUNBZ0lDQWdJRTltWm5ObGRDQm1jbTl0SUhkb2FXTm9JSFJ2SUhOMFlYSjBMbHh1SUNvZ1FISmxkSFZ5YmlBZ0lIdENiMjlzWldGdWZWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZSeWRXVWdhV1lnZEdobElITjBjbWx1WnlCemRHRnlkSE1nZDJsMGFDQThZMjlrWlQ1MFpYaDBQQzlqYjJSbFBpd2dabUZzYzJVZ2IzUm9aWEozYVhObExseHVJQ3BjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLaUJ6ZEdGeWRITlhhWFJvTG1OaGJHd29YQ0poWW1Oa1pXWmNJaXdnWENKaFltTmNJaWs3SUM4dklDMCtJSFJ5ZFdWY2JpQXFMMXh1ZG1GeUlITjBZWEowYzFkcGRHZ2dQU0JUZEhKcGJtY3VjSEp2ZEc5MGVYQmxMbk4wWVhKMGMxZHBkR2dnZkh3Z1puVnVZM1JwYjI0Z0tIUmxlSFFzSUc5bVpuTmxkQ2tnZTF4dVhHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdWFXNWtaWGhQWmloMFpYaDBMQ0J2Wm1aelpYUXBJRDA5UFNBd08xeHVYRzU5TzF4dVhHNHZMeUJUYjNWeVkyVTZJQzl6Y21NdloyeHZZbUZzTDNSdlYyOXlaSE11YW5OY2JseHVYRzR2S2lwY2JpQXFJRU52Ym5abGNuUnpJSFJvWlNCbmFYWmxiaUJ6ZEhKcGJtY2dhVzUwYnlCaGJpQmhjbkpoZVNCdlppQjBhR1VnZDI5eVpITXVJRlJvWlNBOFkyOWtaVDV6ZEhKcGJtYzhMMk52WkdVK1hHNGdLaUJoY21kMWJXVnVkQ0JwY3lCamIyNTJaWEowWldRZ2FXNTBieUJoSUhOMGNtbHVaeUJpWldadmNtVWdZbVZwYm1jZ2MzQnNhWFFnTFNCelpXVmNiaUFxSUh0QWJHbHVheUJwYm5SbGNuQnlaWFJUZEhKcGJtZDlJR1p2Y2lCdGIzSmxJR2x1Wm05eWJXRjBhVzl1TGx4dUlDcGNiaUFxSUVCbmJHOWlZV3hjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdJQ0I3VTNSeWFXNW5mU0J6ZEhKcGJtZGNiaUFxSUNBZ0lDQWdJQ0FnSUZOMGNtbHVaeUFvYjNJZ2IzUm9aWElnZG1GeWFXRmliR1VnZEhsd1pTa2dkRzhnWW5KbFlXc2dhVzUwYnlCM2IzSmtjeTVjYmlBcUlFQnlaWFIxY200Z0lIdEJjbkpoZVM0OFUzUnlhVzVuUG4xY2JpQXFJQ0FnSUNBZ0lDQWdJRmR2Y21SeklHWnliMjBnZEdobElITjBjbWx1Wnk1Y2JpQXFYRzRnS2lCQVpYaGhiWEJzWlZ4dUlDb2dkRzlYYjNKa2N5aGNJbUZpWXlCa1pXWmNJaWs3SUNBdkx5QXRQaUJiWENKaFltTmNJaXdnWENKa1pXWmNJbDFjYmlBcUlIUnZWMjl5WkhNb1hDSmhZbU1nSUdSbFpsd2lLVHNnTHk4Z0xUNGdXMXdpWVdKalhDSXNJRndpWkdWbVhDSmRYRzRnS2lCMGIxZHZjbVJ6S0Z3aVhDSXBJQ0FnSUNBZ0lDQWdJQzh2SUMwK0lGdGRYRzRnS2lCMGIxZHZjbVJ6S0Z3aUlDQWdYQ0lwT3lBZ0lDQWdJQzh2SUMwK0lGdGRYRzRnS2k5Y2JuWmhjaUIwYjFkdmNtUnpJRDBnWm5WdVkzUnBiMjRnS0hOMGNtbHVaeWtnZTF4dVhHNGdJQ0FnY21WMGRYSnVJR2x1ZEdWeWNISmxkRk4wY21sdVp5aHpkSEpwYm1jcExuTndiR2wwS0M5Y1hITXJMeWt1Wm1sc2RHVnlLR2xrWlc1MGFYUjVLVHRjYmx4dWZUdGNibHh1THk4Z1UyOTFjbU5sT2lBdmMzSmpMMmRzYjJKaGJDOW9ZVzVrYkdWeWN5NXFjMXh1ZG1GeUlFaEJUa1JNUlZKZlVGSlBVRVZTVkZrZ1BTQmNJbkJ5YjNCbGNuUjVYQ0k3WEc1MllYSWdTRUZPUkV4RlVsOVNSVVpGVWtWT1EwVWdQU0JjSW5KbFptVnlaVzVqWlZ3aU8xeHVkbUZ5SUVoQlRrUk1SVkpmVTFSQlZFVWdQU0JjSW5OMFlYUmxYQ0k3WEc1Y2JpOHFLbHh1SUNvZ1NHRnVaR3hsY25NZ1ptOXlJSEJ5YjNCbGNuUnBaWE1zSUhKbFptVnlaVzVqWlhNZ1lXNWtJSE4wWVhSbGN5NGdSV0ZqYUNCb1lXNWtiR1Z5SUdoaGN5QmhkQ0JzWldGemRDQmhYRzRnS2lBOFkyOWtaVDVuWlhROEwyTnZaR1UrSUdGdVpDQThZMjlrWlQ1elpYUThMMk52WkdVK0lHMWxkR2h2WkNCMGJ5QjNjbWwwWlNCaGJtUWdjbVZoWkNCMGFHVWdkbUZzZFdWekxseHVJQ29nUEdOdlpHVSthR0Z6UEM5amIyUmxQaUJ0WlhSb2IyUnpJR05vWldOcklIZG9aWFJvWlhJZ2RHaGxJSEJ5YjNCbGNuUjVJR1Y0YVhOMGN5eGNiaUFxSUR4amIyUmxQblZ1YzJWMFBDOWpiMlJsUGlCeVpXMXZkbVZ6SUhSb1pTQndjbTl3WlhKMGVTNWNiaUFxWEc0Z0tpQjdRR3hwYm1zZ2FHRnVaR3hsY25NdWNtVm1aWEpsYm1ObGZTQmhibVFnZTBCc2FXNXJJR2hoYm1Sc1pYSnpMbk4wWVhSbGZTQmtaV1psY2lCMGIxeHVJQ29nZTBCc2FXNXJJR2hoYm1Sc1pYSnpMbkJ5YjNCbGNuUjVmU0FvZEdobGVTQmtiMjRuZENCcGJtaGxjbWwwSUdaeWIyMGdlMEJzYVc1cklHaGhibVJzWlhKekxuQnliM0JsY25SNWZWeHVJQ29nWW5WMElIUm9aWGtnYldGNUlHUnZJR2x1SUdGdWIzUm9aWElnYVcxd2JHVnRaVzUwWVhScGIyNGdMU0JoYm5rZ1puVnVZM1JwYjI1aGJHbDBlU0IwYUdWNUlHUnZiaWQwSUdoaGRtVmNiaUFxSUhkcGJHd2dZbVVnZEdGclpXNGdabkp2YlNCN1FHeHBibXNnYUdGdVpHeGxjbk11Y0hKdmNHVnlkSGw5S1M1Y2JpQXFYRzRnS2lCQVoyeHZZbUZzWEc0Z0tpQkFibUZ0WlhOd1lXTmxYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb3ZYRzUyWVhJZ2FHRnVaR3hsY25NZ1BTQjdmVHRjYmx4dUx5OGdVMjkxY21ObE9pQXZjM0pqTDJkc2IySmhiQzlvWVc1a2JHVnljeTl3Y205d1pYSjBlUzVxYzF4dVhHNWNiaThxS2x4dUlDb2dTR0Z1Wkd4bGN5QlhRVWt0UVZKSlFTQndjbTl3WlhKMGFXVnpJSGRwZEdodmRYUWdiVzlrYVdaNWFXNW5JSFJvWlNCMllXeDFaWE1nWVc1NUlHMXZjbVVnZEdoaGJpQnBkRnh1SUNvZ2JtVmxaSE1nZEc4dUlGUm9aWE5sSUcxbGRHaHZaSE1nWVd4emJ5QmhZM1FnWVhNZ2RHaGxJR1poYkd4aVlXTnJJR1p2Y2lCdmRHaGxjaUJ1WVcxbGMzQmhZMlZ6SUhOMVkyZ2dZWE5jYmlBcUlIdEFiR2x1YXlCb1lXNWtiR1Z5Y3k1eVpXWmxjbVZ1WTJWOUlHRnVaQ0I3UUd4cGJtc2dhR0Z1Wkd4bGNuTXVjM1JoZEdWOUxseHVJQ29nUEdKeVBudEFiR2x1YXlCb1lXNWtiR1Z5Y3k1d2NtOXdaWEowZVM1d1lYSnpaWDBnY0dGeWMyVnpJSFJvWlNCaGRIUnlhV0oxZEdVZ2JtRnRaUzVjYmlBcUlEeGljajU3UUd4cGJtc2dhR0Z1Wkd4bGNuTXVjSEp2Y0dWeWRIa3VaMlYwZlNCblpYUnpJSFJvWlNCMllXeDFaU0J2WmlCMGFHVWdjSEp2Y0dWeWRIa3VYRzRnS2lBOFluSStlMEJzYVc1cklHaGhibVJzWlhKekxuQnliM0JsY25SNUxuTmxkSDBnYzJWMGN5QmhJSEJ5YjNCbGNuUjVMbHh1SUNvZ1BHSnlQbnRBYkdsdWF5Qm9ZVzVrYkdWeWN5NXdjbTl3WlhKMGVTNW9ZWE45SUdOb1pXTnJjeUIwYnlCelpXVWdhV1lnZEdobElIQnliM0JsY25SNUlHVjRhWE4wY3k1Y2JpQXFJRHhpY2o1N1FHeHBibXNnYUdGdVpHeGxjbk11Y0hKdmNHVnlkSGt1ZFc1elpYUjlJSEpsYlc5MlpYTWdkR2hsSUhCeWIzQmxjblI1TGx4dUlDcGNiaUFxSUVCaGJHbGhjeUFnSUNBZ2NISnZjR1Z5ZEhsY2JpQXFJRUJ0WlcxaVpYSnZaaUFnYUdGdVpHeGxjbk5jYmlBcUlFQnVZVzFsYzNCaFkyVmNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpOWNibWhoYm1Sc1pYSnpXMGhCVGtSTVJWSmZVRkpQVUVWU1ZGbGRJRDBnZTF4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1VHRnljMlZ6SUhSb1pTQnVZVzFsSUdGdVpDQnlaWFIxY201eklHRnVJRzlpYW1WamRDQjNhWFJvSUhSb1pTQnViM0p0WVd4cGMyVmtJRzVoYldVZ0tITmxaVnh1SUNBZ0lDQXFJRnRxVVhWbGNua3VibTl5YldGc2FYTmxRWEpwWVYxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVMbTV2Y20xaGJHbHpaVUZ5YVdGOUlHRnVaQ0IwYUdWY2JpQWdJQ0FnS2lCMWJpMXdjbVZtYVhobFpDQmhkSFJ5YVdKMWRHVWdibUZ0WlM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCd1lYSmhiU0FnZTFOMGNtbHVaMzBnYm1GdFpWeHVJQ0FnSUNBcUlDQWdJQ0FnSUNBZ1FYUjBjbWxpZFhSbElHNWhiV1VnZEc4Z2NHRnljMlV1WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3VDJKcVpXTjBManhUZEhKcGJtYytmVnh1SUNBZ0lDQXFJQ0FnSUNBZ0lDQWdRVzRnYjJKcVpXTjBJSGRwZEdnZ1hDSm1kV3hzWENJZ1lXNWtJRndpYzNSbGJWd2lJSEJ5YjNCbGNuUnBaWE11WEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBWlhoaGJYQnNaVnh1SUNBZ0lDQXFJR2hoYm1Sc1pYSnpMbkJ5YjNCbGNuUjVMbkJoY25ObEtGd2lZblZ6ZVZ3aUtUdGNiaUFnSUNBZ0tpQXZMeUF0UGlCN1puVnNiRG9nWENKaGNtbGhMV0oxYzNsY0lpd2djM1JsYlRvZ1hDSmlkWE41WENKOVhHNGdJQ0FnSUNvdlhHNGdJQ0FnY0dGeWMyVTZJR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdYRzVjYmlBZ0lDQWdJQ0FnZG1GeUlHNXZjbTFoYkNBOUlHNXZjbTFoYkdselpTaHVZVzFsS1R0Y2JseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWm5Wc2JEb2dibTl5YldGc0xGeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNSbGJUb2dibTl5YldGc0xuTnNhV05sS0RVcFhHNGdJQ0FnSUNBZ0lIMDdYRzVjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVTJWMGN5QjBhR1VnY0hKdmNHVnlkSGtnYjJZZ1lXNGdaV3hsYldWdWRDNGdWR2hsSUR4amIyUmxQblpoYkhWbFBDOWpiMlJsUGlCcGN5QjFibU5vWVc1blpXUmNiaUFnSUNBZ0tpQW9iM1JvWlhJZ2RHaGhiaUJ1YjNKdFlXd2djM1J5YVc1bklHTnZaWEpqYVc5dUtTQmhibVFnZEdobElEeGpiMlJsUG01aGJXVThMMk52WkdVK0lHbHpYRzRnSUNBZ0lDb2dibTl5YldGc2FYTmxaQ0JwYm5SdklHRWdWMEZKTFVGU1NVRWdjSEp2Y0dWeWRIa2dLSE5sWlZ4dUlDQWdJQ0FxSUZ0cVVYVmxjbmt1Ym05eWJXRnNhWE5sUVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1TG01dmNtMWhiR2x6WlVGeWFXRjlLUzVjYmlBZ0lDQWdLaUE4WW5JK1BHSnlQbHh1SUNBZ0lDQXFJRWxtSUR4amIyUmxQbVZzWlcxbGJuUThMMk52WkdVK0lHbHpJRzV2ZENCaGJpQmxiR1Z0Wlc1MElDaHpaV1VnZTBCc2FXNXJJR2x6Uld4bGJXVnVkSDBwSUhSb1pXNGdibTljYmlBZ0lDQWdLaUJoWTNScGIyNGdkMmxzYkNCaVpTQjBZV3RsYmk1Y2JpQWdJQ0FnS2lBOFluSStQR0p5UGx4dUlDQWdJQ0FxSUVsbUlEeGpiMlJsUG5aaGJIVmxQQzlqYjJSbFBpQnBjeUJoSUdaMWJtTjBhVzl1TENCcGRDQnBjeUIwY21WaGRHVmtJR3hwYTJVZ1lXNWNiaUFnSUNBZ0tpQjdRR3hwYm1zZ1FYUjBjbWxpZFhSbFgyTmhiR3hpWVdOcmZTNGdWR2hwY3lCcGN5Qm1iM0lnWTI5dWMybHpkR1Z1WTNrZ2QybDBhRnh1SUNBZ0lDQXFJRnRxVVhWbGNua2pZWFIwY2wxN1FHeHBibXNnYUhSMGNEb3ZMMkZ3YVM1cWNYVmxjbmt1WTI5dEwyRjBkSEl2ZlM1Y2JpQWdJQ0FnS2lBOFluSStQR0p5UGx4dUlDQWdJQ0FxSUVFZ1BHTnZaR1UrWTI5dWRtVnlkRHd2WTI5a1pUNGdablZ1WTNScGIyNGdZMkZ1SUdGc2MyOGdZbVVnY0dGemMyVmtMaUJVYUdGMElHWjFibU4wYVc5dUlIZHBiR3hjYmlBZ0lDQWdLaUJqYjI1MlpYSjBJRHhqYjJSbFBuWmhiSFZsUEM5amIyUmxQaUFvYVdZZ1BHTnZaR1UrZG1Gc2RXVThMMk52WkdVK0lHbHpJR0VnWm5WdVkzUnBiMjRzWEc0Z0lDQWdJQ29nUEdOdlpHVStZMjl1ZG1WeWREd3ZZMjlrWlQ0Z2QybHNiQ0JqYjI1MlpYSjBJSFJvWlNCeVpYTjFiSFFwSUdKbFptOXlaU0JoYzNOcFoyNXBibWNnYVhRdUlFbG1YRzRnSUNBZ0lDb2dQR052WkdVK1kyOXVkbVZ5ZER3dlkyOWtaVDRnYVhNZ2IyMXRhWFIwWldRZ2IzSWdibTkwSUdFZ1puVnVZM1JwYjI0Z2RHaGxiaUI3UUd4cGJtc2dhV1JsYm5ScGRIbDlYRzRnSUNBZ0lDb2dhWE1nZFhObFpDQnpieUE4WTI5a1pUNTJZV3gxWlR3dlkyOWtaVDRnZDJsc2JDQnViM1FnWW1VZ1kyaGhibWRsWkM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCd2NtbDJZWFJsWEc0Z0lDQWdJQ29nUUhCaGNtRnRJQ0FnZTBWc1pXMWxiblI5SUNCbGJHVnRaVzUwWEc0Z0lDQWdJQ29nSUNBZ0lDQWdJQ0FnUld4bGJXVnVkQ0IwYnlCb1lYWmxJR0VnY0hKdmNHVnlkSGtnYzJWMExseHVJQ0FnSUNBcUlFQndZWEpoYlNBZ0lIdFRkSEpwYm1kOUlDQWdibUZ0WlZ4dUlDQWdJQ0FxSUNBZ0lDQWdJQ0FnSUZkQlNTMUJVa2xCSUhCeWIzQmxjblI1SUhSdklITmxkQzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdJQ0I3UDMwZ0lDQWdJQ0FnSUhaaGJIVmxYRzRnSUNBZ0lDb2dJQ0FnSUNBZ0lDQWdWbUZzZFdVZ2IyWWdkR2hsSUhCeWIzQmxjblI1TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0FnSUh0T2RXMWlaWEo5SUNBZ1cybHVaR1Y0WFZ4dUlDQWdJQ0FxSUNBZ0lDQWdJQ0FnSUU5d2RHbHZibUZzSUdsdVpHVjRJRzltSUR4amIyUmxQbVZzWlcxbGJuUThMMk52WkdVK0lIZHBkR2hwYmlCMGFHVWdhbEYxWlhKNUlHOWlhbVZqZEM1Y2JpQWdJQ0FnS2lBZ0lDQWdJQ0FnSUNCVWFHbHpJR2x6SUc1bFpXUmxaQ0IwYnlCclpXVndJR052Ym5OcGMzUmxibU41SUhkcGRHZ2dkR2hsWEc0Z0lDQWdJQ29nSUNBZ0lDQWdJQ0FnVzJwUmRXVnllU05oZEhSeVhYdEFiR2x1YXlCb2RIUndPaTh2WVhCcExtcHhkV1Z5ZVM1amIyMHZZWFIwY2k5OUlHWjFibU4wYVc5dUlHRnVaRnh1SUNBZ0lDQXFJQ0FnSUNBZ0lDQWdJSE5vYjNWc1pDQmlaU0JrWlhKcGRtVmtJSEpoZEdobGNpQjBhR0Z1SUcxaGJuVmhiR3g1SUhCaGMzTmxaQzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdJQ0I3Um5WdVkzUnBiMjU5SUZ0amIyNTJaWEowUFdsa1pXNTBhWFI1WFZ4dUlDQWdJQ0FxSUNBZ0lDQWdJQ0FnSUU5d2RHbHZibUZzSUdOdmJuWmxjbk5wYjI0Z2NISnZZMlZ6Y3k0Z1NXWWdiMjF0YVhSMFpXUXNJRzV2SUdOdmJuWmxjbk5wYjI0Z2IyTmpkWEp6TGx4dUlDQWdJQ0FxWEc0Z0lDQWdJQ29nUUdWNFlXMXdiR1VnUEdOaGNIUnBiMjQrVTJWMGRHbHVaeUJoSUhCeWIzQmxjblI1UEM5allYQjBhVzl1UGx4dUlDQWdJQ0FxSUM4dklFMWhjbXQxY0NCcGN6cGNiaUFnSUNBZ0tpQXZMeUE4WkdsMklHbGtQVndpYjI1bFhDSStQQzlrYVhZK1hHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCMllYSWdaV3hsYldWdWRDQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2liMjVsWENJcE8xeHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuQnliM0JsY25SNUxuTmxkQ2hsYkdWdFpXNTBMQ0JjSW14aFltVnNYQ0lzSUZ3aWRHVnpkRndpS1R0Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUM4dklFNXZkeUJ0WVhKcmRYQWdhWE02WEc0Z0lDQWdJQ29nTHk4Z1BHUnBkaUJwWkQxY0ltOXVaVndpSUdGeWFXRXRiR0ZpWld3OVhDSjBaWE4wWENJK1BDOWthWFkrWEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVUWlhSMGFXNW5JR0VnY0hKdmNHVnlkSGtnZFhOcGJtY2dZU0JtZFc1amRHbHZiand2WTJGd2RHbHZiajVjYmlBZ0lDQWdLaUF2THlCTllYSnJkWEFnYVhNNlhHNGdJQ0FnSUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0YkdGaVpXdzlYQ0owWlhOMFhDSStQQzlrYVhZK1hHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCMllYSWdaV3hsYldWdWRDQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2liMjVsWENJcE8xeHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuQnliM0JsY25SNUxuTmxkQ2hsYkdWdFpXNTBMQ0JjSW14aFltVnNYQ0lzSUdaMWJtTjBhVzl1SUNocExDQmhkSFJ5S1NCN1hHNGdJQ0FnSUNvZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1sa0lDc2dYQ0pmWDF3aUlDc2dhU0FySUZ3aVgxOWNJaUFySUdGMGRISTdYRzRnSUNBZ0lDb2dmU3dnTUNrN1hHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lBdkx5Qk9iM2NnYldGeWEzVndJR2x6T2x4dUlDQWdJQ0FxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWlCaGNtbGhMV3hoWW1Wc1BWd2liMjVsWDE4d1gxOTBaWE4wWENJK1BDOWthWFkrWEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVEYjI1MlpYSjBhVzVuSUhSb1pTQnlaWE4xYkhROEwyTmhjSFJwYjI0K1hHNGdJQ0FnSUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNBZ0lDQXFJQzh2SUR4a2FYWWdhV1E5WENKdmJtVmNJaUJoY21saExXeGhZbVZzUFZ3aWRHVnpkRndpUGp3dlpHbDJQbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dkbUZ5SUdWc1pXMWxiblFnUFNCa2IyTjFiV1Z1ZEM1blpYUkZiR1Z0Wlc1MFFubEpaQ2hjSW05dVpWd2lLVHRjYmlBZ0lDQWdLaUJvWVc1a2JHVnljeTV3Y205d1pYSjBlUzV6WlhRb1pXeGxiV1Z1ZEN3Z1hDSnNZV0psYkZ3aUxDQm1kVzVqZEdsdmJpQW9hU3dnWVhSMGNpa2dlMXh1SUNBZ0lDQXFJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NXBaQ0FySUZ3aVgxOWNJaUFySUdrZ0t5QmNJbDlmWENJZ0t5QmhkSFJ5TzF4dUlDQWdJQ0FxSUgwc0lEQXNJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTa2dlMXh1SUNBZ0lDQXFJQ0FnSUNCeVpYUjFjbTRnZG1Gc2RXVXVkRzlWY0hCbGNrTmhjMlVvS1R0Y2JpQWdJQ0FnS2lCOUtUdGNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlDOHZJRTV2ZHlCdFlYSnJkWEFnYVhNNlhHNGdJQ0FnSUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0YkdGaVpXdzlYQ0pQVGtWZlh6QmZYMVJGVTFSY0lqNDhMMlJwZGo1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0J6WlhRNklHWjFibU4wYVc5dUlDaGxiR1Z0Wlc1MExDQnVZVzFsTENCMllXeDFaU3dnYVc1a1pYZ3NJR052Ym5abGNuUXBJSHRjYmx4dUlDQWdJQ0FnSUNCMllYSWdjSEp2Y0NBOUlHaGhibVJzWlhKelcwaEJUa1JNUlZKZlVGSlBVRVZTVkZsZExuQmhjbk5sS0c1aGJXVXBPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2FHOXZheUE5SUNRdVlYSnBZVWh2YjJ0elczQnliM0F1YzNSbGJWMDdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tHbHpSV3hsYldWdWRDaGxiR1Z0Wlc1MEtTa2dlMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSkM1cGMwWjFibU4wYVc5dUtIWmhiSFZsS1NrZ2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZzZFdVZ1BTQjJZV3gxWlM1allXeHNLRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJHVnRaVzUwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBibVJsZUN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaV3hsYldWdWRDNW5aWFJCZEhSeWFXSjFkR1VvY0hKdmNDNW1kV3hzS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNrN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRWtMbWx6Um5WdVkzUnBiMjRvWTI5dWRtVnlkQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNTJaWEowSUQwZ2FXUmxiblJwZEhrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMllXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSFpoYkhWbElDRTlQU0J1ZFd4c0tTQjdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2FHOXZheUFtSmlCb2IyOXJMbk5sZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVd4MVpTQTlJR2h2YjJzdWMyVjBLR1ZzWlcxbGJuUXNJSFpoYkhWbExDQndjbTl3TG1aMWJHd3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGJIVmxJRDBnWTI5dWRtVnlkQ2gyWVd4MVpTazdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJHVnRaVzUwTG5ObGRFRjBkSEpwWW5WMFpTaHdjbTl3TG1aMWJHd3NJR2x1ZEdWeWNISmxkRk4wY21sdVp5aDJZV3gxWlNrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJSDBzWEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGFHVmphM01nZEc4Z2MyVmxJR2xtSUhSb1pTQm5hWFpsYmlBOFkyOWtaVDV1WVcxbFBDOWpiMlJsUGlCbGVHbHpkSE1nYjI0Z2RHaGxJR2RwZG1WdVhHNGdJQ0FnSUNvZ1BHTnZaR1UrWld4bGJXVnVkRHd2WTI5a1pUNHVJRlJvWlNBOFkyOWtaVDV1WVcxbFBDOWpiMlJsUGlCcGN5QmhiSGRoZVhNZ2JtOXliV0ZzYVhObFpDQW9jMlZsWEc0Z0lDQWdJQ29nVzJwUmRXVnllUzV1YjNKdFlXeHBjMlZCY21saFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmt1Ym05eWJXRnNhWE5sUVhKcFlYMHBJR0Z1WkNCcFpseHVJQ0FnSUNBcUlEeGpiMlJsUG1Wc1pXMWxiblE4TDJOdlpHVStJR2x6SUc1dmRDQmhiaUJsYkdWdFpXNTBJQ2h6WldVZ2UwQnNhVzVySUdselJXeGxiV1Z1ZEgwcElIUm9aVzVjYmlBZ0lDQWdLaUE4WTI5a1pUNW1ZV3h6WlR3dlkyOWtaVDRnZDJsc2JDQmhiSGRoZVhNZ1ltVWdjbVYwZFhKdVpXUXVYRzRnSUNBZ0lDcGNiaUFnSUNBZ0tpQkFjSEpwZG1GMFpWeHVJQ0FnSUNBcUlFQndZWEpoYlNBZ0lIdEZiR1Z0Wlc1MGZTQmxiR1Z0Wlc1MFhHNGdJQ0FnSUNvZ0lDQWdJQ0FnSUNBZ1JXeGxiV1Z1ZENCMGJ5QjBaWE4wTGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0FnSUh0VGRISnBibWQ5SUNCdVlXMWxYRzRnSUNBZ0lDb2dJQ0FnSUNBZ0lDQWdWMEZKTFVGU1NVRWdjSEp2Y0dWeWRIa2dkRzhnWTJobFkyc3VYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQWdlMEp2YjJ4bFlXNTlYRzRnSUNBZ0lDb2dJQ0FnSUNBZ0lDQWdWMmhsZEdobGNpQnZjaUJ1YjNRZ2RHaGxJR1ZzWlcxbGJuUWdhR0Z6SUhSb1pTQm5hWFpsYmlCd2NtOXdaWEowZVM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCbGVHRnRjR3hsWEc0Z0lDQWdJQ29nTHk4Z1RXRnlhM1Z3SUdsek9seHVJQ0FnSUNBcUlDOHZJRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lpQmhjbWxoTFd4aFltVnNQVndpZEdWemRGd2lQand2WkdsMlBseHVJQ0FnSUNBcVhHNGdJQ0FnSUNvZ2RtRnlJR1ZzWlcxbGJuUWdQU0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDaGNJbTl1WlZ3aUtUdGNiaUFnSUNBZ0tpQm9ZVzVrYkdWeWN5NXdjbTl3WlhKMGVTNW9ZWE1vWld4bGJXVnVkQ3dnWENKc1lXSmxiRndpS1RzZ0x5OGdMVDRnZEhKMVpWeHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuQnliM0JsY25SNUxtaGhjeWhsYkdWdFpXNTBMQ0JjSW1KMWMzbGNJaWs3SUNBdkx5QXRQaUJtWVd4elpWeHVJQ0FnSUNBcUwxeHVJQ0FnSUdoaGN6b2dablZ1WTNScGIyNGdLR1ZzWlcxbGJuUXNJRzVoYldVcElIdGNibHh1SUNBZ0lDQWdJQ0IyWVhJZ2NISnZjQ0E5SUdoaGJtUnNaWEp6VzBoQlRrUk1SVkpmVUZKUFVFVlNWRmxkTG5CaGNuTmxLRzVoYldVcE8xeHVJQ0FnSUNBZ0lDQjJZWElnYUc5dmF5QTlJQ1F1WVhKcFlVaHZiMnR6VzNCeWIzQXVjM1JsYlYwN1hHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHbHpSV3hsYldWdWRDaGxiR1Z0Wlc1MEtWeHVJQ0FnSUNBZ0lDQWdJQ0FnUHlBb2FHOXZheUFtSmlCb2IyOXJMbWhoY3lsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBL0lHaHZiMnN1YUdGektHVnNaVzFsYm5Rc0lIQnliM0F1Wm5Wc2JDbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQTZJR1ZzWlcxbGJuUXVhR0Z6UVhSMGNtbGlkWFJsS0hCeWIzQXVablZzYkNsY2JpQWdJQ0FnSUNBZ0lDQWdJRG9nWm1Gc2MyVTdYRzVjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMGN5QjBhR1VnZG1Gc2RXVWdiMllnZEdobElGZEJTUzFCVWtsQklIQnliM0JsY25SNUlHWnliMjBnZEdobElHZHBkbVZ1WEc0Z0lDQWdJQ29nUEdOdlpHVStaV3hsYldWdWREd3ZZMjlrWlQ0Z1lXNWtJSEpsZEhWeWJuTWdhWFFnZFc1amFHRnVaMlZrTGlCVWFHVWdQR052WkdVK2JtRnRaVHd2WTI5a1pUNGdhWE5jYmlBZ0lDQWdLaUJ1YjNKdFlXeHBjMlZrSUNoelpXVmNiaUFnSUNBZ0tpQmJhbEYxWlhKNUxtNXZjbTFoYkdselpVRnlhV0ZkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTNXViM0p0WVd4cGMyVkJjbWxoZlNrdUlFbG1YRzRnSUNBZ0lDb2dQR052WkdVK1pXeGxiV1Z1ZER3dlkyOWtaVDRnYVhNZ2JtOTBJR0Z1SUdWc1pXMWxiblFnS0hObFpTQjdRR3hwYm1zZ2FYTkZiR1Z0Wlc1MGZTa2diM0pjYmlBZ0lDQWdLaUE4WTI5a1pUNXVZVzFsUEM5amIyUmxQaUJwY3lCdWIzUWdjbVZqYjJkdWFYTmxaQ0FvYzJWbFhHNGdJQ0FnSUNvZ2UwQnNhVzVySUdoaGJtUnNaWEp6TG5CeWIzQmxjblI1TG1oaGMzMHBJSFJvWlc0Z1BHTnZaR1UrZFc1a1pXWnBibVZrUEM5amIyUmxQaUJwY3lCeVpYUjFjbTVsWkM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCd2NtbDJZWFJsWEc0Z0lDQWdJQ29nUUhCaGNtRnRJQ0FnZTBWc1pXMWxiblI5SUNBZ0lDQWdJQ0FnSUdWc1pXMWxiblJjYmlBZ0lDQWdLaUFnSUNBZ0lDQWdJQ0JGYkdWdFpXNTBJSFJ2SUdGalkyVnpjeTVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdJQ0I3VTNSeWFXNW5mU0FnSUNBZ0lDQWdJQ0FnYm1GdFpWeHVJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0lGZEJTUzFCVWtsQklIQnliM0JsY25SNUlIUnZJR0ZqWTJWemN5NWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlDQjdVM1J5YVc1bmZIVnVaR1ZtYVc1bFpIMWNiaUFnSUNBZ0tpQWdJQ0FnSUNBZ0lDQlhRVWt0UVZKSlFTQmhkSFJ5YVdKMWRHVWdiM0lnZFc1a1pXWnBibVZrSUdsbUlIUm9aU0JoZEhSeWFXSjFkR1VnYVhOdUozUWdjMlYwTGx4dUlDQWdJQ0FxWEc0Z0lDQWdJQ29nUUdWNFlXMXdiR1ZjYmlBZ0lDQWdLaUF2THlCTllYSnJkWEFnYVhNNlhHNGdJQ0FnSUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0YkdGaVpXdzlYQ0owWlhOMFhDSStQQzlrYVhZK1hHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCMllYSWdaV3hsYldWdWRDQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tGd2liMjVsWENJcE8xeHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuQnliM0JsY25SNUxtZGxkQ2hsYkdWdFpXNTBMQ0JjSW14aFltVnNYQ0lwT3lBdkx5QXRQaUJjSW5SbGMzUmNJbHh1SUNBZ0lDQXFJR2hoYm1Sc1pYSnpMbkJ5YjNCbGNuUjVMbWRsZENobGJHVnRaVzUwTENCY0ltSjFjM2xjSWlrN0lDOHZJQzArSUhWdVpHVm1hVzVsWkZ4dUlDQWdJQ0FxTDF4dUlDQWdJR2RsZERvZ1puVnVZM1JwYjI0Z0tHVnNaVzFsYm5Rc0lHNWhiV1VwSUh0Y2JseHVJQ0FnSUNBZ0lDQjJZWElnYUdGdVpHeGxjaUE5SUdoaGJtUnNaWEp6VzBoQlRrUk1SVkpmVUZKUFVFVlNWRmxkTzF4dUlDQWdJQ0FnSUNCMllYSWdjSEp2Y0NBOUlHaGhibVJzWlhJdWNHRnljMlVvYm1GdFpTazdYRzRnSUNBZ0lDQWdJSFpoY2lCb2IyOXJJRDBnSkM1aGNtbGhTRzl2YTNOYmNISnZjQzV6ZEdWdFhUdGNiaUFnSUNBZ0lDQWdkbUZ5SUhKbGMzQnZibk5sSUQwZ2FHRnVaR3hsY2k1b1lYTW9aV3hsYldWdWRDd2dibUZ0WlNsY2JpQWdJQ0FnSUNBZ0lDQWdJRDhnS0dodmIyc2dKaVlnYUc5dmF5NW5aWFFwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUHlCb2IyOXJMbWRsZENobGJHVnRaVzUwTENCd2NtOXdMbVoxYkd3cFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ09pQmxiR1Z0Wlc1MExtZGxkRUYwZEhKcFluVjBaU2h3Y205d0xtWjFiR3dwWEc0Z0lDQWdJQ0FnSUNBZ0lDQTZJSFZ1WkdWbWFXNWxaRHRjYmx4dUlDQWdJQ0FnSUNBdkx5Qm5aWFJCZEhSeWFXSjFkR1VnWTJGdUlISmxkSFZ5YmlCdWRXeHNMQ0J1YjNKdFlXeHBjMlVnZEc4Z2RXNWtaV1pwYm1Wa0xseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVnpjRzl1YzJVZ1BUMDlJRzUxYkd4Y2JpQWdJQ0FnSUNBZ0lDQWdJRDhnZFc1a1pXWnBibVZrWEc0Z0lDQWdJQ0FnSUNBZ0lDQTZJSEpsYzNCdmJuTmxPMXh1WEc0Z0lDQWdmU3hjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZKbGJXOTJaWE1nWVNCWFFVa3RRVkpKUVNCaGRIUnlhV0oxZEdVZ1puSnZiU0IwYUdVZ1oybDJaVzRnUEdOdlpHVStaV3hsYldWdWREd3ZZMjlrWlQ0dUlGUm9aVnh1SUNBZ0lDQXFJRHhqYjJSbFBtNWhiV1U4TDJOdlpHVStJR2xtSUc1dmNtMWhiR2x6WldRZ0tITmxaVnh1SUNBZ0lDQXFJRnRxVVhWbGNua3VibTl5YldGc2FYTmxRWEpwWVYxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVMbTV2Y20xaGJHbHpaVUZ5YVdGOUtTQmhibVFnYVdaY2JpQWdJQ0FnS2lBOFkyOWtaVDVsYkdWdFpXNTBQQzlqYjJSbFBpQnBjeUJ1YjNRZ1lXNGdaV3hsYldWdWRDQW9jMlZsSUh0QWJHbHVheUJwYzBWc1pXMWxiblI5S1NCMGFHVnVJRzV2WEc0Z0lDQWdJQ29nWVdOMGFXOXVJR2x6SUhSaGEyVnVMbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dRSEJ5YVhaaGRHVmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ0lDQjdSV3hsYldWdWRIMGdaV3hsYldWdWRGeHVJQ0FnSUNBcUlDQWdJQ0FnSUNBZ0lFVnNaVzFsYm5RZ2RHOGdiVzlrYVdaNUxseHVJQ0FnSUNBcUlFQndZWEpoYlNBZ0lIdFRkSEpwYm1kOUlDQnVZVzFsWEc0Z0lDQWdJQ29nSUNBZ0lDQWdJQ0FnVjBGSkxVRlNTVUVnWVhSMGNtbGlkWFJsSUhSdklISmxiVzkyWlM1Y2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCbGVHRnRjR3hsWEc0Z0lDQWdJQ29nTHk4Z1RXRnlhM1Z3SUdsek9seHVJQ0FnSUNBcUlDOHZJRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lpQmhjbWxoTFd4aFltVnNQVndpZEdWemRGd2lQand2WkdsMlBseHVJQ0FnSUNBcVhHNGdJQ0FnSUNvZ2RtRnlJR1ZzWlcxbGJuUWdQU0JrYjJOMWJXVnVkQzVuWlhSRmJHVnRaVzUwUW5sSlpDaGNJbTl1WlZ3aUtUdGNiaUFnSUNBZ0tpQm9ZVzVrYkdWeWN5NXdjbTl3WlhKMGVTNTFibk5sZENobGJHVnRaVzUwTENCY0lteGhZbVZzWENJcE8xeHVJQ0FnSUNBcVhHNGdJQ0FnSUNvZ0x5OGdUbTkzSUcxaGNtdDFjQ0JwY3pwY2JpQWdJQ0FnS2lBdkx5QThaR2wySUdsa1BWd2liMjVsWENJK1BDOWthWFkrWEc0Z0lDQWdJQ292WEc0Z0lDQWdkVzV6WlhRNklHWjFibU4wYVc5dUlDaGxiR1Z0Wlc1MExDQnVZVzFsS1NCN1hHNWNiaUFnSUNBZ0lDQWdkbUZ5SUhCeWIzQWdQU0JvWVc1a2JHVnljMXRJUVU1RVRFVlNYMUJTVDFCRlVsUlpYUzV3WVhKelpTaHVZVzFsS1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJR2h2YjJzZ1BTQWtMbUZ5YVdGSWIyOXJjMXR3Y205d0xuTjBaVzFkTzF4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2hwYzBWc1pXMWxiblFvWld4bGJXVnVkQ2twSUh0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRm9iMjlySUh4OElDRm9iMjlyTG5WdWMyVjBJSHg4SUdodmIyc3VkVzV6WlhRb1pXeGxiV1Z1ZEN3Z2NISnZjQzVtZFd4c0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1ZzWlcxbGJuUXVjbVZ0YjNabFFYUjBjbWxpZFhSbEtIQnliM0F1Wm5Wc2JDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdmVnh1WEc1OU8xeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZaMnh2WW1Gc0wyaGhibVJzWlhKekwzSmxabVZ5Wlc1alpTNXFjMXh1WEc1Y2JpOHFLbHh1SUNvZ1NHRnVaR3hsY3lCdGIyUnBabmxwYm1jZ1YwRkpMVUZTU1VFZ2NtVm1aWEpsYm1ObGN5NGdWVzVzYVd0bElIdEFiR2x1YXlCb1lXNWtiR1Z5Y3k1d2NtOXdaWEowZVgwc0lIUm9hWE5jYmlBcUlIZHBiR3dnWTNKbFlYUmxJSEpsWm1WeVpXNWpaWE1nZEc4Z1pXeGxiV1Z1ZEhNZ1lXNWtJSEpsZEhWeWJpQjBhR1Z0TGlCVWFHVWdiMjVzZVNCa1pXWnBibVZrSUcxbGRHaHZaSE5jYmlBcUlHRnlaVHBjYmlBcUlEeGljajU3UUd4cGJtc2dhR0Z1Wkd4bGNuTXVjbVZtWlhKbGJtTmxMbk5sZEgwZ2MyVjBjeUJoSUhKbFptVnlaVzVqWlM1Y2JpQXFJRHhpY2o1N1FHeHBibXNnYUdGdVpHeGxjbk11Y21WbVpYSmxibU5sTG1kbGRIMGdaMlYwY3lCaElISmxabVZ5Wlc1alpTNWNiaUFxWEc0Z0tpQkFZV3hwWVhNZ0lDQWdJSEpsWm1WeVpXNWpaVnh1SUNvZ1FHMWxiV0psY205bUlDQm9ZVzVrYkdWeWMxeHVJQ29nUUc1aGJXVnpjR0ZqWlZ4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxTDF4dWFHRnVaR3hsY25OYlNFRk9SRXhGVWw5U1JVWkZVa1ZPUTBWZElEMGdlMXh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUVdSa2N5QjBhR1VnVjBGSkxVRlNTVUVnY21WbVpYSmxibU5sSUhSdklEeGpiMlJsUG1Wc1pXMWxiblE4TDJOdlpHVStMaUJVYUdseklHUnBabVpsY25NZ1puSnZiVnh1SUNBZ0lDQXFJSHRBYkdsdWF5Qm9ZVzVrYkdWeWN5NXdjbTl3WlhKMGVTNXpaWFI5SUdsdUlIUm9ZWFFnUEdOdlpHVStjbVZtWlhKbGJtTmxQQzlqYjJSbFBpQnBjeUJ3WVhOelpXUmNiaUFnSUNBZ0tpQjBhSEp2ZFdkb0lGdHFVWFZsY25rbmN5QWtJR1oxYm1OMGFXOXVYWHRBYkdsdWF5Qm9kSFJ3T2k4dllYQnBMbXB4ZFdWeWVTNWpiMjB2YW5GMVpYSjVMMzBnWVc1a1hHNGdJQ0FnSUNvZ2FXUmxiblJwWm1sbFpDQW9jMlZsSUZ0cVVYVmxjbmtqYVdSbGJuUnBabmxkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTnBaR1Z1ZEdsbWVYMHBJSGRwZEdoY2JpQWdJQ0FnS2lCMGFHVWdTVVFnYjJZZ2RHaGxJR1pwY25OMElHMWhkR05vSUdKbGFXNW5JSFZ6WldRdUlGUm9aWEpsSUdseklHRnNjMjhnYm05Y2JpQWdJQ0FnS2lBOFkyOWtaVDVqYjI1MlpYSjBQQzlqYjJSbFBpQndZWEpoYldWMFpYSXVYRzRnSUNBZ0lDb2dQR0p5UGp4aWNqNWNiaUFnSUNBZ0tpQlVhR1VnUEdOdlpHVStibUZ0WlR3dlkyOWtaVDRnYVhNZ2MzUnBiR3dnYm05eWJXRnNhWE5sWkNBb2MyVmxYRzRnSUNBZ0lDb2dXMnBSZFdWeWVTNXViM0p0WVd4cGMyVkJjbWxoWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua3VibTl5YldGc2FYTmxRWEpwWVgwcExpQkpabHh1SUNBZ0lDQXFJRHhqYjJSbFBtVnNaVzFsYm5ROEwyTnZaR1UrSUdseklHNXZkQ0JoYmlCbGJHVnRaVzUwSUNoelpXVWdlMEJzYVc1cklHbHpSV3hsYldWdWRIMHBJSFJvWlc0Z2JtOWNiaUFnSUNBZ0tpQmhZM1JwYjI0Z2FYTWdkR0ZyWlc0dVhHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCQWNISnBkbUYwWlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0FnSUh0RmJHVnRaVzUwZlNBZ0lDQWdJR1ZzWlcxbGJuUmNiaUFnSUNBZ0tpQWdJQ0FnSUNBZ0lDQkZiR1Z0Wlc1MElIUnZJRzF2WkdsbWVTNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ0lDQjdVM1J5YVc1bmZTQWdJQ0FnSUNCdVlXMWxYRzRnSUNBZ0lDb2dJQ0FnSUNBZ0lDQWdWMEZKTFVGU1NVRWdZWFIwY21saWRYUmxJSFJ2SUhObGRDNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ0lDQjdhbEYxWlhKNVgzQmhjbUZ0ZlNCeVpXWmxjbVZ1WTJWY2JpQWdJQ0FnS2lBZ0lDQWdJQ0FnSUNCRmJHVnRaVzUwSUhSdklISmxabVZ5Wlc1alpTNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ0lDQjdUblZ0WW1WeWZTQWdJQ0FnSUNCcGJtUmxlRnh1SUNBZ0lDQXFJQ0FnSUNBZ0lDQWdJRWx1WkdWNElHOW1JRHhqYjJSbFBtVnNaVzFsYm5ROEwyTnZaR1UrSUhkcGRHaHBiaUIwYUdVZ1kyOXNiR1ZqZEdsdmJpNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQmxlR0Z0Y0d4bFhHNGdJQ0FnSUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNBZ0lDQXFJQzh2SUR4a2FYWWdZMnhoYzNNOVhDSnZibVZjSWo0OEwyUnBkajVjYmlBZ0lDQWdLaUF2THlBOFpHbDJJR05zWVhOelBWd2lkSGR2WENJK1BDOWthWFkrWEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUIyWVhJZ1pXeGxiV1Z1ZENBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENJdWIyNWxYQ0lwTzF4dUlDQWdJQ0FxSUdoaGJtUnNaWEp6TG5KbFptVnlaVzVqWlM1elpYUW9aV3hsYldWdWRDd2dYQ0pzWVdKbGJHeGxaR0o1WENJc0lGd2lMblIzYjF3aUtUdGNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlDOHZJRTV2ZHlCdFlYSnJkWEFnYVhNNlhHNGdJQ0FnSUNvZ0x5OGdQR1JwZGlCamJHRnpjejFjSW05dVpWd2lJR0Z5YVdFOWJHRmlaV3hzWldSaWVUMWNJbUZ1YjI1NWJXOTFjekJjSWo0OEwyUnBkajVjYmlBZ0lDQWdLaUF2THlBOFpHbDJJR05zWVhOelBWd2lkSGR2WENJZ2FXUTlYQ0poYm05dWVXMXZkWE13WENJK1BDOWthWFkrWEc0Z0lDQWdJQ292WEc0Z0lDQWdjMlYwT2lCbWRXNWpkR2x2YmlBb1pXeGxiV1Z1ZEN3Z2JtRnRaU3dnY21WbVpYSmxibU5sTENCcGJtUmxlQ2tnZTF4dVhHNGdJQ0FnSUNBZ0lHaGhibVJzWlhKelcwaEJUa1JNUlZKZlVGSlBVRVZTVkZsZExuTmxkQ2hjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnNaVzFsYm5Rc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J1WVcxbExGeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WbVpYSmxibU5sTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdhVzVrWlhnc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWkdWdWRHbG1lVnh1SUNBZ0lDQWdJQ0FwTzF4dVhHNGdJQ0FnZlN4Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFZGxkSE1nZEdobElISmxabVZ5Wlc1alpTQm1jbTl0SUhSb1pTQm5hWFpsYmlBOFkyOWtaVDVsYkdWdFpXNTBQQzlqYjJSbFBpQmhibVFnY21WMGRYSnVjeUJwZENCaGMxeHVJQ0FnSUNBcUlHRWdQR052WkdVK2FsRjFaWEo1UEM5amIyUmxQaUJ2WW1wbFkzUXVJRlJvYVhNZ1pHbG1abVZ5Y3lCbWNtOXRYRzRnSUNBZ0lDb2dlMEJzYVc1cklHaGhibVJzWlhKekxuQnliM0JsY25SNUxtZGxkSDBnYVc0Z2RHaGhkQ0IwYUdVZ2JXRjBZMmdnYVhNZ1lYTnpkVzFsWkNCMGJ5QmlaU0JoYmlCSlJGeHVJQ0FnSUNBcUlHRnVaQ0JoSUVSUFRTQnNiMjlyZFhBZ2FYTWdaRzl1WlNCaVlYTmxaQ0IxY0c5dUlIUm9ZWFF1SUZSb1pTQThZMjlrWlQ1dVlXMWxQQzlqYjJSbFBpQnBjeUJ6ZEdsc2JGeHVJQ0FnSUNBcUlHNXZjbTFoYkdselpXUWdLSE5sWlZ4dUlDQWdJQ0FxSUZ0cVVYVmxjbmt1Ym05eWJXRnNhWE5sUVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1TG01dmNtMWhiR2x6WlVGeWFXRjlLUzRnU1dZZ2RHaGxYRzRnSUNBZ0lDb2dWMEZKTFVGU1NVRWdZWFIwY21saWRYUmxJR2x6SUc1dmRDQm1iM1Z1WkNBb2MyVmxJSHRBYkdsdWF5Qm9ZVzVrYkdWeWN5NXdjbTl3WlhKMGVTNW9ZWE45SUhSb1pXNWNiaUFnSUNBZ0tpQThZMjlrWlQ1MWJtUmxabWx1WldROEwyTnZaR1UrSUdseklISmxkSFZ5Ym1Wa0xseHVJQ0FnSUNBcVhHNGdJQ0FnSUNvZ1FIQnlhWFpoZEdWY2JpQWdJQ0FnS2lCQWNHRnlZVzBnSUNCN1JXeGxiV1Z1ZEgwZ0lDQWdJQ0FnSUNBZ1pXeGxiV1Z1ZEZ4dUlDQWdJQ0FxSUNBZ0lDQWdJQ0FnSUVWc1pXMWxiblFnZEc4Z1kyaGxZMnN1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJQ0FnZTFOMGNtbHVaMzBnSUNBZ0lDQWdJQ0FnSUc1aGJXVmNiaUFnSUNBZ0tpQWdJQ0FnSUNBZ0lDQlhRVWt0UVZKSlFTQnlaV1psY21WdVkyVXVYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQWdlMnBSZFdWeWVYeDFibVJsWm1sdVpXUjlYRzRnSUNBZ0lDb2dJQ0FnSUNBZ0lDQWdhbEYxWlhKNUlHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUhKbFptVnlaVzVqWlNCdmNpQjFibVJsWm1sdVpXUWdhV1lnZEdobFhHNGdJQ0FnSUNvZ0lDQWdJQ0FnSUNBZ1lYUjBjbWxpZFhSbElHbHpiaWQwSUhObGRDNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQmxlR0Z0Y0d4bFhHNGdJQ0FnSUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNBZ0lDQXFJQzh2SUR4a2FYWWdhV1E5WENKdmJtVmNJaUJoY21saFBXeGhZbVZzYkdWa1luazlYQ0owZDI5Y0lqNDhMMlJwZGo1Y2JpQWdJQ0FnS2lBdkx5QThaR2wySUdsa1BWd2lkSGR2WENJK1BDOWthWFkrWEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUIyWVhJZ1pXeGxiV1Z1ZENBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Z3aWIyNWxYQ0lwTzF4dUlDQWdJQ0FxSUdoaGJtUnNaWEp6TG5KbFptVnlaVzVqWlM1blpYUW9aV3hsYldWdWRDd2dYQ0pzWVdKbGJHeGxaR0o1WENJcE8xeHVJQ0FnSUNBcUlDOHZJQzArSUNRb1BHUnBkaUJwWkQxY0luUjNiMXdpUGlsY2JpQWdJQ0FnS2lCb1lXNWtiR1Z5Y3k1eVpXWmxjbVZ1WTJVdVoyVjBLR1ZzWlcxbGJuUXNJRndpWTI5dWRISnZiSE5jSWlrN1hHNGdJQ0FnSUNvZ0x5OGdMVDRnZFc1a1pXWnBibVZrWEc0Z0lDQWdJQ292WEc0Z0lDQWdaMlYwT2lCbWRXNWpkR2x2YmlBb1pXeGxiV1Z1ZEN3Z2JtRnRaU2tnZTF4dVhHNGdJQ0FnSUNBZ0lIWmhjaUJvWVc1a2JHVnlJRDBnYUdGdVpHeGxjbk5iU0VGT1JFeEZVbDlRVWs5UVJWSlVXVjA3WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdoaGJtUnNaWEl1YUdGektHVnNaVzFsYm5Rc0lHNWhiV1VwWEc0Z0lDQWdJQ0FnSUNBZ0lDQS9JQ1FvWENJalhDSWdLeUJvWVc1a2JHVnlMbWRsZENobGJHVnRaVzUwTENCdVlXMWxLU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lEb2dkVzVrWldacGJtVmtPMXh1WEc0Z0lDQWdmVnh1WEc1OU8xeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZaMnh2WW1Gc0wyaGhibVJzWlhKekwzTjBZWFJsTG1welhHNWNibHh1ZG1GeUlGSkZSMFZZVUY5Q1QwOU1SVUZPSUQwZ0wxNG9QenAwY25WbGZHWmhiSE5sS1NRdk8xeHVkbUZ5SUZaQlRGVkZYMDFKV0VWRUlEMGdYQ0p0YVhobFpGd2lPMXh1WEc0dktpcGNiaUFxSUVoaGJtUnNaWE1nVjBGSkxVRlNTVUVnYzNSaGRHVnpMaUJVYUdseklHUnBabVpsY25NZ1puSnZiU0I3UUd4cGJtc2dhR0Z1Wkd4bGNuTXVjSEp2Y0dWeWRIbDlJR2x1SUhSb1lYUmNiaUFxSUhaaGJIVmxjeUJoY21VZ1kyOWxjbU5sWkNCcGJuUnZJR0p2YjJ4bFlXNXpJR0psWm05eVpTQmlaV2x1WnlCelpYUWdZVzVrSUdFZ1ltOXZiR1ZoYmlBb2IzSWdkR2hsWEc0Z0tpQnpkSEpwYm1jZ1hDSnRhWGhsWkZ3aUtTQjNhV3hzSUdKbElISmxkSFZ5Ym1Wa0xseHVJQ29nUEdKeVBudEFiR2x1YXlCb1lXNWtiR1Z5Y3k1emRHRjBaUzV5WldGa2ZTQmpiMjUyWlhKMGN5QjBhR1VnZG1Gc2RXVWdhVzUwYnlCaElHSnZiMnhsWVc0dVhHNGdLaUE4WW5JK2UwQnNhVzVySUdoaGJtUnNaWEp6TG5OMFlYUmxMbk5sZEgwZ2MyVjBjeUIwYUdVZ2MzUmhkR1V1WEc0Z0tpQThZbkkrZTBCc2FXNXJJR2hoYm1Sc1pYSnpMbk4wWVhSbExtZGxkSDBnWjJWMGN5QjBhR1VnYzNSaGRHVXVYRzRnS2x4dUlDb2dRR0ZzYVdGeklDQWdJQ0J6ZEdGMFpWeHVJQ29nUUcxbGJXSmxjbTltSUNCb1lXNWtiR1Z5YzF4dUlDb2dRRzVoYldWemNHRmpaVnh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFMMXh1YUdGdVpHeGxjbk5iU0VGT1JFeEZVbDlUVkVGVVJWMGdQU0I3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCU1pXRmtjeUIwYUdVZ2NtRjNJSFpoYkhWbElHRnVaQ0JqYjI1MlpYSjBjeUJwZENCcGJuUnZJR0VnWW05dmJHVmhiaUJ2Y2lCMGFHVWdjM1J5YVc1blhHNGdJQ0FnSUNvZ1BHTnZaR1UrWENKdGFYaGxaRndpUEM5amIyUmxQaUFvWVd4M1lYbHpJR3h2ZDJWeUlHTmhjMlVwTGlCSlppQThZMjlrWlQ1eVlYYzhMMk52WkdVK0lHTmhibTV2ZENCaVpWeHVJQ0FnSUNBcUlHTnZjbkpsWTNSc2VTQmpiMjUyWlhKMFpXUXNJR2wwSUdseklHRnpjM1Z0WldRZ2RHOGdZbVVnUEdOdlpHVStkSEoxWlR3dlkyOWtaVDR1WEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBY0hKcGRtRjBaVnh1SUNBZ0lDQXFJRUJ3WVhKaGJTQWdJSHMvZlNCeVlYZGNiaUFnSUNBZ0tpQWdJQ0FnSUNBZ0lDQldZV3gxWlNCMGJ5QnlaV0ZrTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnSUh0Q2IyOXNaV0Z1ZkZOMGNtbHVaMzFjYmlBZ0lDQWdLaUFnSUNBZ0lDQWdJQ0JEYjI1MlpYSjBaV1FnZG1Gc2RXVXVYRzRnSUNBZ0lDcGNiaUFnSUNBZ0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNURiMjUyWlhKMGFXNW5JSFpoYkhWbGN6d3ZZMkZ3ZEdsdmJqNWNiaUFnSUNBZ0tpQm9ZVzVrYkdWeWN5NXpkR0YwWlM1eVpXRmtLSFJ5ZFdVcE95QWdJQ0F2THlBdFBpQjBjblZsWEc0Z0lDQWdJQ29nYUdGdVpHeGxjbk11YzNSaGRHVXVjbVZoWkNoY0ltWmhiSE5sWENJcE95QXZMeUF0UGlCbVlXeHpaVnh1SUNBZ0lDQXFJR2hoYm1Sc1pYSnpMbk4wWVhSbExuSmxZV1FvWENJeFhDSXBPeUFnSUNBZ0x5OGdMVDRnZEhKMVpWeHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuTjBZWFJsTG5KbFlXUW9NQ2s3SUNBZ0lDQWdJQzh2SUMwK0lHWmhiSE5sWEc0Z0lDQWdJQ29nYUdGdVpHeGxjbk11YzNSaGRHVXVjbVZoWkNoY0ltMXBlR1ZrWENJcE95QXZMeUF0UGlCY0ltMXBlR1ZrWENKY2JpQWdJQ0FnS2x4dUlDQWdJQ0FxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGxWdWNtVmpiMmR1YVhObFpDQjJZV3gxWlhNZ1pHVm1ZWFZzZENCMGJ5QjBjblZsUEM5allYQjBhVzl1UGx4dUlDQWdJQ0FxSUdoaGJtUnNaWEp6TG5OMFlYUmxMbkpsWVdRb1hDSXlYQ0lwT3lBZ0lDQWdJQzh2SUMwK0lIUnlkV1ZjYmlBZ0lDQWdLaUJvWVc1a2JHVnljeTV6ZEdGMFpTNXlaV0ZrS0MweEtUc2dJQ0FnSUNBZ0x5OGdMVDRnZEhKMVpWeHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuTjBZWFJsTG5KbFlXUW9XMTBwT3lBZ0lDQWdJQ0F2THlBdFBpQjBjblZsWEc0Z0lDQWdJQ29nYUdGdVpHeGxjbk11YzNSaGRHVXVjbVZoWkNoY0ltMXBlR1ZrTGx3aUtUc2dMeThnTFQ0Z2RISjFaVnh1SUNBZ0lDQXFMMXh1SUNBZ0lISmxZV1E2SUdaMWJtTjBhVzl1SUhKbFlXUlRkR0YwWlNoeVlYY3BJSHRjYmx4dUlDQWdJQ0FnSUNCMllYSWdjM1JoZEdVZ1BTQjBjblZsTzF4dVhHNGdJQ0FnSUNBZ0lITjNhWFJqYUNBb2RIbHdaVzltSUhKaGR5a2dlMXh1WEc0Z0lDQWdJQ0FnSUdOaGMyVWdYQ0ppYjI5c1pXRnVYQ0k2WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJSE4wWVhSbElEMGdjbUYzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZbkpsWVdzN1hHNWNiaUFnSUNBZ0lDQWdZMkZ6WlNCY0luTjBjbWx1WjF3aU9seHVYRzRnSUNBZ0lDQWdJQ0FnSUNCeVlYY2dQU0J5WVhjdWRHOU1iM2RsY2tOaGMyVW9LVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hKaGR5QTlQVDBnVmtGTVZVVmZUVWxZUlVRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpkR0YwWlNBOUlISmhkenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9jbUYzSUQwOVBTQmNJakZjSWlCOGZDQnlZWGNnUFQwOUlGd2lNRndpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MzUmhkR1VnUFNCeVpXRmtVM1JoZEdVb0szSmhkeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLRkpGUjBWWVVGOUNUMDlNUlVGT0xuUmxjM1FvY21GM0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE4wWVhSbElEMGdjbUYzSUQwOVBTQmNJblJ5ZFdWY0lqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnWW5KbFlXczdYRzVjYmlBZ0lDQWdJQ0FnWTJGelpTQmNJbTUxYldKbGNsd2lPbHh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY21GM0lEMDlQU0F3SUh4OElISmhkeUE5UFQwZ01Ta2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE4wWVhSbElEMGdJU0Z5WVhjN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR0p5WldGck8xeHVYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYzNSaGRHVTdYRzVjYmlBZ0lDQjlMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVTJWMGN5QjBhR1VnVjBGSkxVRlNTVUVnYzNSaGRHVWdaR1ZtYVc1bFpDQnBiaUE4WTI5a1pUNXVZVzFsUEM5amIyUmxQaUJ2YmlCMGFHVWdaMmwyWlc1Y2JpQWdJQ0FnS2lBOFkyOWtaVDVsYkdWdFpXNTBQQzlqYjJSbFBpNGdWR2hwY3lCa2FXWm1aWEp6SUdaeWIyMGdlMEJzYVc1cklHaGhibVJzWlhKekxuQnliM0JsY25SNUxuTmxkSDBnYVc1Y2JpQWdJQ0FnS2lCMGFHRjBJRHhqYjJSbFBuTjBZWFJsUEM5amIyUmxQaUJwY3lCamIyNTJaWEowWldRZ2FXNTBieUJoSUdKdmIyeGxZVzRnYjNKY2JpQWdJQ0FnS2lBOFkyOWtaVDVjSW0xcGVHVmtYQ0k4TDJOdlpHVStJR0psWm05eVpTQmlaV2x1WnlCaGMzTnBaMjVsWkNBb2MyVmxYRzRnSUNBZ0lDb2dlMEJzYVc1cklHaGhibVJzWlhKekxuTjBZWFJsTG5KbFlXUjlLU0JoYm1RZ2RHaGxjbVVnYVhNZ2JtOGdQR052WkdVK1kyOXVkbVZ5ZER3dlkyOWtaVDVjYmlBZ0lDQWdLaUJ3WVhKaGJYUmxjaTRnVkdobElEeGpiMlJsUG01aGJXVThMMk52WkdVK0lHbHpJSE4wYVd4c0lHNXZjbTFoYkdselpXUWdLSE5sWlZ4dUlDQWdJQ0FxSUZ0cVVYVmxjbmt1Ym05eWJXRnNhWE5sUVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1TG01dmNtMWhiR2x6WlVGeWFXRjlLUzVjYmlBZ0lDQWdLbHh1SUNBZ0lDQXFJRUJ3Y21sMllYUmxYRzRnSUNBZ0lDb2dRSEJoY21GdElDQWdlMFZzWlcxbGJuUjlJR1ZzWlcxbGJuUmNiaUFnSUNBZ0tpQWdJQ0FnSUNBZ0lDQkZiR1Z0Wlc1MElIUnZJRzF2WkdsbWVTNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ0lDQjdVM1J5YVc1bmZTQWdibUZ0WlZ4dUlDQWdJQ0FxSUNBZ0lDQWdJQ0FnSUZkQlNTMUJVa2xCSUdGMGRISnBZblYwWlNCMGJ5QnpaWFF1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJQ0FnZXo5OUlDQWdJQ0FnSUhOMFlYUmxYRzRnSUNBZ0lDb2dJQ0FnSUNBZ0lDQWdVM1JoZEdVZ2RHOGdjMlYwTGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0FnSUh0T2RXMWlaWEo5SUNCcGJtUmxlRnh1SUNBZ0lDQXFJQ0FnSUNBZ0lDQWdJRWx1WkdWNElHOW1JRHhqYjJSbFBtVnNaVzFsYm5ROEwyTnZaR1UrSUhkcGRHaHBiaUIwYUdVZ1kyOXNiR1ZqZEdsdmJpNWNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlFQmxlR0Z0Y0d4bFhHNGdJQ0FnSUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNBZ0lDQXFJQzh2SUR4a2FYWWdhV1E5WENKdmJtVmNJajQ4TDJScGRqNWNiaUFnSUNBZ0tpQXZMeUE4WkdsMklHbGtQVndpZEhkdlhDSStQQzlrYVhZK1hHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCMllYSWdiMjVsSUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRFSjVTV1FvWENKdmJtVmNJaWs3WEc0Z0lDQWdJQ29nZG1GeUlIUjNieUE5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLRndpZEhkdlhDSXBPMXh1SUNBZ0lDQXFJR2hoYm1Sc1pYSnpMbk4wWVhSbExuTmxkQ2h2Ym1Vc0lGd2lZblZ6ZVZ3aUxDQjBjblZsS1R0Y2JpQWdJQ0FnS2lCb1lXNWtiR1Z5Y3k1emRHRjBaUzV6WlhRb2RIZHZMQ0JjSW1Ob1pXTnJaV1JjSWl3Z1hDSnRhWGhsWkZ3aUtUdGNiaUFnSUNBZ0tseHVJQ0FnSUNBcUlDOHZJRTV2ZHlCdFlYSnJkWEFnYVhNNlhHNGdJQ0FnSUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0WW5WemVUMWNJblJ5ZFdWY0lqNDhMMlJwZGo1Y2JpQWdJQ0FnS2lBdkx5QThaR2wySUdsa1BWd2lkSGR2WENJZ1lYSnBZUzFqYUdWamEyVmtQVndpYldsNFpXUmNJajQ4TDJScGRqNWNiaUFnSUNBZ0tpOWNiaUFnSUNCelpYUTZJR1oxYm1OMGFXOXVJQ2hsYkdWdFpXNTBMQ0J1WVcxbExDQnpkR0YwWlN3Z2FXNWtaWGdwSUh0Y2JseHVJQ0FnSUNBZ0lDQm9ZVzVrYkdWeWMxdElRVTVFVEVWU1gxQlNUMUJGVWxSWlhTNXpaWFFvWEc0Z0lDQWdJQ0FnSUNBZ0lDQmxiR1Z0Wlc1MExGeHVJQ0FnSUNBZ0lDQWdJQ0FnYm1GdFpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUhOMFlYUmxMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2FXNWtaWGdzWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9ZVzVrYkdWeWMxdElRVTVFVEVWU1gxTlVRVlJGWFM1eVpXRmtYRzRnSUNBZ0lDQWdJQ2s3WEc1Y2JpQWdJQ0I5TEZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1VtVmhaSE1nZEdobElGZEJTUzFCVWtsQklITjBZWFJsSUc5dUlEeGpiMlJsUG1Wc1pXMWxiblE4TDJOdlpHVStMaUJVYUdseklHUnBabVpsY25NZ1puSnZiVnh1SUNBZ0lDQXFJSHRBYkdsdWF5Qm9ZVzVrYkdWeWN5NXdjbTl3WlhKMGVTNW5aWFI5SUdsdUlIUm9ZWFFnZEdobElISmxjM1ZzZENCcGN5QmpiMjUyWlhKMFpXUWdhVzUwYnlCaFhHNGdJQ0FnSUNvZ1ltOXZiR1ZoYmlCdmNpQjBhR1VnYzNSeWFXZHVJR0JjSW0xcGVHVmtYQ0pnSUdKbFptOXlaU0JpWldsdVp5QnlaWFIxY201bFpDNGdWR2hsWEc0Z0lDQWdJQ29nUEdOdlpHVStibUZ0WlR3dlkyOWtaVDRnYVhNZ2MzUnBiR3dnYm05eWJXRnNhWE5sWkNBb2MyVmxJSHRBYkdsdWF5QnFVWFZsY25rdWJtOXliV0ZzYVhObFFYSnBZWDBwTGx4dUlDQWdJQ0FxWEc0Z0lDQWdJQ29nUUhCeWFYWmhkR1ZjYmlBZ0lDQWdLaUJBY0dGeVlXMGdJQ0I3Uld4bGJXVnVkSDBnSUNBZ1pXeGxiV1Z1ZEZ4dUlDQWdJQ0FxSUNBZ0lDQWdJQ0FnSUVWc1pXMWxiblFnZEc4Z1lXTmpaWE56TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0FnSUh0VGRISnBibWQ5SUNBZ0lDQnVZVzFsWEc0Z0lDQWdJQ29nSUNBZ0lDQWdJQ0FnVjBGSkxVRlNTVUVnYzNSaGRHVWdkRzhnY21WaFpDNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlDQjdRVkpKUVY5emRHRjBaWDFjYmlBZ0lDQWdLaUFnSUNBZ0lDQWdJQ0JUZEdGMFpTQnZaaUIwYUdVZ1YwRkpMVUZTU1VFZ2NISnZjR1Z5ZEhrdVhHNGdJQ0FnSUNwY2JpQWdJQ0FnS2lCQVpYaGhiWEJzWlZ4dUlDQWdJQ0FxSUM4dklFMWhjbXQxY0NCcGN6cGNiaUFnSUNBZ0tpQXZMeUE4WkdsMklHbGtQVndpYjI1bFhDSWdZWEpwWVMxaWRYTjVQVndpZEhKMVpWd2lJR0Z5YVdFdFkyaGxZMnRsWkQxY0ltMXBlR1ZrWENJK1BDOWthWFkrWEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUIyWVhJZ1pXeGxiV1Z1ZENBOUlHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0Z3aWIyNWxYQ0lwTzF4dUlDQWdJQ0FxSUdoaGJtUnNaWEp6TG5OMFlYUmxMbWRsZENobGJHVnRaVzUwTENCY0ltSjFjM2xjSWlrN0lDQWdJQ0F2THlBdFBpQjBjblZsWEc0Z0lDQWdJQ29nYUdGdVpHeGxjbk11YzNSaGRHVXVaMlYwS0dWc1pXMWxiblFzSUZ3aVkyaGxZMnRsWkZ3aUtUc2dJQzh2SUMwK0lGd2liV2w0WldSY0lseHVJQ0FnSUNBcUlHaGhibVJzWlhKekxuTjBZWFJsTG1kbGRDaGxiR1Z0Wlc1MExDQmNJbVJwYzJGaWJHVmtYQ0lwT3lBdkx5QXRQaUIxYm1SbFptbHVaV1JjYmlBZ0lDQWdLaTljYmlBZ0lDQm5aWFE2SUdaMWJtTjBhVzl1SUNobGJHVnRaVzUwTENCdVlXMWxLU0I3WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJR2hoYm1Sc1pYSWdQU0JvWVc1a2JHVnljMXRJUVU1RVRFVlNYMUJTVDFCRlVsUlpYVHRjYmlBZ0lDQWdJQ0FnZG1GeUlITjBZWFJsTzF4dUlDQWdJQ0FnSUNCMllYSWdkbUZzZFdVN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0doaGJtUnNaWEl1YUdGektHVnNaVzFsYm5Rc0lHNWhiV1VwS1NCN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGJIVmxJRDBnYUdGdVpHeGxjaTVuWlhRb1pXeGxiV1Z1ZEN3Z2JtRnRaU2t1ZEc5TWIzZGxja05oYzJVb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOMFlYUmxJRDBnZG1Gc2RXVWdQVDA5SUZaQlRGVkZYMDFKV0VWRVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1B5QjJZV3gxWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSURvZ0tGSkZSMFZZVUY5Q1QwOU1SVUZPTG5SbGMzUW9kbUZzZFdVcElDWW1JSFpoYkhWbElEMDlQU0JjSW5SeWRXVmNJaWs3WEc1Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnpkR0YwWlR0Y2JseHVJQ0FnSUgxY2JseHVmVHRjYmx4dUx5OGdVMjkxY21ObE9pQXZjM0pqTDJkc2IySmhiQzloWTJObGMzTXVhbk5jYmx4dVhHNHZLaXBjYmlBcUlGUm9hWE1nWm5WdVkzUnBiMjRnYUdGdVpHeGxjeUJoYkd3Z2RHaGxJR2hsWVhaNUlHeHBablJwYm1jZ2IyWWdaMlYwZEdsdVp5QnZjaUJ6WlhSMGFXNW5JRmRCU1MxQlVrbEJYRzRnS2lCaGRIUnlhV0oxZEdWekxpQkpkQ0JwY3lCa1pYTnBaMjVsWkNCMGJ5QmlaU0JoYkd3Z2RHaGhkQ2R6SUc1bFkyVnpjMkZ5ZVNCbWIzSmNiaUFxSUZ0cVVYVmxjbmtqWVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STJGeWFXRjlMRnh1SUNvZ1cycFJkV1Z5ZVNOaGNtbGhVbVZtWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pZWEpwWVZKbFpuMGdZVzVrWEc0Z0tpQmJhbEYxWlhKNUkyRnlhV0ZUZEdGMFpWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STJGeWFXRlRkR0YwWlgwdUlGUm9hWE1nWm5WdVkzUnBiMjRnZDJsc2JDQmphR1ZqYTF4dUlDb2dhWFJ6SUdGeVozVnRaVzUwY3lCMGJ5QmtaWFJsY20xcGJtVWdkMmhsZEdobGNpQnBkQ0J6YUc5MWJHUWdZbVVnZFhObFpDQmhjeUJoSUdkbGRIUmxjaUJ2Y2lCaElITmxkSFJsY2x4dUlDb2dZVzVrSUhCaGMzTmxjeUIwYUdVZ1lYQndjbTl3Y21saGRHVWdZWEpuZFcxbGJuUnpJSFJ2SUhSb1pTQjdRR3hwYm1zZ2FHRnVaR3hsY25OOUlHMWxkR2h2WkhNZ1ltRnpaV1FnYjI1Y2JpQXFJRHhqYjJSbFBuUjVjR1U4TDJOdlpHVStJQ2gzYUdsamFDQjNhV3hzSUdSbFptRjFiSFFnZEc4Z2UwQnNhVzVySUdoaGJtUnNaWEp6TG5CeWIzQmxjblI1ZlNCcFpseHVJQ29nYjIxdGFYUjBaV1FnYjNJZ2JtOTBJSEpsWTI5bmJtbHpaV1FwTGx4dUlDb2dQR0p5UGp4aWNqNWNiaUFxSUZSb1pTQnlaWFIxY200Z2RtRnNkV1VnYVhNZ1ltRnpaV1FnYjI0Z2RHaGxJSFI1Y0dVZ2IyWWdZV04wYVc5dUlHSmxhVzVuSUhCbGNtWnZjbTFsWkM0Z1NXWWdkR2hwYzF4dUlDb2dablZ1WTNScGIyNGdhWE1nYzJWMGRHbHVaeUIwYUdWdUlHRWdhbEYxWlhKNUlHOWlhbVZqZENCdlppQjBhR1VnYldGMFkyaGxjeUJwY3lCeVpYUjFjbTVsWkNBb2QyaHBZMmdnYVhOY2JpQXFJR0ZzYlc5emRDQmhiSGRoZVhNZ1BHTnZaR1UrYWxGbGJHVnRaVzUwY3p3dlkyOWtaVDRwT3lCcFppQjBhR1VnWm5WdVkzUnBiMjRnYVhNZ1lTQm5aWFIwWlhJZ2RHaGxiaUIwYUdWY2JpQXFJSEpsYzNWc2RITWdZWEpsSUhKbGRIVnlibVZrSUdadmNpQjBhR1VnWm1seWMzUWdaV3hsYldWdWRDQnBiaUE4WTI5a1pUNXFVV1ZzWlcxbGJuUnpQQzlqYjJSbFBpNWNiaUFxSUR4aWNqNDhZbkkrWEc0Z0tpQkJiSFJvYjNWbmFDQjBhR2x6SUdSbGMyTnlhWEIwYVc5dUlHbHpJRzV2ZENCbGMzQmxZMmxoYkd4NUlHVjRkR1Z1YzJsMlpTd2dkR2hsSUdOdlpHVWdjMmh2ZFd4a0lHSmxYRzRnS2lCMlpYSjVJR1ZoYzNrZ2RHOGdabTlzYkc5M0lHRnVaQ0JqYjIxdFpXNTBaV1FnYzJodmRXeGtJSFJvWlhKbElHSmxJR0Z1ZVNCdVpXVmtJSFJ2SUcxdlpHbG1lU0JwZEM0Z1QyNWpaVnh1SUNvZ2RHaGxJR052Y25KbFkzUWdZWEpuZFcxbGJuUnpJR0Z5WlNCaVpXbHVaeUJ3WVhOelpXUWdkRzhnZEdobElHRndjSEp2Y0hKcFlYUmxJSHRBYkdsdWF5Qm9ZVzVrYkdWeWMzMWNiaUFxSUcxbGRHaHZaQ3dnZEdobGVTQjNhV3hzSUhSaGEyVWdZMkZ5WlNCdlppQjBhR1VnY21WemRDNWNiaUFxWEc0Z0tpQkFaMnh2WW1Gc1hHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUNBZ2UycFJkV1Z5ZVgwZ0lDQWdJQ0FnSUNBZ0lDQnFVV1ZzWlcxbGJuUnpYRzRnS2lBZ0lDQWdJQ0FnSUNCcVVYVmxjbmtnYjJKcVpXTjBJSFJ2SUcxdlpHbG1lUzloWTJObGMzTXVYRzRnS2lCQWNHRnlZVzBnSUNCN1QySnFaV04wZkZOMGNtbHVaMzBnSUNBZ0lIQnliM0JsY25SNVhHNGdLaUFnSUNBZ0lDQWdJQ0JGYVhSb1pYSWdWMEZKTFVGU1NVRWdibUZ0WlhNZ1lXNWtJSFpoYkhWbGN5QnZjaUIwYUdVZ1YwRkpMVUZTU1VFZ2NISnZjR1Z5ZEhrZ2JtRnRaUzVjYmlBcUlFQndZWEpoYlNBZ0lIcy9mU0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdXM1poYkhWbFhWeHVJQ29nSUNBZ0lDQWdJQ0FnVm1Gc2RXVWdkRzhnYzJWMExseHVJQ29nUUhCaGNtRnRJQ0FnZTFOMGNtbHVaMzBnSUNBZ0lDQWdJQ0FnSUNCYmRIbHdaVDFjSW5CeWIzQmxjblI1WENKZFhHNGdLaUFnSUNBZ0lDQWdJQ0JQY0hScGIyNWhiQ0JoZEhSeWFXSjFkR1VnZEhsd1pTNWNiaUFxSUVCeVpYUjFjbTRnSUh0cVVYVmxjbmw4UVZKSlFWOXpkR0YwWlgxY2JpQXFJQ0FnSUNBZ0lDQWdJRVZwZEdobGNpQjBhR1VnYWxGMVpYSjVJRzlpYW1WamRDQnZiaUIzYUdsamFDQlhRVWt0UVZKSlFTQndjbTl3WlhKMGFXVnpJSGRsY21VZ2MyVjBJRzl5WEc0Z0tpQWdJQ0FnSUNBZ0lDQjBhR1VnZG1Gc2RXVnpJRzltSUhSb1pTQlhRVWt0UVZKSlFTQndjbTl3WlhKMGFXVnpMbHh1SUNwY2JpQXFJRUJsZUdGdGNHeGxJRHhqWVhCMGFXOXVQbE5sZEhScGJtY2dZU0J6YVc1bmJHVWdjSEp2Y0dWeWRIazhMMk5oY0hScGIyNCtYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTmNiaUFxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUIyWVhJZ2FsRnZibVVnUFNBa0tGd2lJMjl1WlZ3aUtUdGNiaUFxSUdGalkyVnpjeWhxVVc5dVpTd2dYQ0pqYjI1MGNtOXNjMXdpTENCY0luUjNiMXdpS1RzZ0x5OGdMVDRnYWxGMVpYSjVLRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lqNHBYRzRnS2x4dUlDb2dMeThnVG05M0lHMWhjbXQxY0NCcGMxeHVJQ29nTHk4Z1BHUnBkaUJwWkQxY0ltOXVaVndpSUdGeWFXRXRZMjl1ZEhKdmJITTlYQ0owZDI5Y0lqNWNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNVRaWFIwYVc1bklHMTFiSFJwY0d4bElISmxabVZ5Wlc1alpYTThMMk5oY0hScGIyNCtYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTmNiaUFxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0owZDI5Y0lqNDhMMlJwZGo1Y2JpQXFYRzRnS2lCMllYSWdhbEZ2Ym1VZ1BTQWtLRndpSTI5dVpWd2lLVHRjYmlBcUlHRmpZMlZ6Y3locVVXOXVaU3dnZTF4dUlDb2dJQ0FnSUdOdmJuUnliMnh6T2lBa0tGd2laR2wyWENJcExtVnhLREVwWEc0Z0tpQjlMQ0JjSW5KbFptVnlaVzVqWlZ3aUtUc2dMeThnTFQ0Z2FsRjFaWEo1S0R4a2FYWWdhV1E5WENKdmJtVmNJajRwWEc0Z0tseHVJQ29nTHk4Z1RtOTNJRzFoY210MWNDQnBjMXh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlHRnlhV0V0WTI5dWRISnZiSE05WENKMGQyOWNJajVjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0owZDI5Y0lqNDhMMlJwZGo1Y2JpQXFYRzRnS2lCQVpYaGhiWEJzWlNBOFkyRndkR2x2Ymo1SFpYUjBhVzVuSUdFZ2MzUmhkR1U4TDJOaGNIUnBiMjQrWEc0Z0tpQXZMeUJOWVhKcmRYQWdhWE5jYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lpQmhjbWxoTFdKMWMzazlYQ0owY25WbFhDSStQQzlrYVhZK1hHNGdLbHh1SUNvZ2RtRnlJR3BSYjI1bElEMGdKQ2hjSWlOdmJtVmNJaWs3WEc0Z0tpQmhZMk5sYzNNb2FsRnZibVVzSUZ3aVluVnplVndpTENCMWJtUmxabWx1WldRc0lGd2ljM1JoZEdWY0lpazdJQzh2SUMwK0lIUnlkV1ZjYmlBcUwxeHVablZ1WTNScGIyNGdZV05qWlhOektHcFJaV3hsYldWdWRITXNJSEJ5YjNCbGNuUjVMQ0IyWVd4MVpTd2dkSGx3WlNrZ2UxeHVYRzRnSUNBZ2RtRnlJSFJsYlhCUWNtOXdaWEowZVNBOUlIQnliM0JsY25SNU8xeHVJQ0FnSUhaaGNpQnBjMUJ5YjNCbGNuUjVUMkpxWldOMElEMGdKQzVwYzFCc1lXbHVUMkpxWldOMEtIQnliM0JsY25SNUtUdGNiaUFnSUNCMllYSWdhWE5IWlhRZ1BTQjJZV3gxWlNBOVBUMGdkVzVrWldacGJtVmtJQ1ltSUNGcGMxQnliM0JsY25SNVQySnFaV04wTzF4dVhHNGdJQ0FnTHk4Z1RXRnJaU0J6ZFhKbElIUm9aU0J3Y205d1pYSjBlU0IyWVd4MVpTQnBjeUJwYmlCMGFHVWdaWGh3WldOMFpXUWdabTl5YldGME9pQmhiaUJ2WW1wbFkzUWdabTl5WEc0Z0lDQWdMeThnYzJWMGRHbHVaeUJoYm1RZ1lTQnpkSEpwYm1jZ1ptOXlJR2RsZEhScGJtY3VYRzRnSUNBZ2FXWWdLQ0ZwYzBkbGRDQW1KaUFoYVhOUWNtOXdaWEowZVU5aWFtVmpkQ2tnZTF4dVhHNGdJQ0FnSUNBZ0lIQnliM0JsY25SNUlEMGdlMzA3WEc0Z0lDQWdJQ0FnSUhCeWIzQmxjblI1VzNSbGJYQlFjbTl3WlhKMGVWMGdQU0IyWVd4MVpUdGNibHh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRWxtSUhkbElHUnZiaWQwSUdoaGRtVWdiM0lnWkc5dUozUWdjbVZqYjJkdWFYTmxJSFJvWlNCMGVYQmxMQ0JrWldaaGRXeDBJSFJ2SUZ3aWNISnZjR1Z5ZEhsY0lpNWNiaUFnSUNCcFppQW9JWFI1Y0dVZ2ZId2dJV2hoYm1Sc1pYSnpXM1I1Y0dWZEtTQjdYRzRnSUNBZ0lDQWdJSFI1Y0dVZ1BTQklRVTVFVEVWU1gxQlNUMUJGVWxSWk8xeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUJwYzBkbGRGeHVJQ0FnSUNBZ0lDQS9JR2hoYm1Sc1pYSnpXM1I1Y0dWZExtZGxkQ2hxVVdWc1pXMWxiblJ6V3pCZExDQndjbTl3WlhKMGVTbGNiaUFnSUNBZ0lDQWdPaUJxVVdWc1pXMWxiblJ6TG1WaFkyZ29ablZ1WTNScGIyNGdLR2x1WkdWNExDQmxiR1Z0Wlc1MEtTQjdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDUXVaV0ZqYUNod2NtOXdaWEowZVN3Z1puVnVZM1JwYjI0Z0tHdGxlU3dnZG1Gc0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhR0Z1Wkd4bGNuTmJkSGx3WlYwdWMyVjBLR1ZzWlcxbGJuUXNJR3RsZVN3Z2RtRnNMQ0JwYm1SbGVDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNibHh1SUNBZ0lDQWdJQ0I5S1R0Y2JseHVmVnh1WEc0dkx5QlRiM1Z5WTJVNklDOXpjbU12WjJ4dlltRnNMM0psYlc5MlpVRjBkSEpwWW5WMFpTNXFjMXh1WEc1Y2JseHVMeW9xWEc0Z0tpQlNaVzF2ZG1WeklIUm9aU0J1WVcxbFpDQlhRVWt0UVZKSlFTQmhkSFJ5YVdKMWRHVWdabkp2YlNCaGJHd2daV3hsYldWdWRITWdhVzRnZEdobElHTjFjbkpsYm5SY2JpQXFJR052Ykd4bFkzUnBiMjR1SUZSb1pTQThZMjlrWlQ1dVlXMWxQQzlqYjJSbFBpQnBjeUJ1YjNKdFlXeHBjMlZrSUNoelpXVmNiaUFxSUZ0cVVYVmxjbmt1Ym05eWJXRnNhWE5sUVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1TG01dmNtMWhiR2x6WlVGeWFXRjlLUzRnVkdocGN5Qm1kVzVqZEdsdmJseHVJQ29nYVhNZ1lXeHBZWE5sWkNCaGN5QmJhbEYxWlhKNUkzSmxiVzkyWlVGeWFXRlNaV1pkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTnlaVzF2ZG1WQmNtbGhVbVZtZlNCaGJtUmNiaUFxSUZ0cVVYVmxjbmtqY21WdGIzWmxRWEpwWVZOMFlYUmxYWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25ramNtVnRiM1psUVhKcFlWTjBZWFJsZlM1Y2JpQXFYRzRnS2lCQVlXeHBZWE1nSUNBZ2NtVnRiM1psUVhKcFlWeHVJQ29nUUcxbGJXSmxjbTltSUdWNGRHVnlibUZzT21wUmRXVnllVnh1SUNvZ1FHbHVjM1JoYm1ObFhHNGdLaUJBY0dGeVlXMGdJQ0FnZTFOMGNtbHVaMzBnYm1GdFpWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZkQlNTMUJVa2xCSUdGMGRISnBZblYwWlNCMGJ5QnlaVzF2ZG1VdVhHNGdLaUJBY21WMGRYSnVJQ0FnZTJwUmRXVnllWDFjYmlBcUlDQWdJQ0FnSUNBZ0lDQnFVWFZsY25rZ1lYUjBjbWxpZFhSbElISmxjSEpsYzJWdWRHbHVaeUIwYUdVZ1pXeGxiV1Z1ZEhNZ2JXOWthV1pwWldRdVhHNGdLbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFJQzh2SUUxaGNtdDFjQ0JwYzF4dUlDb2dMeThnUEdScGRpQnBaRDFjSW05dVpWd2lJR0Z5YVdFdFluVnplVDFjSW5SeWRXVmNJajQ4TDJScGRqNWNiaUFxWEc0Z0tpQWtLRndpSTI5dVpWd2lLUzV5WlcxdmRtVkJjbWxoS0Z3aVluVnplVndpS1RzZ0x5OGdMVDRnYWxGMVpYSjVLRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lqNHBYRzRnS2x4dUlDb2dMeThnVG05M0lHMWhjbXQxY0NCcGN6cGNiaUFxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcUwxeHVablZ1WTNScGIyNGdjbVZ0YjNabFFYUjBjbWxpZFhSbEtHNWhiV1VwSUh0Y2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxtVmhZMmdvWm5WdVkzUnBiMjRnS0dsbmJtOXlaU3dnWld4bGJXVnVkQ2tnZTF4dUlDQWdJQ0FnSUNCb1lXNWtiR1Z5YzF0SVFVNUVURVZTWDFCU1QxQkZVbFJaWFM1MWJuTmxkQ2hsYkdWdFpXNTBMQ0J1WVcxbEtUdGNiaUFnSUNCOUtUdGNibHh1ZlZ4dVhHNHZMeUJUYjNWeVkyVTZJQzl6Y21NdmJXVnRZbVZ5TDI1dmNtMWhiR2x6WlVGeWFXRXVhbk5jYmx4dVhHNHZLaXBjYmlBcUlFRnNhV0Z6SUc5bUlGdHFVWFZsY25rdWJtOXliV0ZzYVhObFFYSnBZVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUxtNXZjbTFoYkdselpVRnlhV0Y5WEc0Z0tseHVJQ29nUUdaMWJtTjBhVzl1WEc0Z0tpQkFZV3hwWVhNZ0lDQWdaWGgwWlhKdVlXdzZhbEYxWlhKNUxtNXZjbTFoYkdsNlpVRnlhV0ZjYmlBcUlFQnRaVzFpWlhKdlppQmxlSFJsY201aGJEcHFVWFZsY25sY2JpQXFJRUJ3WVhKaGJTQWdJQ0I3VTNSeWFXNW5mU0J1WVcxbFhHNGdLaUFnSUNBZ0lDQWdJQ0FnUVhSMGNtbGlkWFJsSUc1aGJXVWdkRzhnYm05eWJXRnNhWE5sTGx4dUlDb2dRSEpsZEhWeWJpQWdJSHRUZEhKcGJtZDlYRzRnS2lBZ0lDQWdJQ0FnSUNBZ1RtOXliV0ZzYVhObFpDQmhkSFJ5YVdKMWRHVWdibUZ0WlM1Y2JpQXFJRUJ3Y205d1pYSjBlU0I3VDJKcVpXTjBManhUZEhKcGJtYytmU0JqWVdOb1pWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZSb1pTQmpZV05vWlNCdlppQnlaWEYxWlhOMGN5QjBieUJ5WlhOd2IyNXpaWE11WEc0Z0tpOWNiaVF1Ym05eWJXRnNhWHBsUVhKcFlTQTlJRzV2Y20xaGJHbHpaVHRjYmlRdWJtOXliV0ZzYVhObFFYSnBZU0E5SUc1dmNtMWhiR2x6WlR0Y2JseHVMeThnVTI5MWNtTmxPaUF2YzNKakwyMWxiV0psY2k5aGNtbGhSbWw0TG1welhHNWNibHh1THlvcVhHNGdLaUJCSUcxaGNDQnZaaUIxYm5CeVpXWnBlR1ZrSUZkQlNTMUJVa2xCSUdGMGRISnBZblYwWlhNZ2RHaGhkQ0J6YUc5MWJHUWdZbVVnWTI5dWRtVnlkR1ZrSUdKbFptOXlaU0JpWldsdVoxeHVJQ29nYm05eWJXRnNhWE5sWkNBb2MyVmxJRnRxVVhWbGNua3VibTl5YldGc2FYTmxRWEpwWVYxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVMbTV2Y20xaGJHbHpaVUZ5YVdGOUtTNWNiaUFxWEc0Z0tpQkFZV3hwWVhNZ0lDQWdaWGgwWlhKdVlXdzZhbEYxWlhKNUxtRnlhV0ZHYVhoY2JpQXFJRUJ0WlcxaVpYSnZaaUJsZUhSbGNtNWhiRHBxVVhWbGNubGNiaUFxSUVCMGVYQmxJQ0FnSUNCN1QySnFaV04wTGp4VGRISnBibWMrZlZ4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGtOdmNuSmxZM1JwYm1jZ1lTQmpiMjF0YjI0Z2RIbHdiend2WTJGd2RHbHZiajVjYmlBcUlDUXVZWEpwWVVacGVDNWlkV1I1SUQwZ1hDSmlkWE41WENJN1hHNGdLaUFrTG01dmNtMWhiR2x6WlVGeWFXRW9YQ0ppZFdSNVhDSXBPeUFnSUNBZ0lDOHZJQzArSUZ3aVlYSnBZUzFpZFhONVhDSmNiaUFxSUNRdWJtOXliV0ZzYVhObFFYSnBZU2hjSW1GeWFXRXRZblZrZVZ3aUtUc2dMeThnTFQ0Z1hDSmhjbWxoTFdKMWMzbGNJbHh1SUNvdlhHNGtMbUZ5YVdGR2FYZ2dQU0I3WEc1Y2JpQWdJQ0F2THlCVWFHbHpJR2x6SUhSb1pTQlZVeUJGYm1kc2FYTm9JSE53Wld4c2FXNW5JR0oxZENCMGFHVWdZMk5sYzNOcFltbHNhWFI1SUVGUVNTQmtaV1pwYm1Wa0lIUm9aVnh1SUNBZ0lDOHZJR0YwZEhKcFluVjBaU0IzYVhSb0lIUm9aU0JrYjNWaWJHVWdUQzVjYmlBZ0lDQXZMeUJvZEhSd2N6b3ZMM2QzZHk1M015NXZjbWN2VkZJdmQyRnBMV0Z5YVdFdmMzUmhkR1Z6WDJGdVpGOXdjbTl3WlhKMGFXVnpJMkZ5YVdFdGJHRmlaV3hzWldSaWVWeHVJQ0FnSUd4aFltVnNaV1JpZVRvZ1hDSnNZV0psYkd4bFpHSjVYQ0pjYmx4dWZUdGNibHh1THk4Z1NXWWdVSEp2ZUhrZ2FYTWdZWFpoYVd4aFlteGxMQ0IzWlNCallXNGdkWE5sSUdsMElIUnZJR05vWldOcklIZG9aVzVsZG1WeUlDUXVZWEpwWVVacGVDQnBjeUJ0YjJScFptbGxaRnh1THk4Z1lXNWtJR2x1ZG1Gc2FXUmhkR1VnZEdobElHTmhZMmhsSUc5bUlHNXZjbTFoYkdselpTZ3BJSGRvWlc0Z2FYUWdhWE11SUZSb2FYTWdhWE1nWVNCc2IzUWdiVzl5WlZ4dUx5OGdaV1ptYVdOcFpXNTBJSFJvWVc0Z1lXeDNZWGx6SUdOdmJuWmxjblJwYm1jZ0pDNWhjbWxoUm1sNElIUnZJR0VnU2xOUFRpQnpkSEpwYm1jZ2RHOGdaVzV6ZFhKbElIUm9aVnh1THk4Z1kyRmphR1VnYVhNZ1lXTmpkWEpoZEdVdVhHNXBaaUFvU1ZOZlVGSlBXRmxmUVZaQlNVeEJRa3hGS1NCN1hHNWNiaUFnSUNBa0xtRnlhV0ZHYVhnZ1BTQnVaWGNnVUhKdmVIa29KQzVoY21saFJtbDRMQ0I3WEc1Y2JpQWdJQ0FnSUNBZ2MyVjBPaUJtZFc1amRHbHZiaUFvZEdGeVoyVjBMQ0J1WVcxbExDQjJZV3gxWlNrZ2UxeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCdWIzSnRZV3hwYzJVdVkyRmphR1VnUFNCN2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSaGNtZGxkRnR1WVcxbFhTQTlJSFpoYkhWbE8xeHVYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJSDBwTzF4dVhHNTlYRzVjYmk4dklGTnZkWEpqWlRvZ0wzTnlZeTl0WlcxaVpYSXZZWEpwWVVodmIydHpMbXB6WEc1Y2JseHVMeW9xWEc0Z0tpQkJJR052Ykd4bFkzUnBiMjRnYjJZZ2FHOXZhM01nZEdoaGRDQmphR0Z1WjJVZ2RHaGxJR0psYUdGMmFXOTFjaUJ2WmlCaGRIUnlhV0oxZEdWeklHSmxhVzVuSUhObGRDeGNiaUFxSUhKbGRISnBaWFpsWkN3Z1kyaGxZMnRsWkNCdmNpQnlaVzF2ZG1Wa0lDaGpZV3hzWldRZ1czTmxkRjE3UUd4cGJtc2dRVkpKUVY5b2IyOXJYM05sZEgwc1hHNGdLaUJiWjJWMFhYdEFiR2x1YXlCQlVrbEJYMmh2YjJ0ZloyVjBmU3dnVzJoaGMxMTdRR3hwYm1zZ1FWSkpRVjlvYjI5clgyaGhjMzBzWEc0Z0tpQmJkVzV6WlhSZGUwQnNhVzVySUVGU1NVRmZhRzl2YTE5MWJuTmxkSDBnTFNCelpXVWdlMEJzYVc1cklFRlNTVUZmYUc5dmEzMGdabTl5SUdaMWJHd2daR1YwWVdsc2N5a3VJRlJvWlZ4dUlDb2dibUZ0WlNCdlppQjBhR1VnYUc5dmF5QnBjeUJoYkhkaGVYTWdkR2hsSUhWdUxYQnlaV1pwZUdWa0lGZEJTUzFCVWtsQklHRjBkSEpwWW5WMFpTQnBiaUJzYjNkbGNpQmpZWE5sWEc0Z0tpQmhablJsY2lCaGJua2diV0Z3Y0dsdVp5Qm9ZWE1nYjJOamRYSnlaV1FnS0hObFpWeHVJQ29nVzJwUmRXVnllUzVoY21saFJtbDRYWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25rdVlYSnBZVVpwZUgwcExpQkpaaUI1YjNVZ1lYSmxJR1YyWlhJZ2FXNGdaRzkxWW5Rc1hHNGdLaUIwYUdVZ1pXRnphV1Z6ZENCM1lYa2dkRzhnYTI1dmR5QjBhR1VnYTJWNUlHbHpJSFJ2SUhOc2FXTmxJSFJvWlNCdWIzSnRZV3hwYzJWa0lIWmhiSFZsT2x4dUlDb2dQR052WkdVK0pDNXViM0p0WVd4cGMyVkJjbWxoS0Y5ZlYwRkpMVUZTU1VGZlFWUlVVa2xDVlZSRlgxOHBMbk5zYVdObEtEVXBQQzlqYjJSbFBpQW9jMlZsWEc0Z0tpQmJhbEYxWlhKNUxtNXZjbTFoYkdselpVRnlhV0ZkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTNXViM0p0WVd4cGMyVkJjbWxoZlNCbWIzSWdiVzl5WlZ4dUlDb2dhVzVtYjNKdFlYUnBiMjRwTGx4dUlDb2dQR0p5UGp4aWNqNWNiaUFxSUVSdklHNXZkQ0IxYzJVZ2RHaGxjMlVnWm5WdVkzUnBiMjV6SUhSdklITmxkQ0JrYVdabVpYSmxiblFnVjBGSkxVRlNTVUVnWVhSMGNtbGlkWFJsY3lCM2FYUm9iM1YwWEc0Z0tpQnpaWFIwYVc1bklIUm9aU0J2Ym1VZ1ltVnBibWNnY0dGemMyVmtJSFJ2SUhSb1pTQmhjbWxoSUcxbGRHaHZaRHNnWm05eUlHVjRZVzF3YkdVNklHUnZJRzV2ZENCamNtVmhkR1VnWVZ4dUlDb2djMlYwSUdadmNpQmNJbUYwZEhKcFluVjBaVEZjSWlCMGFHRjBJSE5sZEhNZ1hDSmhkSFJ5YVdKMWRHVXlYQ0lnYVc1emRHVmhaQ0F0SUhWdWJHVnpjeUI1YjNVZ1lXUmtJSFJvWlNCellXMWxYRzRnS2lCamIyNTJaWEp6YVc5dUlIUnZJRHhqYjJSbFBtaGhjend2WTI5a1pUNHNJRHhqYjJSbFBtZGxkRHd2WTI5a1pUNGdkMmxzYkNCdWIzUWdZbVVnZEhKcFoyZGxjbVZrTGx4dUlDb2dTVzV6ZEdWaFpDd2dkWE5sSUZ0cVVYVmxjbmt1WVhKcFlVWnBlRjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUxtRnlhV0ZHYVhoOUlIUnZJR052Ym5abGNuUWdkR2hsWEc0Z0tpQmhkSFJ5YVdKMWRHVWdibUZ0WlM1Y2JpQXFJRHhpY2o0OFluSStYRzRnS2lCYmFsRjFaWEo1STJGeWFXRmRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVNOaGNtbGhmU3hjYmlBcUlGdHFVWFZsY25rallYSnBZVkpsWmwxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVJMkZ5YVdGU1pXWjlMRnh1SUNvZ1cycFJkV1Z5ZVNOaGNtbGhVM1JoZEdWZGUwQnNhVzVySUdWNGRHVnlibUZzT21wUmRXVnllU05oY21saFUzUmhkR1Y5TEZ4dUlDb2dXMnBSZFdWeWVTTnlaVzF2ZG1WQmNtbGhYWHRBYkdsdWF5QmxlSFJsY201aGJEcHFVWFZsY25ramNtVnRiM1psUVhKcFlYMHNYRzRnS2lCYmFsRjFaWEo1STNKbGJXOTJaVUZ5YVdGU1pXWmRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVNOeVpXMXZkbVZCY21saFVtVm1mU0JoYm1SY2JpQXFJRnRxVVhWbGNua2pjbVZ0YjNabFFYSnBZVk4wWVhSbFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqY21WdGIzWmxRWEpwWVZOMFlYUmxmU0JoYkd3Z2NuVnVYRzRnS2lCMGFISnZkV2RvSUhSb1pYTmxJR2h2YjJ0eklDaHBaaUIwYUdWNUlHVjRhWE4wS1NCaGJtUWdkR2hsYzJVZ2FHOXZhM01nY21Wd2JHRmpaU0IwYUdVZ1puVnVZM1JwYjI1aGJHbDBlVnh1SUNvZ2IyWWdiV0Z1YVhCMWJHRjBhVzVuSUc5eUlHTm9aV05yYVc1bklIUm9aU0JoZEhSeWFXSjFkR1Z6SUdGbWRHVnlJR0Z1ZVNCamIyNTJaWEp6YVc5dUlIQnliMk5sYzNNZ2FHRnpYRzRnS2lCdlkyTjFjbkpsWkNCM2FYUm9hVzRnZEdobElHMWxkR2h2WkNCcGRITmxiR1l1WEc0Z0tseHVJQ29nUUdGc2FXRnpJQ0FnSUdWNGRHVnlibUZzT21wUmRXVnllUzVoY21saFNHOXZhM05jYmlBcUlFQnRaVzFpWlhKdlppQmxlSFJsY201aGJEcHFVWFZsY25sY2JpQXFJRUIwZVhCbElDQWdJQ0I3VDJKcVpXTjBManhCVWtsQlgyaHZiMnMrZlZ4dUlDcGNiaUFxSUVCbGVHRnRjR3hsWEc0Z0tpQXZMeUJoY21saExXeGxkbVZzSUhOb2IzVnNaQ0JpWlNCaGJpQnBiblJsWjJWeUlHZHlaV0YwWlhJZ2RHaGhiaUJ2Y2lCbGNYVmhiQ0IwYnlBeElITnZJSFJvWlNCblpYUjBaWEpjYmlBcUlDOHZJSE5vYjNWc1pDQnlaWFIxY200Z1lXNGdhVzUwWldkbGNpNWNiaUFxSUNRdVlYSnBZVWh2YjJ0ekxteGxkbVZzSUQwZ2UxeHVJQ29nSUNBZ0lITmxkRG9nWm5WdVkzUnBiMjRnS0dWc1pXMWxiblFzSUhaaGJIVmxLU0I3WEc0Z0tpQWdJQ0FnSUNBZ0lIWmhjaUJwYm5SV1lXd2dQU0JOWVhSb0xtMWhlQ2d4TENCTllYUm9MbVpzYjI5eUtIWmhiSFZsS1NrN1hHNGdLaUFnSUNBZ0lDQWdJR2xtSUNnaGFYTk9ZVTRvYVc1MFZtRnNLU2tnZTF4dUlDb2dJQ0FnSUNBZ0lDQWdJQ0FnWld4bGJXVnVkQzV6WlhSQmRIUnlhV0oxZEdVb1hDSmhjbWxoTFd4bGRtVnNYQ0lzSUdsdWRGWmhiQ2xjYmlBcUlDQWdJQ0FnSUNBZ2ZWeHVJQ29nSUNBZ0lIMHNYRzRnS2lBZ0lDQWdaMlYwT2lCbWRXNWpkR2x2YmlBb1pXeGxiV1Z1ZENrZ2UxeHVJQ29nSUNBZ0lDQWdJQ0IyWVhJZ2RtRnNkV1VnUFNCbGJHVnRaVzUwTG1kbGRFRjBkSEpwWW5WMFpTaGNJbUZ5YVdFdGJHVjJaV3hjSWlrN1hHNGdLaUFnSUNBZ0lDQWdJSFpoY2lCcGJuUldZV3dnUFNBb1RXRjBhQzV0WVhnb01Td2dUV0YwYUM1bWJHOXZjaWgyWVd4MVpTa3BPMXh1SUNvZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnS0haaGJIVmxJRDA5UFNCdWRXeHNJSHg4SUdselRtRk9LR2x1ZEZaaGJDa3BYRzRnS2lBZ0lDQWdJQ0FnSUNBZ0lDQS9JSFZ1WkdWbWFXNWxaRnh1SUNvZ0lDQWdJQ0FnSUNBZ0lDQWdPaUJwYm5SV1lXdzdYRzRnS2lBZ0lDQWdmVnh1SUNvZ2ZUdGNiaUFxTDF4dUpDNWhjbWxoU0c5dmEzTWdQU0I3WEc1Y2JpQWdJQ0JvYVdSa1pXNDZJSHRjYmx4dUlDQWdJQ0FnSUNBdkx5QlRaWFIwYVc1bklHRnlhV0V0YUdsa1pHVnVQVndpWm1Gc2MyVmNJaUJwY3lCamIyNXphV1JsY21Wa0lIWmhiR2xrTENCaWRYUWdjbVZ0YjNacGJtY2dkR2hsWEc0Z0lDQWdJQ0FnSUM4dklHRnlhV0V0YUdsa1pHVnVJR0YwZEhKcFluVjBaU0JvWVhNZ2RHaGxJSE5oYldVZ1pXWm1aV04wSUdGdVpDQkpJSFJvYVc1cklHbDBKM01nZEdsa2FXVnlMbHh1SUNBZ0lDQWdJQ0F2THlCb2RIUndjem92TDNkM2R5NTNNeTV2Y21jdlZGSXZkMkZwTFdGeWFXRXZjM1JoZEdWelgyRnVaRjl3Y205d1pYSjBhV1Z6STJGeWFXRXRhR2xrWkdWdVhHNGdJQ0FnSUNBZ0lITmxkRG9nWm5WdVkzUnBiMjRnS0dWc1pXMWxiblFzSUhaaGJIVmxMQ0J1WVcxbEtTQjdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ5WlhOd2IyNXpaVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0haaGJIVmxJRDA5UFNCbVlXeHpaU0I4ZkNBcmRtRnNkV1VnUFQwOUlEQWdmSHdnS0M5ZVptRnNjMlVrTDJrcExuUmxjM1FvZG1Gc2RXVXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWld4bGJXVnVkQzV5WlcxdmRtVkJkSFJ5YVdKMWRHVW9ibUZ0WlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsYzNCdmJuTmxJRDBnZG1Gc2RXVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhOd2IyNXpaVHRjYmx4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNCOVhHNWNibjA3WEc1Y2JpOHZJRk52ZFhKalpUb2dMM055WXk5cGJuTjBZVzVqWlM5cFpHVnVkR2xtZVM1cWMxeHVYRzVjYmx4dWRtRnlJR052ZFc1MElEMGdNRHRjYmx4dUx5b3FYRzRnS2lCSlpHVnVkR2xtYVdWeklIUm9aU0JtYVhKemRDQmxiR1Z0Wlc1MElHbHVJSFJvWlNCamIyeHNaV04wYVc5dUlHSjVJR2RsZEhScGJtY2dhWFJ6SUVsRUxpQkpaaUIwYUdWY2JpQXFJR1ZzWlcxbGJuUWdaRzlsYzI0bmRDQm9ZWFpsSUdGdUlFbEVJR0YwZEhKcFluVjBaU3dnWVNCMWJtbHhkV1VnYjI0Z2FYTWdaMlZ1WlhKaGRHVmtJR0Z1WkNCaGMzTnBaMjVsWkZ4dUlDb2dZbVZtYjNKbElHSmxhVzVuSUhKbGRIVnlibVZrTGlCSlppQjBhR1VnWTI5c2JHVmpkR2x2YmlCa2IyVnpJRzV2ZENCb1lYWmxJR0VnWm1seWMzUWdaV3hsYldWdWRDQjBhR1Z1WEc0Z0tpQThZMjlrWlQ1MWJtUmxabWx1WldROEwyTnZaR1UrSUdseklISmxkSFZ5Ym1Wa0xseHVJQ29nUEdKeVBqeGljajVjYmlBcUlFbEVjeUJoY21VZ1lTQmpiMjVqWVhSbGJtRjBhVzl1SUc5bUlGd2lZVzV2Ym5sdGIzVnpYQ0lnWVc1a0lHRWdhR2xrWkdWdUlHTnZkVzUwWlhJZ2RHaGhkQ0JwY3lCcGJtTnlaV0Z6WldSY2JpQXFJR1ZoWTJnZ2RHbHRaUzRnU1dZZ2RHaGxJRWxFSUdGc2NtVmhaSGtnWlhocGMzUnpJRzl1SUhSb1pTQndZV2RsTENCMGFHRjBJRWxFSUdseklITnJhWEJ3WldRZ1lXNWtJRzV2ZEZ4dUlDb2dZWE56YVdkdVpXUWdkRzhnWVNCelpXTnZibVFnWld4bGJXVnVkQzVjYmlBcVhHNGdLaUJBYldWdFltVnliMllnWlhoMFpYSnVZV3c2YWxGMVpYSjVYRzRnS2lCQWFXNXpkR0Z1WTJWY2JpQXFJRUJoYkdsaGN5QWdJQ0JwWkdWdWRHbG1lVnh1SUNvZ1FISmxkSFZ5YmlBZ0lIdFRkSEpwYm1kOGRXNWtaV1pwYm1Wa2ZWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZSb1pTQkpSQ0J2WmlCMGFHVWdabWx5YzNRZ1pXeGxiV1Z1ZENCdmNpQjFibVJsWm1sdVpXUWdhV1lnZEdobGNtVWdhWE1nYm04Z1ptbHljM1JjYmlBcUlDQWdJQ0FnSUNBZ0lDQmxiR1Z0Wlc1MExseHVJQ3BjYmlBcUlFQmxlR0Z0Y0d4bElEeGpZWEIwYVc5dVBrbGtaVzUwYVdaNWFXNW5JR1ZzWlcxbGJuUnpQQzlqWVhCMGFXOXVQbHh1SUNvZ0x5OGdUV0Z5YTNWd0lHbHpYRzRnS2lBdkx5QThaR2wySUdOc1lYTnpQVndpYjI1bFhDSStQQzlrYVhZK1hHNGdLaUF2THlBOGMzQmhiaUJqYkdGemN6MWNJbTl1WlZ3aVBqd3ZjM0JoYmo1Y2JpQXFYRzRnS2lBa0tGd2lMbTl1WlZ3aUtTNXBaR1Z1ZEdsbWVTZ3BPeUF2THlBdFBpQmNJbUZ1YjI1NWJXOTFjekJjSWx4dUlDcGNiaUFxSUM4dklFNXZkeUJ0WVhKcmRYQWdhWE02WEc0Z0tpQXZMeUE4WkdsMklHTnNZWE56UFZ3aWIyNWxYQ0lnYVdROVhDSmhibTl1ZVcxdmRYTXdYQ0krUEM5a2FYWStYRzRnS2lBdkx5QThjM0JoYmlCamJHRnpjejFjSW05dVpWd2lQand2YzNCaGJqNWNiaUFxSUM4dklGSjFibTVwYm1jZ0pDaGNJaTV2Ym1WY0lpa3VhV1JsYm5ScFpua29LVHNnWVdkaGFXNGdkMjkxYkdRZ2JtOTBJR05vWVc1blpTQjBhR1VnYldGeWEzVndMbHh1SUNwY2JpQXFJRUJsZUdGdGNHeGxJRHhqWVhCMGFXOXVQa1Y0YVhOMGFXNW5JRWxFY3lCaGNtVWdibTkwSUdSMWNHeHBZMkYwWldROEwyTmhjSFJwYjI0K1hHNGdLaUF2THlCTllYSnJkWEFnYVhNNlhHNGdLaUF2THlBOFpHbDJJR05zWVhOelBWd2lkSGR2WENJZ2FXUTlYQ0poYm05dWVXMXZkWE14WENJK1BDRXRMU0J0WVc1MVlXeHNlU0J6WlhRZ0xTMCtQQzlrYVhZK1hHNGdLaUF2THlBOFpHbDJJR05zWVhOelBWd2lkSGR2WENJK1BDOWthWFkrWEc0Z0tpQXZMeUE4WkdsMklHTnNZWE56UFZ3aWRIZHZYQ0krUEM5a2FYWStYRzRnS2x4dUlDb2dKQ2hjSWk1MGQyOWNJaWt1WldGamFDaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0tpQWdJQ0FnSkNoMGFHbHpLUzVwWkdWdWRHbG1lU2dwTzF4dUlDb2dmU2s3WEc0Z0tseHVJQ29nTHk4Z1RtOTNJRzFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKMGQyOWNJaUJwWkQxY0ltRnViMjU1Ylc5MWN6RmNJajQ4SVMwdElHMWhiblZoYkd4NUlITmxkQ0F0TFQ0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKMGQyOWNJaUJwWkQxY0ltRnViMjU1Ylc5MWN6QmNJajQ4TDJScGRqNWNiaUFxSUM4dklEeGthWFlnWTJ4aGMzTTlYQ0owZDI5Y0lpQnBaRDFjSW1GdWIyNTViVzkxY3pKY0lqNDhMMlJwZGo1Y2JpQXFMMXh1SkM1bWJpNXBaR1Z1ZEdsbWVTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JseHVJQ0FnSUhaaGNpQmxiR1Z0Wlc1MElEMGdkR2hwYzFzd1hUdGNiaUFnSUNCMllYSWdhWE5CYmtWc1pXMWxiblFnUFNCcGMwVnNaVzFsYm5Rb1pXeGxiV1Z1ZENrN1hHNGdJQ0FnZG1GeUlHbGtJRDBnYVhOQmJrVnNaVzFsYm5SY2JpQWdJQ0FnSUNBZ1B5QmxiR1Z0Wlc1MExtbGtYRzRnSUNBZ0lDQWdJRG9nZFc1a1pXWnBibVZrTzF4dVhHNGdJQ0FnYVdZZ0tHbHpRVzVGYkdWdFpXNTBJQ1ltSUNGcFpDa2dlMXh1WEc0Z0lDQWdJQ0FnSUdSdklIdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FXUWdQU0JjSW1GdWIyNTViVzkxYzF3aUlDc2dZMjkxYm5RN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjNWdWRDQXJQU0F4TzF4dVhHNGdJQ0FnSUNBZ0lIMGdkMmhwYkdVZ0tHUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUkNlVWxrS0dsa0tTazdYRzVjYmlBZ0lDQWdJQ0FnWld4bGJXVnVkQzVwWkNBOUlHbGtPMXh1WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlHbGtPMXh1WEc1OU8xeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZhVzV6ZEdGdVkyVXZZWEpwWVM1cWMxeHVYRzVjYmx4dUx5b3FYRzRnS2lCSFpYUnpJRzl5SUhObGRITWdWMEZKTFVGU1NVRWdjSEp2Y0dWeWRHbGxjeTRnVkdobElIQnliM0JsY25ScFpYTWdkMmxzYkNCdWIzUWdZbVVnYlc5a2FXWnBaV1FnWVc1NVhHNGdLaUJ0YjNKbElIUm9ZVzRnZEdobGVTQnVaV1ZrSUhSdklHSmxJQ2gxYm14cGEyVmNiaUFxSUZ0cVVYVmxjbmtqWVhKcFlWSmxabDE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkyRnlhV0ZTWldaOUlHOXlYRzRnS2lCYmFsRjFaWEo1STJGeWFXRlRkR0YwWlYxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVJMkZ5YVdGVGRHRjBaWDBnZDJocFkyZ2dkMmxzYkNCcGJuUmxjbkJ5WlhRZ2RHaGxYRzRnS2lCMllXeDFaWE1wTGx4dUlDb2dQR0p5UGp4aWNqNWNiaUFxSUZSdklITmxkQ0JYUVVrdFFWSkpRU0J3Y205d1pYSjBhV1Z6TENCd1lYTnpJR1ZwZEdobGNpQmhYRzRnS2lBOFkyOWtaVDV3Y205d1pYSjBlVHd2WTI5a1pUNHZQR052WkdVK2RtRnNkV1U4TDJOdlpHVStJSEJoYVhJZ2IyWWdZWEpuZFcxbGJuUnpJRzl5SUdGdUlHOWlhbVZqZEZ4dUlDb2dZMjl1ZEdGcGJtbHVaeUIwYUc5elpTQndZV2x5Y3k0Z1YyaGxiaUIwYUdseklHbHpJR1J2Ym1Vc0lIUm9aU0JoZEhSeWFXSjFkR1Z6SUdGeVpTQnpaWFFnYjI0Z1lXeHNYRzRnS2lCbGJHVnRaVzUwY3lCcGJpQjBhR1VnWTI5c2JHVmpkR2x2YmlCaGJtUWdkR2hsSUR4amIyUmxQbXBSZFdWeWVUd3ZZMjlrWlQ0Z2IySnFaV04wSUdseklISmxkSFZ5Ym1Wa0lIUnZYRzRnS2lCaGJHeHZkeUJtYjNJZ1kyaGhhVzVwYm1jdUlFbG1JRHhqYjJSbFBuWmhiSFZsUEM5amIyUmxQaUJwY3lCaElHWjFibU4wYVc5dUlHRnVaQ0J5WlhSMWNtNXpYRzRnS2lBOFkyOWtaVDUxYm1SbFptbHVaV1E4TDJOdlpHVStJQ2h2Y2lCdWIzUm9hVzVuS1NCMGFHVnVJRzV2SUdGamRHbHZiaUJwY3lCMFlXdGxiaUJtYjNJZ2RHaGhkQ0JsYkdWdFpXNTBMbHh1SUNvZ1ZHaHBjeUJqWVc0Z1ltVWdkWE5sWm5Wc0lHWnZjaUJ6Wld4bFkzUnBkbVZzZVNCelpYUjBhVzVuSUhaaGJIVmxjeUJ2Ym14NUlIZG9aVzRnWTJWeWRHRnBiaUJqY21sMFpYSnBZVnh1SUNvZ1lYSmxJRzFsZEM1Y2JpQXFJRHhpY2o0OFluSStYRzRnS2lCVWJ5Qm5aWFFnVjBGSkxVRlNTVUVnY0hKdmNHVnlkR2xsY3l3Z2IyNXNlU0J3WVhOeklIUm9aU0E4WTI5a1pUNXdjbTl3WlhKMGVUd3ZZMjlrWlQ0Z2RHaGhkQ0I1YjNVZ2QyRnVkRnh1SUNvZ2RHOGdaMlYwTGlCSlppQjBhR1Z5WlNCcGN5QnVieUJ0WVhSamFHbHVaeUJ3Y205d1pYSjBlU3dnUEdOdlpHVStkVzVrWldacGJtVmtQQzlqYjJSbFBpQnBjeUJ5WlhSMWNtNWxaQzVjYmlBcUlFRnNiQ0J3Y205d1pYSjBhV1Z6SUdGeVpTQnViM0p0WVd4cGMyVmtJQ2h6WldWY2JpQXFJRnRxVVhWbGNua3VibTl5YldGc2FYTmxRWEpwWVYxN1FHeHBibXNnWlhoMFpYSnVZV3c2YWxGMVpYSjVMbTV2Y20xaGJHbHpaVUZ5YVdGOUtTNWNiaUFxWEc0Z0tpQkFiV1Z0WW1WeWIyWWdaWGgwWlhKdVlXdzZhbEYxWlhKNVhHNGdLaUJBYVc1emRHRnVZMlZjYmlBcUlFQmhiR2xoY3lBZ0lDQmhjbWxoWEc0Z0tpQkFjR0Z5WVcwZ0lDQWdlMDlpYW1WamRIeFRkSEpwYm1kOUlIQnliM0JsY25SNVhHNGdLaUFnSUNBZ0lDQWdJQ0FnUldsMGFHVnlJSFJvWlNCd2NtOXdaWEowYVdWeklIUnZJSE5sZENCcGJpQnJaWGt2ZG1Gc2RXVWdjR0ZwY25NZ2IzSWdkR2hsSUc1aGJXVWdiMllnZEdobFhHNGdLaUFnSUNBZ0lDQWdJQ0FnY0hKdmNHVnlkSGtnZEc4Z1oyVjBMM05sZEM1Y2JpQXFJRUJ3WVhKaGJTQWdJQ0I3UVhSMGNtbGlkWFJsWDBOaGJHeGlZV05yZkVKdmIyeGxZVzU4VG5WdFltVnlmRk4wY21sdVozMGdXM1poYkhWbFhWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZSb1pTQjJZV3gxWlNCdlppQjBhR1VnY0hKdmNHVnlkSGtnZEc4Z2MyVjBMbHh1SUNvZ1FISmxkSFZ5YmlBZ0lIdHFVWFZsY25sOFUzUnlhVzVuZkhWdVpHVm1hVzVsWkgxY2JpQXFJQ0FnSUNBZ0lDQWdJQ0JGYVhSb1pYSWdkR2hsSUdwUmRXVnllU0J2WW1wbFkzUWdLR0ZtZEdWeUlITmxkSFJwYm1jcElHOXlJR0VnYzNSeWFXNW5JRzl5SUhWdVpHVm1hVzVsWkZ4dUlDb2dJQ0FnSUNBZ0lDQWdJQ2hoWm5SbGNpQm5aWFIwYVc1bktWeHVJQ3BjYmlBcUlFQmxlR0Z0Y0d4bElEeGpZWEIwYVc5dVBsTmxkSFJwYm1jZ1YwRkpMVUZTU1VFZ1lYUjBjbWxpZFhSbEtITXBQQzlqWVhCMGFXOXVQbHh1SUNvZ0pDaGNJaU5sYkdWdFpXNTBYQ0lwTG1GeWFXRW9YQ0poY21saExXeGhZbVZzWENJc0lGd2lkR1Z6ZEZ3aUtUdGNiaUFxSUM4dklHOXlYRzRnS2lBa0tGd2lJMlZzWlcxbGJuUmNJaWt1WVhKcFlTaGNJbXhoWW1Wc1hDSXNJRndpZEdWemRGd2lLVHRjYmlBcUlDOHZJRzl5WEc0Z0tpQWtLRndpSTJWc1pXMWxiblJjSWlrdVlYSnBZU2g3WEc0Z0tpQWdJQ0FnWENKaGNtbGhMV3hoWW1Wc1hDSTZJRndpZEdWemRGd2lYRzRnS2lCOUtUdGNiaUFxSUM4dklHOXlYRzRnS2lBa0tGd2lJMlZzWlcxbGJuUmNJaWt1WVhKcFlTaDdYRzRnS2lBZ0lDQWdiR0ZpWld3NklGd2lkR1Z6ZEZ3aVhHNGdLaUI5S1R0Y2JpQXFJQzh2SUVGc2JDQnZaaUIwYUdWelpTQnpaWFFnWVhKcFlTMXNZV0psYkQxY0luUmxjM1JjSWlCdmJpQmhiR3dnYldGMFkyaHBibWNnWld4bGJXVnVkSE1nWVc1a0lISmxkSFZ5YmlCaFhHNGdLaUF2THlCcVVYVmxjbmtnYjJKcVpXTjBJSEpsY0hKbGMyVnVkR2x1WnlCY0lpTmxiR1Z0Wlc1MFhDSmNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNVRaWFIwYVc1bklGZEJTUzFCVWtsQklHRjBkSEpwWW5WMFpTaHpLU0IzYVhSb0lHRWdablZ1WTNScGIyNDhMMk5oY0hScGIyNCtYRzRnS2lBa0tGd2lJMlZzWlcxbGJuUmNJaWt1WVhKcFlTaGNJbXhoWW1Wc1hDSXNJR1oxYm1OMGFXOXVJQ2hwTENCaGRIUnlLU0I3WEc0Z0tpQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWFXUWdLeUJjSWw5ZlhDSWdLeUJwSUNzZ1hDSmZYMXdpSUNzZ1lYUjBjanRjYmlBcUlIMHBPMXh1SUNvZ0x5OGdiM0pjYmlBcUlDUW9YQ0lqWld4bGJXVnVkRndpS1M1aGNtbGhLSHRjYmlBcUlDQWdJQ0JzWVdKbGJEb2dablZ1WTNScGIyNGdLR2tzSUdGMGRISXBJSHRjYmlBcUlDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVhV1FnS3lCY0lsOWZYQ0lnS3lCcElDc2dYQ0pmWDF3aUlDc2dZWFIwY2p0Y2JpQXFJQ0FnSUNCOVhHNGdLaUI5S1R0Y2JpQXFJQzh2SUVKdmRHZ2diMllnZEdobGMyVWdjMlYwSUdGeWFXRXRiR0ZpWld3OVhDSmxiR1Z0Wlc1MFgxOHdYMTkxYm1SbFptbHVaV1JjSWlCdmJpQmhiR3dnYldGMFkyaHBibWRjYmlBcUlDOHZJR1ZzWlcxbGJuUnpJR0Z1WkNCeVpYUjFjbTRnWVNCcVVYVmxjbmtnYjJKcVpXTjBJSEpsY0hKbGMyVnVkR2x1WnlCY0lpTmxiR1Z0Wlc1MFhDSmNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNUhaWFIwYVc1bklHRWdWMEZKTFVGU1NVRWdZWFIwY21saWRYUmxQQzlqWVhCMGFXOXVQbHh1SUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbVZzWlcxbGJuUmNJaUJoY21saExXeGhZbVZzUFZ3aWRHVnpkRndpUGp3dlpHbDJQbHh1SUNvZ0pDaGNJaU5sYkdWdFpXNTBYQ0lwTG1GeWFXRW9YQ0pzWVdKbGJGd2lLVHNnSUNBdkx5QXRQaUJjSW5SbGMzUmNJbHh1SUNvZ0pDaGNJaU5sYkdWdFpXNTBYQ0lwTG1GeWFXRW9YQ0pqYUdWamEyVmtYQ0lwT3lBdkx5QXRQaUIxYm1SbFptbHVaV1JjYmlBcUlDOHZJRWxtSUZ3aUkyVnNaVzFsYm5SY0lpQnRZWFJqYUdWeklHMTFiSFJwY0d4bElHVnNaVzFsYm5SekxDQjBhR1VnWVhSMGNtbGlkWFJsY3lCbWNtOXRJSFJvWlNCbWFYSnpkRnh1SUNvZ0x5OGdaV3hsYldWdWRDQmhjbVVnY21WMGRYSnVaV1F1WEc0Z0tseHVJQ29nUUdWNFlXMXdiR1VnUEdOaGNIUnBiMjQrVTJWMGRHbHVaeUIzYVhSb0lHRnlhV0VnYldWMGFHOWtjend2WTJGd2RHbHZiajVjYmlBcUlDOHZJRTFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKdmJtVmNJajQ4TDJScGRqNWNiaUFxSUM4dklEeGthWFlnWTJ4aGMzTTlYQ0owZDI5Y0lqNDhMMlJwZGo1Y2JpQXFJQzh2SUR4a2FYWWdZMnhoYzNNOVhDSjBhSEpsWlZ3aVBDOWthWFkrWEc0Z0tseHVJQ29nZG1GeUlITmxkSFJwYm1keklEMGdlMXh1SUNvZ0lDQWdJR0oxYzNrNklEQXNYRzRnS2lBZ0lDQWdZMjl1ZEhKdmJITTZJRndpTG05dVpWd2lMRnh1SUNvZ0lDQWdJR3hoWW1Wc09pQmNJbXh2Y21WdElHbHdjM1Z0WENKY2JpQXFJSDA3WEc0Z0tseHVJQ29nSkNoY0lpNXZibVZjSWlrdVlYSnBZU2h6WlhSMGFXNW5jeWs3WEc0Z0tpQWtLRndpTG5SM2Ixd2lLUzVoY21saFVtVm1LSE5sZEhScGJtZHpLVHRjYmlBcUlDUW9YQ0l1ZEdoeVpXVmNJaWt1WVhKcFlWTjBZWFJsS0hObGRIUnBibWR6S1R0Y2JpQXFYRzRnS2lBdkx5Qk9iM2NnYldGeWEzVndJR2x6T2x4dUlDb2dMeThnUEdScGRpQmpiR0Z6Y3oxY0ltOXVaVndpWEc0Z0tpQXZMeUFnSUNBZ1lYSnBZUzFpZFhONVBWd2lNRndpWEc0Z0tpQXZMeUFnSUNBZ1lYSnBZUzFqYjI1MGNtOXNjejFjSWk1dmJtVmNJbHh1SUNvZ0x5OGdJQ0FnSUdGeWFXRXRiR0ZpWld3OVhDSnNiM0psYlNCcGNITjFiVndpWEc0Z0tpQXZMeUFnSUNBZ2FXUTlYQ0poYm05dWVXMXZkWE13WENJK1BDOWthWFkrWEc0Z0tpQXZMeUE4WkdsMklHTnNZWE56UFZ3aWRIZHZYQ0pjYmlBcUlDOHZJQ0FnSUNCaGNtbGhMV052Ym5SeWIyeHpQVndpWVc1dmJubHRiM1Z6TUZ3aVBqd3ZaR2wyUGx4dUlDb2dMeThnUEdScGRpQmpiR0Z6Y3oxY0luUm9jbVZsWENKY2JpQXFJQzh2SUNBZ0lDQmhjbWxoTFdKMWMzazlYQ0ptWVd4elpWd2lYRzRnS2lBdkx5QWdJQ0FnWVhKcFlTMWpiMjUwY205c2N6MWNJblJ5ZFdWY0lseHVJQ29nTHk4Z0lDQWdJR0Z5YVdFdGJHRmlaV3c5WENKMGNuVmxYQ0krUEM5a2FYWStYRzRnS2x4dUlDb2dRR1Y0WVcxd2JHVWdQR05oY0hScGIyNCtSMlYwZEdsdVp5QjNhWFJvSUdGeWFXRWdiV1YwYUc5a2N6d3ZZMkZ3ZEdsdmJqNWNiaUFxSUM4dklFMWhjbXQxY0NCcGN6cGNiaUFxSUM4dklEeGthWFlnYVdROVhDSjBaWE4wWENJZ1lYSnBZUzFtYkc5M2RHODlYQ0ptWVd4elpWd2lQand2WkdsMlBseHVJQ29nTHk4Z1BHUnBkaUJwWkQxY0ltWmhiSE5sWENJK1BDOWthWFkrWEc0Z0tseHVJQ29nSkNoY0lpTjBaWE4wWENJcExtRnlhV0VvWENKbWJHOTNkRzljSWlrN0lDQWdJQ0FnTHk4Z0xUNGdYQ0ptWVd4elpWd2lYRzRnS2lBa0tGd2lJM1JsYzNSY0lpa3VZWEpwWVZKbFppaGNJbVpzYjNkMGIxd2lLVHNnSUNBdkx5QXRQaUJxVVhWbGNua29QR1JwZGlCcFpEMWNJbVpoYkhObFhDSStLVnh1SUNvZ0pDaGNJaU4wWlhOMFhDSXBMbUZ5YVdGVGRHRjBaU2hjSW1ac2IzZDBiMXdpS1RzZ0x5OGdMVDRnWm1Gc2MyVmNiaUFxTDF4dUpDNW1iaTVoY21saElEMGdablZ1WTNScGIyNGdLSEJ5YjNCbGNuUjVMQ0IyWVd4MVpTa2dlMXh1WEc0Z0lDQWdjbVYwZFhKdUlHRmpZMlZ6Y3loY2JpQWdJQ0FnSUNBZ2RHaHBjeXhjYmlBZ0lDQWdJQ0FnY0hKdmNHVnlkSGtzWEc0Z0lDQWdJQ0FnSUhaaGJIVmxYRzRnSUNBZ0tUdGNibHh1ZlR0Y2JseHVMeThnVTI5MWNtTmxPaUF2YzNKakwybHVjM1JoYm1ObEwyRnlhV0ZTWldZdWFuTmNibHh1WEc1Y2JpOHFLbHh1SUNvZ1IyVjBjeUJ2Y2lCelpYUnpJR0VnVjBGSkxVRlNTVUVnY21WbVpYSmxibU5sTGlCVWFHbHpJR2x6SUdaMWJtTjBhVzl1WVd4c2VTQnBaR1Z1ZEdsallXd2dkRzljYmlBcUlGdHFVWFZsY25rallYSnBZVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkyRnlhV0Y5SUhkcGRHZ2dkR2hsSUcxaGFXNGdaR2xtWm1WeVpXNWpaU0JpWldsdVp5QjBhR0YwWEc0Z0tpQmhiaUJsYkdWdFpXNTBJRzFoZVNCaVpTQndZWE56WldRZ1lYTWdkR2hsSUR4amIyUmxQblpoYkhWbFBDOWpiMlJsUGlCM2FHVnVJSE5sZEhScGJtY2dZVzVrSUhSb1lYUWdZVnh1SUNvZ2FsRjFaWEo1SUc5aWFtVmpkQ0JwY3lCeVpYUjFjbTVsWkNCM2FHVnVJR2RsZEhScGJtY3VYRzRnS2lBOFluSStQR0p5UGx4dUlDb2dRbVZqWVhWelpTQlhRVWt0UVZKSlFTQnlaV1psY21WdVkyVnpJSGR2Y21zZ2QybDBhQ0JKUkhNc0lFbEVjeUJoY21VZ2QyOXlhMlZrSUc5MWRDQjFjMmx1WjF4dUlDb2dXMnBSZFdWeWVTTnBaR1Z1ZEdsbWVWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STJsa1pXNTBhV1o1ZlM0Z1FtVWdZWGRoY21VZ2RHaGhkQ0JoYm5rZ2MzUnlhVzVuWEc0Z0tpQndZWE56WldRZ2RHOGdXMnBSZFdWeWVTTmhjbWxoVW1WbVhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqWVhKcFlWSmxabjBnZDJsc2JDQmlaU0IwY21WaGRHVmtYRzRnS2lCc2FXdGxJR0VnUTFOVElITmxiR1ZqZEc5eUlHRnVaQ0JzYjI5clpXUWdkWEFnZDJsMGFDQjBhR1VnY21WemRXeDBjeUJpWldsdVp5QjFjMlZrSUhSdklITmxkQ0IwYUdWY2JpQXFJSEJ5YjNCbGNuUjVMaUJKWmlCNWIzVWdZV3h5WldGa2VTQm9ZWFpsSUhSb1pTQkpSQ0JoYm1RZ2QybHphQ0IwYnlCelpYUWdhWFFnZDJsMGFHOTFkQ0IwYUdVZ2JHOXZhM1Z3TEZ4dUlDb2dkWE5sSUZ0cVVYVmxjbmtqWVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STJGeWFXRjlMbHh1SUNvZ1BHSnlQanhpY2o1Y2JpQXFJRWxtSUR4amIyUmxQblpoYkhWbFBDOWpiMlJsUGlCcGN5QmhJR1oxYm1OMGFXOXVJSFJvWlc0Z2RHaGxJSEpsYzNWc2RHbHVaeUIyWVd4MVpTQnBjeUJwWkdWdWRHbG1hV1ZrTGx4dUlDb2dWR2hwY3lCallXNGdZbVVnY0dGeWRHbGpkV3hoY214NUlIVnpaV1oxYkNCbWIzSWdjR1Z5Wm05eWJXbHVaeUJFVDAwZ2RISmhkbVZ5YzJGc0lIUnZJR1pwYm1RZ2RHaGxYRzRnS2lCeVpXWmxjbVZ1WTJVZ0tITmxaU0JsZUdGdGNHeGxjeUJpWld4dmR5a3VJRUZ6SUhkcGRHaGNiaUFxSUZ0cVVYVmxjbmtqWVhKcFlWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STJGeWFXRjlMQ0JwWmlCMGFHVWdQR052WkdVK2RtRnNkV1U4TDJOdlpHVStJR1oxYm1OMGFXOXVYRzRnS2lCeVpYUjFjbTV6SUc1dmRHaHBibWNnYjNJZ2NtVjBkWEp1Y3lBOFkyOWtaVDUxYm1SbFptbHVaV1E4TDJOdlpHVStJSFJvWlc0Z2JtOGdZV04wYVc5dUlHbHpJSFJoYTJWdUxseHVJQ29nUEdKeVBqeGljajVjYmlBcUlGZG9aVzRnWVdOalpYTnphVzVuSUhSb1pTQmhkSFJ5YVdKMWRHVWdkWE5wYm1jZ2RHaHBjeUJtZFc1amRHbHZiaXdnWVNBOFkyOWtaVDVxVVhWbGNuazhMMk52WkdVK1hHNGdLaUJ2WW1wbFkzUWdjbVZ3Y21WelpXNTBhVzVuSUhSb1pTQnlaV1psY21WdVkyVWdhWE1nY21WMGRYSnVaV1F1SUVsbUlIUm9aWEpsSUdGeVpTQnRkV3gwYVhCc1pTQmxiR1Z0Wlc1MGMxeHVJQ29nYVc0Z2RHaGxJR052Ykd4bFkzUnBiMjRzSUc5dWJIa2dkR2hsSUhKbFptVnlaVzVqWlNCbWIzSWdkR2hsSUdacGNuTjBJR1ZzWlcxbGJuUWdhWE1nY21WMGRYSnVaV1F1SUZSdlhHNGdLaUJuWlhRZ2RHaGxJSFpoYkhWbElHOW1JSFJvWlNCaGRIUnlhV0oxZEdVZ2NtRjBhR1Z5SUhSb1lXNGdkR2hsSUdWc1pXMWxiblFzSUhWelpWeHVJQ29nVzJwUmRXVnllU05oY21saFhYdEFiR2x1YXlCbGVIUmxjbTVoYkRwcVVYVmxjbmtqWVhKcFlYMHVYRzRnS2x4dUlDb2dRRzFsYldKbGNtOW1JR1Y0ZEdWeWJtRnNPbXBSZFdWeWVWeHVJQ29nUUdsdWMzUmhibU5sWEc0Z0tpQkFZV3hwWVhNZ0lDQWdZWEpwWVZKbFpseHVJQ29nUUhCaGNtRnRJQ0FnSUh0UFltcGxZM1I4VTNSeWFXNW5mU0J3Y205d1pYSjBlVnh1SUNvZ0lDQWdJQ0FnSUNBZ0lFVnBkR2hsY2lCMGFHVWdjSEp2Y0dWeWRHbGxjeUIwYnlCelpYUWdhVzRnYTJWNUwzWmhiSFZsSUhCaGFYSnpJRzl5SUhSb1pTQnVZVzFsSUc5bUlIUm9aVnh1SUNvZ0lDQWdJQ0FnSUNBZ0lIQnliM0JsY25SNUlIUnZJSE5sZEM1Y2JpQXFJRUJ3WVhKaGJTQWdJQ0I3UVhSMGNtbGlkWFJsWDBOaGJHeGlZV05yZkdwUmRXVnllVjl3WVhKaGJYMGdXM1poYkhWbFhWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZKbFptVnlaVzVqWlNCMGJ5QnpaWFF1WEc0Z0tpQkFjbVYwZFhKdUlDQWdlMnBSZFdWeWVYMWNiaUFxSUNBZ0lDQWdJQ0FnSUNCcVVYVmxjbmtnYjJKcVpXTjBJSEpsY0hKbGMyVnVkR2x1WnlCbGFYUm9aWElnZEdobElHVnNaVzFsYm5SeklIUm9ZWFFnZDJWeVpTQnRiMlJwWm1sbFpGeHVJQ29nSUNBZ0lDQWdJQ0FnSUNoM2FHVnVJSE5sZEhScGJtY3BJRzl5SUhSb1pTQnlaV1psY21WdVkyVmtJR1ZzWlcxbGJuUW9jeWtnS0hkb1pXNGdaMlYwZEdsdVp5QXRJRzFoZVNCaVpWeHVJQ29nSUNBZ0lDQWdJQ0FnSUdGdUlHVnRjSFI1SUdwUmRXVnllU0J2WW1wbFkzUXBMbHh1SUNwY2JpQXFJRUJsZUdGdGNHeGxJRHhqWVhCMGFXOXVQbE5sZEhScGJtY2djbVZtWlhKbGJtTmxjend2WTJGd2RHbHZiajVjYmlBcUlDOHZJRTFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhvTVQ1SVpXRmthVzVuUEM5b01UNWNiaUFxSUM4dklEeGthWFlnWTJ4aGMzTTlYQ0p2Ym1WY0lqNWNiaUFxSUM4dklDQWdJQ0JNYjNKbGJTQnBjSE4xYlNCa2IyeHZjaUJ6YVhRZ1lXMWxkQ0F1TGk1Y2JpQXFJQzh2SUR3dlpHbDJQbHh1SUNwY2JpQXFJQ1FvWENJdWIyNWxYQ0lwTG1GeWFXRlNaV1lvWENKc1lXSmxiR3hsWkdKNVhDSXNJQ1FvWENKb01Wd2lLU2s3WEc0Z0tpQXZMeUJ2Y2x4dUlDb2dKQ2hjSWk1dmJtVmNJaWt1WVhKcFlWSmxaaWhjSW14aFltVnNiR1ZrWW5sY0lpd2dYQ0pvTVZ3aUtUdGNiaUFxSUM4dklHOXlYRzRnS2lBa0tGd2lMbTl1WlZ3aUtTNWhjbWxoVW1WbUtGd2liR0ZpWld4c1pXUmllVndpTENBa0tGd2lhREZjSWlsYk1GMHBPMXh1SUNvZ0x5OGdiM0pjYmlBcUlDUW9YQ0l1YjI1bFhDSXBMbUZ5YVdGU1pXWW9lMXh1SUNvZ0lDQWdJR3hoWW1Wc2JHVmtZbms2SUNRb1hDSm9NVndpS1NBdkx5QnZjaUJjSW1neFhDSWdiM0lnSkNoY0ltZ3hYQ0lwV3pCZFhHNGdLaUI5S1R0Y2JpQXFJQzh2SUVWaFkyZ2diMllnZEdobGMyVWdjbVYwZFhKdUlHRWdhbEYxWlhKNUlHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dYQ0l1YjI1bFhDSmNiaUFxWEc0Z0tpQXZMeUJPYjNjZ2JXRnlhM1Z3SUdsek9seHVJQ29nTHk4Z1BHZ3hJR2xrUFZ3aVlXNXZibmx0YjNWek1Gd2lQa2hsWVdScGJtYzhMMmd4UGx4dUlDb2dMeThnUEdScGRpQmpiR0Z6Y3oxY0ltOXVaVndpSUdGeWFXRXRiR0ZpWld4c1pXUmllVDFjSW1GdWIyNTViVzkxY3pCY0lqNWNiaUFxSUM4dklDQWdJQ0JNYjNKbGJTQnBjSE4xYlNCa2IyeHZjaUJ6YVhRZ1lXMWxkQ0F1TGk1Y2JpQXFJQzh2SUR3dlpHbDJQbHh1SUNwY2JpQXFJRUJsZUdGdGNHeGxJRHhqWVhCMGFXOXVQbE5sZEhScGJtY2djbVZtWlhKbGJtTmxjeUIzYVhSb0lHRWdablZ1WTNScGIyNDhMMk5oY0hScGIyNCtYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTTZYRzRnS2lBdkx5QThaR2wySUdOc1lYTnpQVndpYW5NdFkyOXNiR0Z3YzJWY0lqNWNiaUFxSUM4dklDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aWFuTXRZMjlzYkdGd2MyVXRZMjl1ZEdWdWRGd2lQbHh1SUNvZ0x5OGdJQ0FnSUNBZ0lDQk1iM0psYlNCcGNITjFiU0JrYjJ4dmNpQnphWFFnWVcxbGRDQXVMaTVjYmlBcUlDOHZJQ0FnSUNBOEwyUnBkajVjYmlBcUlDOHZJQ0FnSUNBOFluVjBkRzl1SUdOc1lYTnpQVndpYW5NdFkyOXNiR0Z3YzJVdGRHOW5aMnhsWENJK1hHNGdLaUF2THlBZ0lDQWdJQ0FnSUZSdloyZHNaVnh1SUNvZ0x5OGdJQ0FnSUR3dlluVjBkRzl1UGx4dUlDb2dMeThnUEM5a2FYWStYRzRnS2x4dUlDb2dKQ2hjSWk1cWN5MWpiMnhzWVhCelpTMTBiMmRuYkdWY0lpa3VZWEpwWVZKbFppaGNJbU52Ym5SeWIyeHpYQ0lzSUdaMWJtTjBhVzl1SUNocExDQmhkSFJ5S1NCN1hHNGdLbHh1SUNvZ0lDQWdJSEpsZEhWeWJpQWtLSFJvYVhNcFhHNGdLaUFnSUNBZ0lDQWdJQzVqYkc5elpYTjBLRndpTG1wekxXTnZiR3hoY0hObFhDSXBYRzRnS2lBZ0lDQWdJQ0FnSUM1bWFXNWtLRndpTG1wekxXTnZiR3hoY0hObExXTnZiblJsYm5SY0lpazdYRzRnS2x4dUlDb2dmU2s3WEc0Z0tseHVJQ29nTHk4Z1RtOTNJRzFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKcWN5MWpiMnhzWVhCelpWd2lQbHh1SUNvZ0x5OGdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnFjeTFqYjJ4c1lYQnpaUzFqYjI1MFpXNTBYQ0lnYVdROVhDSmhibTl1ZVcxdmRYTXdYQ0krWEc0Z0tpQXZMeUFnSUNBZ0lDQWdJRXh2Y21WdElHbHdjM1Z0SUdSdmJHOXlJSE5wZENCaGJXVjBJQzR1TGx4dUlDb2dMeThnSUNBZ0lEd3ZaR2wyUGx4dUlDb2dMeThnSUNBZ0lEeGlkWFIwYjI0Z1kyeGhjM005WENKcWN5MWpiMnhzWVhCelpTMTBiMmRuYkdWY0lpQmhjbWxoTFdOdmJuUnliMnh6UFZ3aVlXNXZibmx0YjNWek1Gd2lQbHh1SUNvZ0x5OGdJQ0FnSUNBZ0lDQlViMmRuYkdWY2JpQXFJQzh2SUNBZ0lDQThMMkoxZEhSdmJqNWNiaUFxSUM4dklEd3ZaR2wyUGx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGtkbGRIUnBibWNnWVNCeVpXWmxjbVZ1WTJVOEwyTmhjSFJwYjI0K1hHNGdLaUF2THlCTllYSnJkWEFnYVhNNlhHNGdLaUF2THlBOGFERWdhV1E5WENKaGJtOXVlVzF2ZFhNd1hDSStTR1ZoWkdsdVp6d3ZhREUrWEc0Z0tpQXZMeUE4WkdsMklHTnNZWE56UFZ3aWIyNWxYQ0lnWVhKcFlTMXNZV0psYkd4bFpHSjVQVndpWVc1dmJubHRiM1Z6TUZ3aVBseHVJQ29nTHk4Z0lDQWdJRXh2Y21WdElHbHdjM1Z0SUdSdmJHOXlJSE5wZENCaGJXVjBJQzR1TGx4dUlDb2dMeThnUEM5a2FYWStYRzRnS2x4dUlDb2dKQ2hjSWk1dmJtVmNJaWt1WVhKcFlWSmxaaWhjSW14aFltVnNiR1ZrWW5sY0lpazdJQzh2SUMwK0lDUW9QR2d4UGlsY2JpQXFJQ1FvWENJdWIyNWxYQ0lwTG1GeWFXRlNaV1lvWENKamIyNTBjbTlzYzF3aUtUc2dJQ0F2THlBdFBpQWtLQ2xjYmlBcVhHNGdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVXWVd4MVpTQnBjeUIwY21WaGRHVmtJR3hwYTJVZ1lTQkRVMU1nYzJWc1pXTjBiM0k4TDJOaGNIUnBiMjQrWEc0Z0tpQXZMeUJOWVhKcmRYQWdhWE02WEc0Z0tpQXZMeUE4WW5WMGRHOXVJR2xrUFZ3aVluVjBkRzl1WENJK1BDOWlkWFIwYjI0K1hHNGdLaUF2THlBOFpHbDJJR2xrUFZ3aWMyVmpkR2x2Ymx3aVBqd3ZaR2wyUGx4dUlDb2dMeThnUEhObFkzUnBiMjQrUEM5elpXTjBhVzl1UGx4dUlDcGNiaUFxSUNRb1hDSWpZblYwZEc5dVhDSXBMbUZ5YVdGU1pXWW9YQ0pqYjI1MGNtOXNjMXdpTENCY0luTmxZM1JwYjI1Y0lpazdYRzRnS2x4dUlDb2dMeThnVG05M0lHMWhjbXQxY0NCcGN6cGNiaUFxSUM4dklEeGlkWFIwYjI0Z2FXUTlYQ0ppZFhSMGIyNWNJaUJoY21saExXTnZiblJ5YjJ4elBWd2lZVzV2Ym5sdGIzVnpNRndpUGp3dlluVjBkRzl1UGx4dUlDb2dMeThnUEdScGRpQnBaRDFjSW5ObFkzUnBiMjVjSWo0OEwyUnBkajVjYmlBcUlDOHZJRHh6WldOMGFXOXVJR2xrUFZ3aVlXNXZibmx0YjNWek1Gd2lQand2YzJWamRHbHZiajVjYmlBcUwxeHVKQzVtYmk1aGNtbGhVbVZtSUQwZ1puVnVZM1JwYjI0Z0tIQnliM0JsY25SNUxDQjJZV3gxWlNrZ2UxeHVYRzRnSUNBZ2NtVjBkWEp1SUdGalkyVnpjeWhjYmlBZ0lDQWdJQ0FnZEdocGN5eGNiaUFnSUNBZ0lDQWdjSEp2Y0dWeWRIa3NYRzRnSUNBZ0lDQWdJSFpoYkhWbExGeHVJQ0FnSUNBZ0lDQklRVTVFVEVWU1gxSkZSa1ZTUlU1RFJWeHVJQ0FnSUNrN1hHNWNibjA3WEc1Y2JpOHZJRk52ZFhKalpUb2dMM055WXk5cGJuTjBZVzVqWlM5aGNtbGhVM1JoZEdVdWFuTmNibHh1WEc1Y2JpOHFLbHh1SUNvZ1UyVjBjeUJ2Y2lCblpYUnpJSFJvWlNCWFFVa3RRVkpKUVNCemRHRjBaU0J2WmlCMGFHVWdZMjlzYkdWamRHbHZiaTVjYmlBcUlEeGljajQ4WW5JK1hHNGdLaUJYYUdWdUlITmxkSFJwYm1jZ2RHaGxJSE4wWVhSbExDQm1ZV3h6WlN3Z1hDSm1ZV3h6WlZ3aUlDaGhibmtnWTJGelpTa3NJREFnWVc1a0lGd2lNRndpSUhkcGJHd2dZbVZjYmlBcUlHTnZibk5wWkdWeVpXUWdabUZzYzJVdUlFRnNiQ0J2ZEdobGNpQjJZV3gxWlhNZ2QybHNiQ0JpWlNCamIyNXphV1JsY21Wa0lIUnlkV1VnWlhoalpYQjBJR1p2Y2lCY0ltMXBlR1ZrWENKY2JpQXFJQ2hoYm5rZ1kyRnpaU2tnZDJocFkyZ2dkMmxzYkNCelpYUWdkR2hsSUhOMFlYUmxJSFJ2SUZ3aWJXbDRaV1JjSWk0Z1ZHaGxJR1JwWm1abGNuTWdabkp2YlZ4dUlDb2dXMnBSZFdWeWVTTmhjbWxoWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pZWEpwWVgwZ2QyaHBZMmdnZDJsc2JDQnphVzF3YkhrZ2MyVjBJSFJvWlZ4dUlDb2dZWFIwY21saWRYUmxLSE1wSUhkcGRHaHZkWFFnWTI5dWRtVnlkR2x1WnlCMGFHVWdkbUZzZFdVdVhHNGdLaUE4WW5JK1BHSnlQbHh1SUNvZ1FXWjBaWElnYzJWMGRHbHVaeUIwYUdVZ2MzUmhkR1VvY3lrc0lHRWdhbEYxWlhKNUlHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUdGbVptVmpkR1ZrWEc0Z0tpQmxiR1Z0Wlc1MGN5QnBjeUJ5WlhSMWNtNWxaQzRnVkdobElITjBZWFJsSUdadmNpQjBhR1VnWm1seWMzUWdiV0YwWTJocGJtY2daV3hsYldWdWRDQnBjeUJ5WlhSMWNtNWxaRnh1SUNvZ2QyaGxiaUJuWlhSMGFXNW5MbHh1SUNvZ1BHSnlQanhpY2o1Y2JpQXFJRUZzYkNCaGRIUnlhV0oxZEdWeklHRnlaU0J1YjNKdFlXeHBjMlZrSUMwZ2MyVmxYRzRnS2lCYmFsRjFaWEo1TG01dmNtMWhiR2x6WlVGeWFXRmRlMEJzYVc1cklHVjRkR1Z5Ym1Gc09tcFJkV1Z5ZVM1dWIzSnRZV3hwYzJWQmNtbGhmU0JtYjNJZ1puVnNiQ0JrWlhSaGFXeHpMbHh1SUNwY2JpQXFJRUJ0WlcxaVpYSnZaaUJsZUhSbGNtNWhiRHBxVVhWbGNubGNiaUFxSUVCcGJuTjBZVzVqWlZ4dUlDb2dRR0ZzYVdGeklDQWdJR0Z5YVdGVGRHRjBaVnh1SUNvZ1FIQmhjbUZ0SUNBZ0lIdFBZbXBsWTNSOFUzUnlhVzVuZlNCd2NtOXdaWEowZVZ4dUlDb2dJQ0FnSUNBZ0lDQWdJRVZwZEdobGNpQmhJR3RsZVM5MllXeDFaU0JqYjIxaWFXNWhkR2x2YmlCd2NtOXdaWEowYVdWeklIUnZJSE5sZENCdmNpQjBhR1VnYm1GdFpTQnZaaUIwYUdWY2JpQXFJQ0FnSUNBZ0lDQWdJQ0JYUVVrdFFWSkpRU0J6ZEdGMFpTQjBieUJ6WlhRdVhHNGdLaUJBY0dGeVlXMGdJQ0FnZTBGMGRISnBZblYwWlY5RFlXeHNZbUZqYTN4Q2IyOXNaV0Z1ZkU1MWJXSmxjbnhUZEhKcGJtZDlJRnQyWVd4MVpWMWNiaUFxSUNBZ0lDQWdJQ0FnSUNCV1lXeDFaU0J2WmlCMGFHVWdZWFIwY21saWRYUmxMbHh1SUNvZ1FISmxkSFZ5YmlBZ0lIdEJVa2xCWDNOMFlYUmxmR3BSZFdWeWVYMWNiaUFxSUNBZ0lDQWdJQ0FnSUNCRmFYUm9aWElnZEdobElHcFJkV1Z5ZVNCdlltcGxZM1FnY21Wd2NtVnpaVzUwYVc1bklIUm9aU0J0YjJScFptbGxaQ0JsYkdWdFpXNTBjMXh1SUNvZ0lDQWdJQ0FnSUNBZ0lDaHpaWFIwYVc1bktTQnZjaUIwYUdVZ2MzUmhkR1VnYjJZZ2RHaGxJR1pwY25OMElHMWhkR05vYVc1bklHVnNaVzFsYm5RdVhHNGdLbHh1SUNvZ1FHVjRZVzF3YkdVZ1BHTmhjSFJwYjI0K1IyVjBkR2x1WnlCemRHRjBaVHd2WTJGd2RHbHZiajVjYmlBcUlDOHZJRTFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lpQmhjbWxoTFdKMWMzazlYQ0owY25WbFhDSWdZWEpwWVMxamFHVmphMlZrUFZ3aWJXbDRaV1JjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUFrS0Z3aUkyOXVaVndpS1M1aGNtbGhVM1JoZEdVb1hDSmlkWE41WENJcE95QWdJQ0F2THlBdFBpQjBjblZsWEc0Z0tpQWtLRndpSTI5dVpWd2lLUzVoY21saFUzUmhkR1VvWENKamFHVmphMlZrWENJcE95QXZMeUF0UGlCY0ltMXBlR1ZrWENKY2JpQXFJQ1FvWENJamIyNWxYQ0lwTG1GeWFXRlRkR0YwWlNoY0ltaHBaR1JsYmx3aUtUc2dJQzh2SUMwK0lIVnVaR1ZtYVc1bFpGeHVJQ3BjYmlBcUlFQmxlR0Z0Y0d4bElEeGpZWEIwYVc5dVBsTmxkSFJwYm1jZ2MzUmhkR1U4TDJOaGNIUnBiMjQrWEc0Z0tpQXZMeUJGWVdOb0lHOW1JSFJvWlhObElIZHBiR3dnYzJWMElIUm9aU0J6ZEdGMFpTQjBieUJtWVd4elpUcGNiaUFxSUNRb1hDSWpiMjVsWENJcExtRnlhV0ZUZEdGMFpTaGNJbUoxYzNsY0lpd2dYQ0ptWVd4elpWd2lLVHRjYmlBcUlDUW9YQ0lqYjI1bFhDSXBMbUZ5YVdGVGRHRjBaU2hjSW1KMWMzbGNJaXdnWENKR1FVeFRSVndpS1R0Y2JpQXFJQ1FvWENJamIyNWxYQ0lwTG1GeWFXRlRkR0YwWlNoY0ltSjFjM2xjSWl3Z1ptRnNjMlVwTzF4dUlDb2dKQ2hjSWlOdmJtVmNJaWt1WVhKcFlWTjBZWFJsS0Z3aVluVnplVndpTENBd0tUdGNiaUFxSUNRb1hDSWpiMjVsWENJcExtRnlhV0ZUZEdGMFpTaGNJbUoxYzNsY0lpd2dYQ0l3WENJcE8xeHVJQ3BjYmlBcUlDOHZJRVZoWTJnZ2IyWWdkR2hsYzJVZ2QybHNiQ0J6WlhRZ2RHaGxJSE4wWVhSbElIUnZJRndpYldsNFpXUmNJanBjYmlBcUlDUW9YQ0lqYjI1bFhDSXBMbUZ5YVdGVGRHRjBaU2hjSW1Ob1pXTnJaV1JjSWl3Z1hDSnRhWGhsWkZ3aUtUdGNiaUFxSUNRb1hDSWpiMjVsWENJcExtRnlhV0ZUZEdGMFpTaGNJbU5vWldOclpXUmNJaXdnWENKTlNWaEZSRndpS1R0Y2JpQXFYRzRnS2lBdkx5QkZZV05vSUc5bUlIUm9aWE5sSUhkcGJHd2djMlYwSUhSb1pTQnpkR0YwWlNCMGJ5QjBjblZsWEc0Z0tpQWtLRndpSTI5dVpWd2lLUzVoY21saFUzUmhkR1VvWENKaWRYTjVYQ0lzSUZ3aWRISjFaVndpS1R0Y2JpQXFJQ1FvWENJamIyNWxYQ0lwTG1GeWFXRlRkR0YwWlNoY0ltSjFjM2xjSWl3Z1hDSlVVbFZGWENJcE8xeHVJQ29nSkNoY0lpTnZibVZjSWlrdVlYSnBZVk4wWVhSbEtGd2lZblZ6ZVZ3aUxDQjBjblZsS1R0Y2JpQXFJQ1FvWENJamIyNWxYQ0lwTG1GeWFXRlRkR0YwWlNoY0ltSjFjM2xjSWl3Z01TazdYRzRnS2lBa0tGd2lJMjl1WlZ3aUtTNWhjbWxoVTNSaGRHVW9YQ0ppZFhONVhDSXNJRndpTVZ3aUtUdGNiaUFxSUM4dklGZEJVazVKVGtjNklIUm9aWE5sSUdGc2MyOGdjMlYwSUhSb1pTQnpkR0YwWlNCMGJ5QjBjblZsWEc0Z0tpQWtLRndpSTI5dVpWd2lLUzVoY21saFUzUmhkR1VvWENKaWRYTjVYQ0lzSUh0OUtUdGNiaUFxSUNRb1hDSWpiMjVsWENJcExtRnlhV0ZUZEdGMFpTaGNJbUoxYzNsY0lpd2diblZzYkNrN1hHNGdLaUFrS0Z3aUkyOXVaVndpS1M1aGNtbGhVM1JoZEdVb1hDSmlkWE41WENJc0lGd2libTkwYUdsdVoxd2lLVHRjYmlBcUlDUW9YQ0lqYjI1bFhDSXBMbUZ5YVdGVGRHRjBaU2hjSW1KMWMzbGNJaXdnWENKY0lpazdYRzRnS2lBa0tGd2lJMjl1WlZ3aUtTNWhjbWxoVTNSaGRHVW9YQ0ppZFhONVhDSXNJQzB4S1R0Y2JpQXFYRzRnS2lBdkx5QkZZV05vSUdWNFlXMXdiR1VnY21WMGRYSnVjeUJoSUdwUmRXVnllU0J2WW1wbFkzUWdjbVZ3Y21WelpXNTBhVzVuSUZ3aUkyOXVaVndpSUdGdVpDQmhiaUJ2WW1wbFkzUmNiaUFxSUM4dklHTmhiaUJpWlNCd1lYTnpaV1FnWVhNZ2NHRnlZVzFsZEdWeWN5QmhjeUIzWld4c09seHVJQ29nSkNoY0lpTnZibVZjSWlrdVlYSnBZVk4wWVhSbEtIdGNiaUFxSUNBZ0lDQmlkWE41T2lCMGNuVmxYRzRnS2lCOUtUdGNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNVRaWFIwYVc1bklITjBZWFJsSUhkcGRHZ2dZU0JtZFc1amRHbHZiand2WTJGd2RHbHZiajVjYmlBcUlDOHZJRTFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKamFHVmphMkp2ZUZ3aVBqd3ZaR2wyUGx4dUlDb2dMeThnUEdsdWNIVjBJSFI1Y0dVOVhDSmphR1ZqYTJKdmVGd2lJR05vWldOclpXUStYRzRnS2x4dUlDb2dKQ2hjSWk1amFHVmphMkp2ZUZ3aUtTNWhjbWxoVTNSaGRHVW9YQ0pqYUdWamEyVmtYQ0lzSUdaMWJtTjBhVzl1SUNocExDQmhkSFJ5S1NCN1hHNGdLbHh1SUNvZ0lDQWdJSEpsZEhWeWJpQWtLSFJvYVhNcFhHNGdLaUFnSUNBZ0lDQWdJQzV1WlhoMEtGd2lhVzV3ZFhSYmRIbHdaVDFjWEZ3aVkyaGxZMnRpYjNoY1hGd2lYVndpS1Z4dUlDb2dJQ0FnSUNBZ0lDQXVjSEp2Y0NoY0ltTm9aV05yWldSY0lpazdYRzRnS2x4dUlDb2dmU2s3WEc0Z0tseHVJQ29nTHk4Z1RtOTNJRzFoY210MWNDQnBjenBjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKamFHVmphMkp2ZUZ3aUlHRnlhV0V0WTJobFkydGxaRDFjSW5SeWRXVmNJajQ4TDJScGRqNWNiaUFxSUM4dklEeHBibkIxZENCMGVYQmxQVndpWTJobFkydGliM2hjSWlCamFHVmphMlZrUGx4dUlDb3ZYRzRrTG1adUxtRnlhV0ZUZEdGMFpTQTlJR1oxYm1OMGFXOXVJQ2h3Y205d1pYSjBlU3dnZG1Gc2RXVXBJSHRjYmx4dUlDQWdJSEpsZEhWeWJpQmhZMk5sYzNNb1hHNGdJQ0FnSUNBZ0lIUm9hWE1zWEc0Z0lDQWdJQ0FnSUhCeWIzQmxjblI1TEZ4dUlDQWdJQ0FnSUNCMllXeDFaU3hjYmlBZ0lDQWdJQ0FnU0VGT1JFeEZVbDlUVkVGVVJWeHVJQ0FnSUNrN1hHNWNibjA3WEc1Y2JpOHZJRk52ZFhKalpUb2dMM055WXk5cGJuTjBZVzVqWlM5eVpXMXZkbVZCY21saExtcHpYRzVjYmx4dUpDNW1iaTVsZUhSbGJtUW9lMXh1WEc0Z0lDQWdjbVZ0YjNabFFYSnBZVG9nY21WdGIzWmxRWFIwY21saWRYUmxMRnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUVd4cFlYTWdiMllnVzJwUmRXVnllU055WlcxdmRtVkJjbWxoWFh0QWJHbHVheUJsZUhSbGNtNWhiRHBxVVhWbGNua2pjbVZ0YjNabFFYSnBZWDB1WEc0Z0lDQWdJQ3BjYmlBZ0lDQWdLaUJBYldWdFltVnliMllnWlhoMFpYSnVZV3c2YWxGMVpYSjVYRzRnSUNBZ0lDb2dRR2x1YzNSaGJtTmxYRzRnSUNBZ0lDb2dRR1oxYm1OMGFXOXVYRzRnSUNBZ0lDb2dRSEJoY21GdElDQWdJSHRUZEhKcGJtZDlJRzVoYldWY2JpQWdJQ0FnS2lBZ0lDQWdJQ0FnSUNBZ1YwRkpMVUZTU1VFZ1lYUjBjbWxpZFhSbElIUnZJSEpsYlc5MlpTNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlDQWdlMnBSZFdWeWVYMWNiaUFnSUNBZ0tpQWdJQ0FnSUNBZ0lDQWdhbEYxWlhKNUlHRjBkSEpwWW5WMFpTQnlaWEJ5WlhObGJuUnBibWNnZEdobElHVnNaVzFsYm5SeklHMXZaR2xtYVdWa0xseHVJQ0FnSUNBcUwxeHVJQ0FnSUhKbGJXOTJaVUZ5YVdGU1pXWTZJSEpsYlc5MlpVRjBkSEpwWW5WMFpTeGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUZzYVdGeklHOW1JRnRxVVhWbGNua2pjbVZ0YjNabFFYSnBZVjE3UUd4cGJtc2daWGgwWlhKdVlXdzZhbEYxWlhKNUkzSmxiVzkyWlVGeWFXRjlMbHh1SUNBZ0lDQXFYRzRnSUNBZ0lDb2dRRzFsYldKbGNtOW1JR1Y0ZEdWeWJtRnNPbXBSZFdWeWVWeHVJQ0FnSUNBcUlFQnBibk4wWVc1alpWeHVJQ0FnSUNBcUlFQm1kVzVqZEdsdmJseHVJQ0FnSUNBcUlFQndZWEpoYlNBZ0lDQjdVM1J5YVc1bmZTQnVZVzFsWEc0Z0lDQWdJQ29nSUNBZ0lDQWdJQ0FnSUZkQlNTMUJVa2xCSUdGMGRISnBZblYwWlNCMGJ5QnlaVzF2ZG1VdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlBZ0lIdHFVWFZsY25sOVhHNGdJQ0FnSUNvZ0lDQWdJQ0FnSUNBZ0lHcFJkV1Z5ZVNCaGRIUnlhV0oxZEdVZ2NtVndjbVZ6Wlc1MGFXNW5JSFJvWlNCbGJHVnRaVzUwY3lCdGIyUnBabWxsWkM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0J5WlcxdmRtVkJjbWxoVTNSaGRHVTZJSEpsYlc5MlpVRjBkSEpwWW5WMFpWeHVYRzU5S1R0Y2JseHVMeThnVTI5MWNtTmxPaUF2YzNKakwybHVjM1JoYm1ObEwzSnZiR1V1YW5OY2JseHVYRzVjYmk4cUtseHVJQ29nVTJWMGN5QjBhR1VnY205c1pTQnZaaUJoYkd3Z1pXeGxiV1Z1ZEhNZ2FXNGdkR2hsSUdOdmJHeGxZM1JwYjI0Z2IzSWdaMlYwY3lCMGFHVWdjbTlzWlNCdlppQjBhR1VnWm1seWMzUmNiaUFxSUdWc1pXMWxiblFnYVc0Z2RHaGxJR052Ykd4bFkzUnBiMjRzSUdSbGNHVnVaR2x1WnlCdmJpQjNhR1YwYUdWeUlHOXlJRzV2ZENCMGFHVWdQR052WkdVK2NtOXNaVHd2WTI5a1pUNWNiaUFxSUdGeVozVnRaVzUwSUdseklIQnliM1pwWkdWa0xpQkJjeUJiYWxGMVpYSjVJM0p2YkdWZGUwQnNhVzVySUdWNGRHVnlibUZzT21wUmRXVnllU055YjJ4bGZTQnBjeUJxZFhOMElHRmNiaUFxSUhkeVlYQndaWElnWm05eUlGdHFVWFZsY25rallYUjBjbDE3UUd4cGJtc2dhSFIwY0RvdkwyRndhUzVxY1hWbGNua3VZMjl0TDJGMGRISXZmU3dnZEdobFhHNGdLaUE4WTI5a1pUNXliMnhsUEM5amIyUmxQaUJ3WVhKaGJXVjBaWElnWTJGdUlHRmpkSFZoYkd4NUlHSmxJR0Z1ZVNCMllXeDFaU0IwZVhCbElIUm9ZWFFnZEdobElHOW1abWxqYVdGc1hHNGdLaUJrYjJOMWJXVnVkR0YwYVc5dUlHMWxiblJwYjI1ekxseHVJQ29nUEdKeVBqeGljajVjYmlBcUlFRmpZMjl5WkdsdVp5QjBieUIwYUdVZ1YwRkpMVUZTU1VFZ2MzQmxZM01zSUdGdUlHVnNaVzFsYm5RZ1kyRnVJR2hoZG1VZ2JYVjBiR2x3YkdVZ2NtOXNaWE1nWVhNZ1lWeHVJQ29nYzNCaFkyVXRjMlZ3WVhKaGRHVmtJR3hwYzNRdUlGUm9hWE1nYldWMGFHOWtJSGRwYkd3Z2IyNXNlU0J6WlhRZ2RHaGxJSEp2YkdVZ1lYUjBjbWxpZFhSbElIUnZJSFJvWlZ4dUlDb2daMmwyWlc0Z2MzUnlhVzVuSUhkb1pXNGdjMlYwZEdsdVp5NGdTV1lnZVc5MUlIZGhiblFnZEc4Z2JXOWthV1o1SUhSb1pTQnliMnhsY3l3Z2RYTmxYRzRnS2lCYmFsRjFaWEo1STJGa1pGSnZiR1ZkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTmhaR1JTYjJ4bGZTQmhibVJjYmlBcUlGdHFVWFZsY25ramNtVnRiM1psVW05c1pWMTdRR3hwYm1zZ1pYaDBaWEp1WVd3NmFsRjFaWEo1STNKbGJXOTJaVkp2YkdWOUxseHVJQ3BjYmlBcUlFQnRaVzFpWlhKdlppQmxlSFJsY201aGJEcHFVWFZsY25sY2JpQXFJRUJwYm5OMFlXNWpaVnh1SUNvZ1FHRnNhV0Z6SUNBZ0lISnZiR1ZjYmlBcUlFQndZWEpoYlNBZ0lDQjdRWFIwY21saWRYUmxYME5oYkd4aVlXTnJmRk4wY21sdVozMGdXM0p2YkdWZFhHNGdLaUFnSUNBZ0lDQWdJQ0FnVW05c1pTQjBieUJuWlhRZ2IzSWdablZ1WTNScGIyNGdkRzhnYzJWMElIUm9aU0J5YjJ4bExseHVJQ29nUUhKbGRIVnliaUFnSUh0cVVYVmxjbmw4VTNSeWFXNW5mSFZ1WkdWbWFXNWxaSDFjYmlBcUlDQWdJQ0FnSUNBZ0lDQkZhWFJvWlhJZ2RHaGxJR3BSZFdWeWVTQnZZbXBsWTNRZ2NtVndjbVZ6Wlc1MGFXNW5JSFJvWlNCbGJHVnRaVzUwY3lCMGFHRjBJSGRsY21WY2JpQXFJQ0FnSUNBZ0lDQWdJQ0J0YjJScFptbGxaQ0J2Y2lCMGFHVWdjbTlzWlNCMllXeDFaUzVjYmlBcVhHNGdLaUJBWlhoaGJYQnNaVnh1SUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aVBqd3ZaR2wyUGx4dUlDb2dMeThnUEdScGRpQnBaRDFjSW5SM2Ixd2lQand2WkdsMlBseHVJQ3BjYmlBcUlDUW9YQ0lqYjI1bFhDSXBMbkp2YkdVb1hDSndjbVZ6Wlc1MFlYUnBiMjVjSWlrN0lDOHZJQzArSUdwUmRXVnllU2c4WkdsMklHbGtQVndpYjI1bFhDSStLVnh1SUNwY2JpQXFJQzh2SUU1dmR5QnRZWEpyZFhBZ2FYTTZYRzRnS2lBdkx5QThaR2wySUdsa1BWd2liMjVsWENJZ2NtOXNaVDFjSW5CeVpYTmxiblJoZEdsdmJsd2lQand2WkdsMlBseHVJQ29nTHk4Z1BHUnBkaUJwWkQxY0luUjNiMXdpUGp3dlpHbDJQbHh1SUNwY2JpQXFJQ1FvWENJamIyNWxYQ0lwTG5KdmJHVW9LVHNnTHk4Z0xUNGdYQ0p3Y21WelpXNTBZWFJwYjI1Y0lseHVJQ29nSkNoY0lpTjBkMjljSWlrdWNtOXNaU2dwT3lBdkx5QXRQaUIxYm1SbFptbHVaV1JjYmlBcVhHNGdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVUWlhSMGFXNW5JR0VnY205c1pTQjNhWFJvSUdFZ1puVnVZM1JwYjI0OEwyTmhjSFJwYjI0K1hHNGdLaUF2THlCTllYSnJkWEFnYVhNNlhHNGdLaUF2THlBOFpHbDJJR2xrUFZ3aWIyNWxYQ0lnY205c1pUMWNJbUoxZEhSdmJsd2lQand2WkdsMlBseHVJQ3BjYmlBcUlDUW9YQ0lqYjI1bFhDSXBMbkp2YkdVb1puVnVZM1JwYjI0Z0tHbHVaR1Y0TENCamRYSnlaVzUwS1NCN1hHNGdLaUFnSUNBZ2NtVjBkWEp1SUdOMWNuSmxiblFnS3lCY0lpQjBiMjlzZEdsd1hDSTdYRzRnS2lCOUtUdGNiaUFxWEc0Z0tpQXZMeUJPYjNjZ2JXRnlhM1Z3SUdsek9seHVJQ29nTHk4Z1BHUnBkaUJwWkQxY0ltOXVaVndpSUhKdmJHVTlYQ0ppZFhSMGIyNGdkRzl2YkhScGNGd2lQand2WkdsMlBseHVJQ292WEc0a0xtWnVMbkp2YkdVZ1BTQm1kVzVqZEdsdmJpQW9jbTlzWlNrZ2UxeHVYRzRnSUNBZ2NtVjBkWEp1SUhKdmJHVWdQVDA5SUhWdVpHVm1hVzVsWkZ4dUlDQWdJQ0FnSUNBL0lIUm9hWE11WVhSMGNpaGNJbkp2YkdWY0lpbGNiaUFnSUNBZ0lDQWdPaUIwYUdsekxtRjBkSElvWENKeWIyeGxYQ0lzSUhKdmJHVXBPMXh1WEc1OU8xeHVYRzR2THlCVGIzVnlZMlU2SUM5emNtTXZhVzV6ZEdGdVkyVXZZV1JrVW05c1pTNXFjMXh1WEc1Y2JpOHFLbHh1SUNvZ1FXUmtjeUJoSUhKdmJHVWdkRzhnWVNCamIyeHNaV04wYVc5dUlHOW1JR1ZzWlcxbGJuUnpMaUJVYUdVZ2NtOXNaU0IzYVd4c0lHNXZkQ0JpWlNCaFpHUmxaQ0JwWmlCcGRDZHpYRzRnS2lCbGJYQjBlU0FvWENKY0lpQnZjaUIxYm1SbFptbHVaV1FwTENCcFppQjBhR1VnWm5WdVkzUnBiMjRnY21WemNHOXVjMlVnYVhNZ1pXMXdkSGtnYjNJZ2FXWWdkR2hsSUdWc1pXMWxiblJjYmlBcUlHRnNjbVZoWkhrZ2FHRnpJSFJvWVhRZ2NtOXNaUzRnU1c0Z2RHaGhkQ0IzWVhrZ2FYUW5jeUJ6YVcxcGJHRnlJSFJ2WEc0Z0tpQmJhbEYxWlhKNUkyRmtaRU5zWVhOelhYdEFiR2x1YXlCb2RIUndjem92TDJGd2FTNXFjWFZsY25rdVkyOXRMMkZrWkVOc1lYTnpMMzB1WEc0Z0tseHVJQ29nUUcxbGJXSmxjbTltSUdWNGRHVnlibUZzT21wUmRXVnllVnh1SUNvZ1FHbHVjM1JoYm1ObFhHNGdLaUJBWVd4cFlYTWdJQ0FnWVdSa1VtOXNaVnh1SUNvZ1FIQmhjbUZ0SUNBZ0lIdEJkSFJ5YVdKMWRHVmZRMkZzYkdKaFkydDhVM1J5YVc1bmZTQnliMnhsWEc0Z0tpQWdJQ0FnSUNBZ0lDQWdVbTlzWlNoektTQjBieUJoWkdRZ2RHOGdkR2hsSUcxaGRHTm9hVzVuSUdWc1pXMWxiblJ6SUc5eUlHWjFibU4wYVc5dUlIUnZJR2RsYm1WeVlYUmxJSFJvWlZ4dUlDb2dJQ0FnSUNBZ0lDQWdJSEp2YkdVb2N5a2dkRzhnWVdSa0xseHVJQ29nUUhKbGRIVnliaUFnSUh0cVVYVmxjbmw5WEc0Z0tpQWdJQ0FnSUNBZ0lDQWdhbEYxWlhKNUlHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUcxaGRHTm9hVzVuSUdWc1pXMWxiblJ6TGx4dUlDcGNiaUFxSUVCbGVHRnRjR3hsSUR4allYQjBhVzl1UGtGa1pHbHVaeUJoSUhKdmJHVThMMk5oY0hScGIyNCtYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTTZYRzRnS2lBdkx5QThaR2wySUdOc1lYTnpQVndpYjI1bFhDSWdjbTlzWlQxY0luQnlaWE5sYm5SaGRHbHZibHdpUGp3dlpHbDJQbHh1SUNvZ0x5OGdQR1JwZGlCamJHRnpjejFjSW05dVpWd2lQand2WkdsMlBseHVJQ3BjYmlBcUlDUW9YQ0l1YjI1bFhDSXBMbUZrWkZKdmJHVW9YQ0poYkdWeWRGd2lLVHNnTHk4Z0xUNGdhbEYxWlhKNUtEeGthWFkrTENBOFpHbDJQaWxjYmlBcVhHNGdLaUF2THlCT2IzY2diV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCamJHRnpjejFjSW05dVpWd2lJSEp2YkdVOVhDSndjbVZ6Wlc1MFlYUnBiMjRnWVd4bGNuUmNJajQ4TDJScGRqNWNiaUFxSUM4dklEeGthWFlnWTJ4aGMzTTlYQ0p2Ym1WY0lpQnliMnhsUFZ3aVlXeGxjblJjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVCWkdScGJtY2dZU0J5YjJ4bElIZHBkR2dnWVNCbWRXNWpkR2x2Ymp3dlkyRndkR2x2Ymo1Y2JpQXFJQzh2SUUxaGNtdDFjQ0JwY3pwY2JpQXFJQzh2SUR4a2FYWWdZMnhoYzNNOVhDSnZibVZjSWlCeWIyeGxQVndpY0hKbGMyVnVkR0YwYVc5dVhDSStQQzlrYVhZK1hHNGdLbHh1SUNvZ0pDaGNJaTV2Ym1WY0lpa3VZV1JrVW05c1pTaG1kVzVqZEdsdmJpQW9hVzVrWlhnc0lHTjFjbkpsYm5RcElIdGNiaUFxSUNBZ0lDQnlaWFIxY200Z1hDSmhiR1Z5ZENCamIyMWliMkp2ZUZ3aU8xeHVJQ29nZlNrN1hHNGdLbHh1SUNvZ0x5OGdUbTkzSUcxaGNtdDFjQ0JwY3pwY2JpQXFJQzh2SUR4a2FYWWdZMnhoYzNNOVhDSnZibVZjSWlCeWIyeGxQVndpY0hKbGMyVnVkR0YwYVc5dUlHRnNaWEowSUdOdmJXSnZZbTk0WENJK1BDOWthWFkrWEc0Z0tpOWNiaVF1Wm00dVlXUmtVbTlzWlNBOUlHWjFibU4wYVc5dUlDaHliMnhsS1NCN1hHNWNiaUFnSUNCMllYSWdhWE5HZFc1amRHbHZiaUE5SUNRdWFYTkdkVzVqZEdsdmJpaHliMnhsS1R0Y2JseHVJQ0FnSUhKbGRIVnliaUIwYUdsekxuSnZiR1VvWm5WdVkzUnBiMjRnS0dsdVpHVjRMQ0JqZFhKeVpXNTBLU0I3WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJSFpoYkhWbElEMGdhWE5HZFc1amRHbHZibHh1SUNBZ0lDQWdJQ0FnSUNBZ1B5QnliMnhsTG1OaGJHd29kR2hwY3l3Z2FXNWtaWGdzSUdOMWNuSmxiblFwWEc0Z0lDQWdJQ0FnSUNBZ0lDQTZJSEp2YkdVN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ5YjJ4bGN5QTlJSFJ2VjI5eVpITW9ZM1Z5Y21WdWRDazdYRzVjYmlBZ0lDQWdJQ0FnZEc5WGIzSmtjeWgyWVd4MVpTa3VabTl5UldGamFDaG1kVzVqZEdsdmJpQW9kbUZzS1NCN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZV3dnSVQwOUlGd2lYQ0pjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FtSmlCMllXd2dJVDA5SUhWdVpHVm1hVzVsWkZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNZbUlISnZiR1Z6TG1sdVpHVjRUMllvZG1Gc0tTQThJREJjYmlBZ0lDQWdJQ0FnSUNBZ0lDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEp2YkdWekxuQjFjMmdvZG1Gc0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQjlLVHRjYmx4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnY205c1pYTXVhbTlwYmloY0lpQmNJaWs3WEc1Y2JpQWdJQ0I5S1R0Y2JseHVmVHRjYmx4dUx5OGdVMjkxY21ObE9pQXZjM0pqTDJsdWMzUmhibU5sTDNKbGJXOTJaVkp2YkdVdWFuTmNibHh1WEc1Y2JpOHFLbHh1SUNvZ1VtVnRiM1psY3lCeWIyeGxjeUJtY205dElIUm9aU0JqYjJ4c1pXTjBhVzl1SUc5bUlHVnNaVzFsYm5SekxpQkpaaUIwYUdVZ2JXVjBhRzlrSUdseklHTmhiR3hsWkZ4dUlDb2dkMmwwYUc5MWRDQmhibmtnWVhKbmRXMWxiblJ6SUhSb1pXNGdkR2hsSUhKdmJHVWdZWFIwY21saWRYUmxJR2wwYzJWc1ppQnBjeUJ5WlcxdmRtVmtMaUJDWlNCaGQyRnlaVnh1SUNvZ2RHaGhkQ0IwYUdseklHbHpJRzV2ZENCMGFHVWdjMkZ0WlNCaGN5QndZWE56YVc1bklHRWdablZ1WTNScGIyNGdkMmhwWTJnZ2NtVjBkWEp1Y3lCMWJtUmxabWx1WldRZ0xWeHVJQ29nYzNWamFDQmhiaUJoWTNScGIyNGdkMmxzYkNCb1lYWmxJRzV2SUdWbVptVmpkQzVjYmlBcVhHNGdLaUJBYldWdFltVnliMllnWlhoMFpYSnVZV3c2YWxGMVpYSjVYRzRnS2lCQWFXNXpkR0Z1WTJWY2JpQXFJRUJoYkdsaGN5QWdJQ0J5WlcxdmRtVlNiMnhsWEc0Z0tpQkFjR0Z5WVcwZ0lDQWdlMEYwZEhKcFluVjBaVjlEWVd4c1ltRmphM3hUZEhKcGJtZDlJRnR5YjJ4bFhWeHVJQ29nSUNBZ0lDQWdJQ0FnSUZKdmJHVW9jeWtnZEc4Z2NtVnRiM1psSUc5eUlHRWdablZ1WTNScGIyNGdkRzhnWjJWdVpYSmhkR1VnZEdobElISnZiR1VvY3lrZ2RHOGdjbVZ0YjNabExseHVJQ29nUUhKbGRIVnliaUFnSUh0cVVYVmxjbmw5WEc0Z0tpQWdJQ0FnSUNBZ0lDQWdhbEYxWlhKNUlHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUcxaGRHTm9aV1FnWld4bGJXVnVkSE11WEc0Z0tseHVJQ29nUUdWNFlXMXdiR1VnUEdOaGNIUnBiMjQrVW1WdGIzWnBibWNnWVNCeWIyeGxQQzlqWVhCMGFXOXVQbHh1SUNvZ0x5OGdUV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCamJHRnpjejFjSW05dVpWd2lJSEp2YkdVOVhDSndjbVZ6Wlc1MFlYUnBiMjRnWVd4bGNuUmNJajQ4TDJScGRqNWNiaUFxSUM4dklEeGthWFlnWTJ4aGMzTTlYQ0p2Ym1WY0lpQnliMnhsUFZ3aVlXeGxjblJjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUFrS0Z3aUxtOXVaVndpS1M1eVpXMXZkbVZTYjJ4bEtGd2lZV3hsY25SY0lpazdJQzh2SUMwK0lHcFJkV1Z5ZVNnOFpHbDJQaXdnUEdScGRqNHBYRzRnS2x4dUlDb2dMeThnVG05M0lHMWhjbXQxY0NCcGN6cGNiaUFxSUM4dklEeGthWFlnWTJ4aGMzTTlYQ0p2Ym1WY0lpQnliMnhsUFZ3aWNISmxjMlZ1ZEdGMGFXOXVYQ0krUEM5a2FYWStYRzRnS2lBdkx5QThaR2wySUdOc1lYTnpQVndpYjI1bFhDSWdjbTlzWlQxY0lsd2lQand2WkdsMlBseHVJQ3BjYmlBcUlFQmxlR0Z0Y0d4bElEeGpZWEIwYVc5dVBrTnZiWEJzWlhSbGJIa2djbVZ0YjNacGJtY2dZU0J5YjJ4bFBDOWpZWEIwYVc5dVBseHVJQ29nTHk4Z1RXRnlhM1Z3SUdsek9seHVJQ29nTHk4Z1BHUnBkaUJqYkdGemN6MWNJbTl1WlZ3aUlISnZiR1U5WENKd2NtVnpaVzUwWVhScGIyNGdZV3hsY25SY0lqNDhMMlJwZGo1Y2JpQXFJQzh2SUR4a2FYWWdZMnhoYzNNOVhDSnZibVZjSWlCeWIyeGxQVndpWVd4bGNuUmNJajQ4TDJScGRqNWNiaUFxWEc0Z0tpQWtLRndpTG05dVpWd2lLUzV5WlcxdmRtVlNiMnhsS0NrN0lDOHZJQzArSUdwUmRXVnllU2c4WkdsMlBpd2dQR1JwZGo0cFhHNGdLbHh1SUNvZ0x5OGdUbTkzSUcxaGNtdDFjQ0JwY3pwY2JpQXFJQzh2SUR4a2FYWWdZMnhoYzNNOVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ1kyeGhjM005WENKdmJtVmNJajQ4TDJScGRqNWNiaUFxWEc0Z0tpQkFaWGhoYlhCc1pTQThZMkZ3ZEdsdmJqNVNaVzF2ZG1sdVp5QmhJSEp2YkdVZ2QybDBhQ0JoSUdaMWJtTjBhVzl1UEM5allYQjBhVzl1UGx4dUlDb2dMeThnVFdGeWEzVndJR2x6T2x4dUlDb2dMeThnUEdScGRpQmpiR0Z6Y3oxY0ltOXVaVndpSUhKdmJHVTlYQ0p3Y21WelpXNTBZWFJwYjI0Z1lXeGxjblFnWTI5dFltOWliM2hjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUFrS0Z3aUxtOXVaVndpS1M1eVpXMXZkbVZTYjJ4bEtHWjFibU4wYVc5dUlDaHBibVJsZUN3Z1kzVnljbVZ1ZENrZ2UxeHVJQ29nSUNBZ0lISmxkSFZ5YmlCamRYSnlaVzUwWEc0Z0tpQWdJQ0FnSUNBZ0lDNXpjR3hwZENndlhGeHpLeThwWEc0Z0tpQWdJQ0FnSUNBZ0lDNW1hV3gwWlhJb1puVnVZM1JwYjI0Z0tISnZiR1VwSUh0Y2JpQXFJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ5YjJ4bExtbHVaR1Y0VDJZb1hDSmhYQ0lwSUQ0Z0xURTdYRzRnS2lBZ0lDQWdJQ0FnSUgwcFhHNGdLaUFnSUNBZ0lDQWdJQzVxYjJsdUtGd2lJRndpS1R0Y2JpQXFJQ0FnSUNBdkx5QmNJbkJ5WlhObGJuUmhkR2x2YmlCaGJHVnlkRndpWEc0Z0tpQjlLVHRjYmlBcVhHNGdLaUF2THlCT2IzY2diV0Z5YTNWd0lHbHpPbHh1SUNvZ0x5OGdQR1JwZGlCamJHRnpjejFjSW05dVpWd2lJSEp2YkdVOVhDSmpiMjFpYjJKdmVGd2lQand2WkdsMlBseHVJQ292WEc0a0xtWnVMbkpsYlc5MlpWSnZiR1VnUFNCbWRXNWpkR2x2YmlBb2NtOXNaU2tnZTF4dVhHNGdJQ0FnZG1GeUlHbHpSblZ1WTNScGIyNGdQU0FrTG1selJuVnVZM1JwYjI0b2NtOXNaU2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdjbTlzWlNBOVBUMGdkVzVrWldacGJtVmtYRzRnSUNBZ0lDQWdJRDhnZEdocGN5NXlaVzF2ZG1WQmRIUnlLRndpY205c1pWd2lLVnh1SUNBZ0lDQWdJQ0E2SUhSb2FYTXVjbTlzWlNobWRXNWpkR2x2YmlBb2FXNWtaWGdzSUdOMWNuSmxiblFwSUh0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlIWmhiSFZsSUQwZ2FYTkdkVzVqZEdsdmJseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lEOGdjbTlzWlM1allXeHNLSFJvYVhNc0lHbHVaR1Y0TENCamRYSnlaVzUwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSURvZ2NtOXNaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUIyWVd4MVpYTWdQU0IwYjFkdmNtUnpLSFpoYkhWbEtUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSdlYyOXlaSE1vWTNWeWNtVnVkQ2xjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F1Wm1sc2RHVnlLR1oxYm1OMGFXOXVJQ2hoVW05c1pTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZG1Gc2RXVnpMbWx1WkdWNFQyWW9ZVkp2YkdVcElEd2dNRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM1cWIybHVLRndpSUZ3aUtUdGNibHh1SUNBZ0lDQWdJQ0I5S1R0Y2JseHVmVHRjYmx4dUx5OGdVMjkxY21ObE9pQXZjM0pqTDJsdWMzUmhibU5sTDJGeWFXRkdiMk4xYzJGaWJHVXVhbk5jYmx4dVhHNWNiaThxS2x4dUlDb2dVMlYwY3lCM2FHVjBhR1Z5SUc5eUlHNXZkQ0IwYUdVZ2JXRjBZMmhwYm1jZ1pXeGxiV1Z1ZEhNZ1lYSmxJR1p2WTNWellXSnNaUzRnVTNSeWFXNW5jeXdnYm5WdFltVnljeUJoYm1SY2JpQXFJR0p2YjJ4bFlXNXpJR0Z5WlNCMWJtUmxjbk4wYjI5a0lHRnpJRHhqYjJSbFBuTjBZWFJsUEM5amIyUmxQaUF0SUhObFpWeHVJQ29nVzJwUmRXVnllU05oY21saFUzUmhkR1ZkZTBCc2FXNXJJR1Y0ZEdWeWJtRnNPbXBSZFdWeWVTTmhjbWxoVTNSaGRHVjlJR1p2Y2lCbWRXeHNJR1JsZEdGcGJITWdZWE1nZEdobFhHNGdLaUJoYkdkdmNubDBhRzBnYVhNZ2RHaGxJSE5oYldVdVhHNGdLaUE4WW5JK1BHSnlQbHh1SUNvZ1FtVWdZWGRoY21VZ2RHaHBjeUIwYUdseklHWjFibU4wYVc5dUlIZHBiR3dnYjI1c2VTQnRiMlJwWm5rZ2RHaGxJRzFoZEdOb2FXNW5JR1ZzWlcxbGJuUnpMQ0JwZENCM2FXeHNYRzRnS2lCdWIzUWdZMmhsWTJzZ1lXNTVJSEJoY21WdWRITWdiM0lnYlc5a2FXWjVJR0Z1ZVNCdmRHaGxjaUJsYkdWdFpXNTBjeUIwYUdGMElHTnZkV3hrSUdGbVptVmpkQ0IwYUdWY2JpQXFJR1p2WTNWellXSnBiR2wwZVNCdlppQjBhR1VnWld4bGJXVnVkQzVjYmlBcVhHNGdLaUJBYldWdFltVnliMllnWlhoMFpYSnVZV3c2YWxGMVpYSjVYRzRnS2lCQWFXNXpkR0Z1WTJWY2JpQXFJRUJoYkdsaGN5QWdJQ0JoY21saFJtOWpkWE5oWW14bFhHNGdLaUJBY0dGeVlXMGdJQ0FnZTBGMGRISnBZblYwWlY5RFlXeHNZbUZqYTN4Q2IyOXNaV0Z1ZkU1MWJXSmxjbnhUZEhKcGJtZDlJSE4wWVhSbFhHNGdLaUFnSUNBZ0lDQWdJQ0FnVTNSaGRHVWdkRzhnYzJWMExseHVJQ29nUUhKbGRIVnliaUFnSUh0cVVYVmxjbmw5WEc0Z0tpQWdJQ0FnSUNBZ0lDQWdhbEYxWlhKNUlHOWlhbVZqZENCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUdGbVptVmpkR1ZrSUdWc1pXMWxiblFvY3lrdVhHNGdLbHh1SUNvZ1FHVjRZVzF3YkdVZ1BHTmhjSFJwYjI0K1UyVjBkR2x1WnlCbWIyTjFjMkZpYVd4cGRIazhMMk5oY0hScGIyNCtYRzRnS2lBdkx5Qk5ZWEpyZFhBZ2FYTmNiaUFxSUM4dklEeGthWFlnYVdROVhDSnZibVZjSWo0OEwyUnBkajVjYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0owZDI5Y0lqNDhMMlJwZGo1Y2JpQXFYRzRnS2lBa0tGd2lJMjl1WlZ3aUtTNWhjbWxoUm05amRYTmhZbXhsS0daaGJITmxLVHNnTHk4Z0xUNGdhbEYxWlhKNUtEeGthWFlnYVdROVhDSnZibVZjSWo0cFhHNGdLaUFrS0Z3aUkzUjNiMXdpS1M1aGNtbGhSbTlqZFhOaFlteGxLSFJ5ZFdVcE95QWdMeThnTFQ0Z2FsRjFaWEo1S0R4a2FYWWdhV1E5WENKMGQyOWNJajRwWEc0Z0tseHVJQ29nTHk4Z1RtOTNJRzFoY210MWNDQnBjMXh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJbTl1WlZ3aUlIUmhZbWx1WkdWNFBWd2lNRndpUGp3dlpHbDJQbHh1SUNvZ0x5OGdQR1JwZGlCcFpEMWNJblIzYjF3aUlIUmhZbWx1WkdWNFBWd2lMVEZjSWo0OEwyUnBkajVjYmlBcVhHNGdLaUJBWlhoaGJYQnNaU0E4WTJGd2RHbHZiajVNYVcxcGRHRjBhVzl1Y3lCdlppQjBhR1VnWm5WdVkzUnBiMjQ4TDJOaGNIUnBiMjQrWEc0Z0tpQXZMeUJOWVhKcmRYQWdhWE5jYmlBcUlDOHZJRHhrYVhZZ2FXUTlYQ0p2Ym1WY0lpQjBZV0pwYm1SbGVEMWNJaTB4WENJK1hHNGdLaUF2THlBZ0lDQWdQR1JwZGlCcFpEMWNJblIzYjF3aUlHUnBjMkZpYkdWa1Bqd3ZaR2wyUGx4dUlDb2dMeThnUEM5a2FYWStYRzRnS2x4dUlDb2dKQ2hjSWlOMGQyOWNJaWt1WVhKcFlVWnZZM1Z6WVdKc1pTaDBjblZsS1RzZ0x5OGdMVDRnYWxGMVpYSjVLRHhrYVhZZ2FXUTlYQ0owZDI5Y0lqNHBYRzRnS2x4dUlDb2dMeThnVG05M0lHMWhjbXQxY0NCcGMxeHVJQ29nTHk4Z1BHUnBkaUJwWkQxY0ltOXVaVndpSUhSaFltbHVaR1Y0UFZ3aUxURmNJajVjYmlBcUlDOHZJQ0FnSUNBOFpHbDJJR2xrUFZ3aWRIZHZYQ0lnWkdsellXSnNaV1FnZEdGaWFXNWtaWGc5WENJd1hDSStQQzlrYVhZK1hHNGdLaUF2THlBOEwyUnBkajVjYmlBcUwxeHVKQzVtYmk1aGNtbGhSbTlqZFhOaFlteGxJRDBnWm5WdVkzUnBiMjRnS0hOMFlYUmxLU0I3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1aGRIUnlLRnh1SUNBZ0lDQWdJQ0JjSW5SaFltbHVaR1Y0WENJc1hHNGdJQ0FnSUNBZ0lHaGhibVJzWlhKelcwaEJUa1JNUlZKZlUxUkJWRVZkTG5KbFlXUW9jM1JoZEdVcFhHNGdJQ0FnSUNBZ0lDQWdJQ0EvSURCY2JpQWdJQ0FnSUNBZ0lDQWdJRG9nTFRGY2JpQWdJQ0FwTzF4dVhHNTlPMXh1WEc1OUtHcFJkV1Z5ZVNrcE95SmRMQ0ptYVd4bElqb2lhbkYxWlhKNUxtRnlhV0V1YW5NaWZRPT1cbiJdLCJmaWxlIjoianF1ZXJ5LmFyaWEuanMifQ==

//# sourceMappingURL=jquery.aria.js.map
