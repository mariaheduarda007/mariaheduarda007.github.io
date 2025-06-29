
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        if (has_stop_immediate_propagation)
            modifiers.push('stopImmediatePropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\components\Display.svelte generated by Svelte v3.59.2 */

    const file$1 = "src\\components\\Display.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*display*/ ctx[0]);
    			attr_dev(div, "class", "svelte-1pyriw8");
    			add_location(div, file$1, 4, 0, 51);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*display*/ 1) set_data_dev(t, /*display*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Display', slots, []);
    	let { display = "" } = $$props;
    	const writable_props = ['display'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Display> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('display' in $$props) $$invalidate(0, display = $$props.display);
    	};

    	$$self.$capture_state = () => ({ display });

    	$$self.$inject_state = $$props => {
    		if ('display' in $$props) $$invalidate(0, display = $$props.display);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [display];
    }

    class Display extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { display: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Display",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get display() {
    		throw new Error("<Display>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set display(value) {
    		throw new Error("<Display>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Keyboard.svelte generated by Svelte v3.59.2 */

    const file = "src\\components\\Keyboard.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let button0;
    	let p0;
    	let t1;
    	let button1;
    	let p1;
    	let t3;
    	let button2;
    	let p2;
    	let t5;
    	let button3;
    	let p3;
    	let t7;
    	let button4;
    	let p4;
    	let t9;
    	let button5;
    	let p5;
    	let t11;
    	let button6;
    	let p6;
    	let t13;
    	let button7;
    	let p7;
    	let t15;
    	let button8;
    	let p8;
    	let t17;
    	let button9;
    	let p9;
    	let t19;
    	let button10;
    	let p10;
    	let t21;
    	let button11;
    	let p11;
    	let t23;
    	let button12;
    	let p12;
    	let t25;
    	let button13;
    	let p13;
    	let t27;
    	let button14;
    	let p14;
    	let t29;
    	let button15;
    	let p15;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			p0 = element("p");
    			p0.textContent = "1";
    			t1 = space();
    			button1 = element("button");
    			p1 = element("p");
    			p1.textContent = "2";
    			t3 = space();
    			button2 = element("button");
    			p2 = element("p");
    			p2.textContent = "3";
    			t5 = space();
    			button3 = element("button");
    			p3 = element("p");
    			p3.textContent = "+";
    			t7 = space();
    			button4 = element("button");
    			p4 = element("p");
    			p4.textContent = "4";
    			t9 = space();
    			button5 = element("button");
    			p5 = element("p");
    			p5.textContent = "5";
    			t11 = space();
    			button6 = element("button");
    			p6 = element("p");
    			p6.textContent = "6";
    			t13 = space();
    			button7 = element("button");
    			p7 = element("p");
    			p7.textContent = "-";
    			t15 = space();
    			button8 = element("button");
    			p8 = element("p");
    			p8.textContent = "7";
    			t17 = space();
    			button9 = element("button");
    			p9 = element("p");
    			p9.textContent = "8";
    			t19 = space();
    			button10 = element("button");
    			p10 = element("p");
    			p10.textContent = "9";
    			t21 = space();
    			button11 = element("button");
    			p11 = element("p");
    			p11.textContent = "*";
    			t23 = space();
    			button12 = element("button");
    			p12 = element("p");
    			p12.textContent = "=";
    			t25 = space();
    			button13 = element("button");
    			p13 = element("p");
    			p13.textContent = "0";
    			t27 = space();
    			button14 = element("button");
    			p14 = element("p");
    			p14.textContent = "C";
    			t29 = space();
    			button15 = element("button");
    			p15 = element("p");
    			p15.textContent = "/";
    			add_location(p0, file, 78, 36, 2026);
    			attr_dev(button0, "class", "svelte-gzfw19");
    			add_location(button0, file, 78, 2, 1992);
    			add_location(p1, file, 79, 36, 2081);
    			attr_dev(button1, "class", "svelte-gzfw19");
    			add_location(button1, file, 79, 2, 2047);
    			add_location(p2, file, 80, 36, 2136);
    			attr_dev(button2, "class", "svelte-gzfw19");
    			add_location(button2, file, 80, 2, 2102);
    			add_location(p3, file, 81, 38, 2193);
    			attr_dev(button3, "class", "svelte-gzfw19");
    			add_location(button3, file, 81, 2, 2157);
    			add_location(p4, file, 82, 36, 2248);
    			attr_dev(button4, "class", "svelte-gzfw19");
    			add_location(button4, file, 82, 2, 2214);
    			add_location(p5, file, 83, 36, 2303);
    			attr_dev(button5, "class", "svelte-gzfw19");
    			add_location(button5, file, 83, 2, 2269);
    			add_location(p6, file, 84, 36, 2358);
    			attr_dev(button6, "class", "svelte-gzfw19");
    			add_location(button6, file, 84, 2, 2324);
    			add_location(p7, file, 85, 38, 2415);
    			attr_dev(button7, "class", "svelte-gzfw19");
    			add_location(button7, file, 85, 2, 2379);
    			add_location(p8, file, 86, 36, 2470);
    			attr_dev(button8, "class", "svelte-gzfw19");
    			add_location(button8, file, 86, 2, 2436);
    			add_location(p9, file, 87, 36, 2525);
    			attr_dev(button9, "class", "svelte-gzfw19");
    			add_location(button9, file, 87, 2, 2491);
    			add_location(p10, file, 88, 36, 2580);
    			attr_dev(button10, "class", "svelte-gzfw19");
    			add_location(button10, file, 88, 2, 2546);
    			add_location(p11, file, 89, 38, 2637);
    			attr_dev(button11, "class", "svelte-gzfw19");
    			add_location(button11, file, 89, 2, 2601);
    			add_location(p12, file, 90, 38, 2694);
    			attr_dev(button12, "class", "svelte-gzfw19");
    			add_location(button12, file, 90, 2, 2658);
    			add_location(p13, file, 91, 36, 2749);
    			attr_dev(button13, "class", "svelte-gzfw19");
    			add_location(button13, file, 91, 2, 2715);
    			add_location(p14, file, 92, 38, 2806);
    			attr_dev(button14, "class", "svelte-gzfw19");
    			add_location(button14, file, 92, 2, 2770);
    			add_location(p15, file, 93, 38, 2863);
    			attr_dev(button15, "class", "svelte-gzfw19");
    			add_location(button15, file, 93, 2, 2827);
    			attr_dev(div, "class", "svelte-gzfw19");
    			add_location(div, file, 77, 0, 1983);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(button0, p0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(button1, p1);
    			append_dev(div, t3);
    			append_dev(div, button2);
    			append_dev(button2, p2);
    			append_dev(div, t5);
    			append_dev(div, button3);
    			append_dev(button3, p3);
    			append_dev(div, t7);
    			append_dev(div, button4);
    			append_dev(button4, p4);
    			append_dev(div, t9);
    			append_dev(div, button5);
    			append_dev(button5, p5);
    			append_dev(div, t11);
    			append_dev(div, button6);
    			append_dev(button6, p6);
    			append_dev(div, t13);
    			append_dev(div, button7);
    			append_dev(button7, p7);
    			append_dev(div, t15);
    			append_dev(div, button8);
    			append_dev(button8, p8);
    			append_dev(div, t17);
    			append_dev(div, button9);
    			append_dev(button9, p9);
    			append_dev(div, t19);
    			append_dev(div, button10);
    			append_dev(button10, p10);
    			append_dev(div, t21);
    			append_dev(div, button11);
    			append_dev(button11, p11);
    			append_dev(div, t23);
    			append_dev(div, button12);
    			append_dev(button12, p12);
    			append_dev(div, t25);
    			append_dev(div, button13);
    			append_dev(button13, p13);
    			append_dev(div, t27);
    			append_dev(div, button14);
    			append_dev(button14, p14);
    			append_dev(div, t29);
    			append_dev(div, button15);
    			append_dev(button15, p15);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[2], false, false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[3], false, false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[4], false, false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[5], false, false, false, false),
    					listen_dev(button4, "click", /*click_handler_4*/ ctx[6], false, false, false, false),
    					listen_dev(button5, "click", /*click_handler_5*/ ctx[7], false, false, false, false),
    					listen_dev(button6, "click", /*click_handler_6*/ ctx[8], false, false, false, false),
    					listen_dev(button7, "click", /*click_handler_7*/ ctx[9], false, false, false, false),
    					listen_dev(button8, "click", /*click_handler_8*/ ctx[10], false, false, false, false),
    					listen_dev(button9, "click", /*click_handler_9*/ ctx[11], false, false, false, false),
    					listen_dev(button10, "click", /*click_handler_10*/ ctx[12], false, false, false, false),
    					listen_dev(button11, "click", /*click_handler_11*/ ctx[13], false, false, false, false),
    					listen_dev(button12, "click", /*click_handler_12*/ ctx[14], false, false, false, false),
    					listen_dev(button13, "click", /*click_handler_13*/ ctx[15], false, false, false, false),
    					listen_dev(button14, "click", /*click_handler_14*/ ctx[16], false, false, false, false),
    					listen_dev(button15, "click", /*click_handler_15*/ ctx[17], false, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Keyboard', slots, []);
    	let { display = "" } = $$props;
    	let opArray = [];
    	let cleanForm = false;
    	let init = true;
    	const isNumber = value => !isNaN(Number(value));
    	const sumOp = (a, b) => Number(a) + Number(b);
    	const subtractOp = (a, b) => Number(a) - Number(b);
    	const divideOp = (a, b) => Number(a) / Number(b);
    	const multiplyOp = (a, b) => Number(a) * Number(b);

    	function digit(d) {
    		if (init) {
    			$$invalidate(1, display = "");
    		}

    		init = false;

    		if (isNumber(d)) {
    			if (cleanForm) {
    				$$invalidate(1, display = d);
    				cleanForm = false;
    			} else {
    				$$invalidate(1, display += d.toString());
    			}
    		} else if (d === "C") {
    			opArray.length = 0;
    			$$invalidate(1, display = "0");
    			init = true;
    		} else if (d === "=") {
    			opArray.push(display);
    			calculate();
    			$$invalidate(1, display = opArray[0]);
    			opArray.length = 0;
    		} else if (!isNumber(d)) {
    			if (!cleanForm) {
    				opArray.push(display);
    			}

    			if (!isNumber(opArray[opArray.length - 1])) {
    				opArray.pop();
    			}

    			cleanForm = true;
    			$$invalidate(1, display = d);
    			opArray.push(display);
    		}
    	}

    	function calculate() {
    		while (opArray.length > 1) {
    			for (let i = 0; i < opArray.length; i++) {
    				if (opArray[i] == "*") {
    					opArray[i - 1] = multiplyOp(opArray[i - 1], opArray[i + 1]);
    					opArray.splice(i, 2);
    					i--;
    				} else if (opArray[i] == "/") {
    					opArray[i - 1] = divideOp(opArray[i - 1], opArray[i + 1]);
    					opArray.splice(i, 2);
    					i--;
    				}
    			}

    			for (let i = 0; i < opArray.length; i++) {
    				if (opArray[i] == "+") {
    					opArray[i - 1] = sumOp(opArray[i - 1], opArray[i + 1]);
    					opArray.splice(i, 2);
    					i--;
    				} else if (opArray[i] == "-") {
    					opArray[i - 1] = subtractOp(opArray[i - 1], opArray[i + 1]);
    					opArray.splice(i, 2);
    					i--;
    				}
    			}
    		}
    	}

    	const writable_props = ['display'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Keyboard> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => digit(1);
    	const click_handler_1 = () => digit(2);
    	const click_handler_2 = () => digit(3);
    	const click_handler_3 = () => digit("+");
    	const click_handler_4 = () => digit(4);
    	const click_handler_5 = () => digit(5);
    	const click_handler_6 = () => digit(6);
    	const click_handler_7 = () => digit("-");
    	const click_handler_8 = () => digit(7);
    	const click_handler_9 = () => digit(8);
    	const click_handler_10 = () => digit(9);
    	const click_handler_11 = () => digit("*");
    	const click_handler_12 = () => digit("=");
    	const click_handler_13 = () => digit(0);
    	const click_handler_14 = () => digit("C");
    	const click_handler_15 = () => digit("/");

    	$$self.$$set = $$props => {
    		if ('display' in $$props) $$invalidate(1, display = $$props.display);
    	};

    	$$self.$capture_state = () => ({
    		display,
    		opArray,
    		cleanForm,
    		init,
    		isNumber,
    		sumOp,
    		subtractOp,
    		divideOp,
    		multiplyOp,
    		digit,
    		calculate
    	});

    	$$self.$inject_state = $$props => {
    		if ('display' in $$props) $$invalidate(1, display = $$props.display);
    		if ('opArray' in $$props) opArray = $$props.opArray;
    		if ('cleanForm' in $$props) cleanForm = $$props.cleanForm;
    		if ('init' in $$props) init = $$props.init;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		digit,
    		display,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		click_handler_7,
    		click_handler_8,
    		click_handler_9,
    		click_handler_10,
    		click_handler_11,
    		click_handler_12,
    		click_handler_13,
    		click_handler_14,
    		click_handler_15
    	];
    }

    class Keyboard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { display: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Keyboard",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get display() {
    		throw new Error("<Keyboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set display(value) {
    		throw new Error("<Keyboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */

    function create_fragment(ctx) {
    	let display;
    	let updating_display;
    	let t;
    	let keyboard;
    	let updating_display_1;
    	let current;

    	function display_display_binding(value) {
    		/*display_display_binding*/ ctx[1](value);
    	}

    	let display_props = {};

    	if (/*name*/ ctx[0] !== void 0) {
    		display_props.display = /*name*/ ctx[0];
    	}

    	display = new Display({ props: display_props, $$inline: true });
    	binding_callbacks.push(() => bind(display, 'display', display_display_binding));

    	function keyboard_display_binding(value) {
    		/*keyboard_display_binding*/ ctx[2](value);
    	}

    	let keyboard_props = {};

    	if (/*name*/ ctx[0] !== void 0) {
    		keyboard_props.display = /*name*/ ctx[0];
    	}

    	keyboard = new Keyboard({ props: keyboard_props, $$inline: true });
    	binding_callbacks.push(() => bind(keyboard, 'display', keyboard_display_binding));

    	const block = {
    		c: function create() {
    			create_component(display.$$.fragment);
    			t = space();
    			create_component(keyboard.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(display, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(keyboard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const display_changes = {};

    			if (!updating_display && dirty & /*name*/ 1) {
    				updating_display = true;
    				display_changes.display = /*name*/ ctx[0];
    				add_flush_callback(() => updating_display = false);
    			}

    			display.$set(display_changes);
    			const keyboard_changes = {};

    			if (!updating_display_1 && dirty & /*name*/ 1) {
    				updating_display_1 = true;
    				keyboard_changes.display = /*name*/ ctx[0];
    				add_flush_callback(() => updating_display_1 = false);
    			}

    			keyboard.$set(keyboard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(display.$$.fragment, local);
    			transition_in(keyboard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(display.$$.fragment, local);
    			transition_out(keyboard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(display, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(keyboard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let name = "0";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function display_display_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	function keyboard_display_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	$$self.$capture_state = () => ({ Display, Keyboard, name });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, display_display_binding, keyboard_display_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
