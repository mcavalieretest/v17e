!function(e,t){describe("IBM.Common.Widgets.Carousel",function(){var n=t.Common.Widgets.Carousel,o;beforeEach(function(){e(document.body).append('<div id="carousel-1"></div>'),o=new n(e("#carousel-1"),{init:!1})}),afterEach(function(){e("#carousel-1").remove(),o=null}),it("should not be null",function(){expect(o).not.toBeNull()}),describe("constructor",function(){it("should save slide data",function(){e(document.body).append('<div id="constructor-carousel"></div>');var t=new n(e("#constructor-carousel"),{init:!1,slides:[{items:[{content:"foo"},{content:"bar"},{content:"baz"}]}]});expect(t.data).not.toBeUndefined(),expect(t.data.slides).not.toBeUndefined(),expect(t.data.slides[0].items).not.toBeUndefined(),e("#constructor-carousel").remove()})}),describe("slide / item methods",function(){var o,i,a;beforeEach(function(){e(document.body).append('<div id="si-methods-1"></div>'),e(document.body).append('<div id="si-methods-2"></div>'),e(document.body).append('<div id="si-methods-3"></div>'),o=new n(e("#si-methods-1"),{init:!1,slides:[{items:[{content:"foo"}]}]}),i=new n(e("#si-methods-2"),{init:!1,slides:[{items:[{content:"foo"}]},{items:[{content:"foo"},{content:"foo"}]}]}),a=new n(e("#si-methods-3"),{init:!1,slides:[{items:[{content:"foo"}]},{items:[{content:"foo"},{content:"foo"}]},{items:[{content:"foo"},{content:"foo"},{content:"foo"}]}]})}),afterEach(function(){e("#si-methods-1").remove(),e("#si-methods-2").remove(),e("#si-methods-3").remove()}),describe("lastSlideIndex()",function(){it("should return null if there are no slides"),it("should return an accurate index",function(){expect(o.lastSlideIndex()).toEqual(0),expect(i.lastSlideIndex()).toEqual(1),expect(a.lastSlideIndex()).toEqual(2)})}),describe("addItem()",function(){beforeEach(function(){expect(a.data.slides.length).toEqual(3),expect(a.data.slides[0].items.length).toEqual(1),expect(a.data.slides[1].items.length).toEqual(2),expect(a.data.slides[2].items.length).toEqual(3)}),afterEach(function(){expect(a.data.slides.length).toEqual(3)}),it("should add an item to the first slide",function(){a.addItem({content:"foo"},0),expect(a.data.slides[0].items.length).toEqual(2),expect(a.data.slides[1].items.length).toEqual(2),expect(a.data.slides[2].items.length).toEqual(3)}),it("should add an item to the third slide",function(){a.addItem({content:"foo"},2),expect(a.data.slides[0].items.length).toEqual(1),expect(a.data.slides[1].items.length).toEqual(2),expect(a.data.slides[2].items.length).toEqual(4)})}),describe("addItems()",function(){it("should add 1 item to the 2nd slide",function(){var e=a.data.slides[1].items.length;a.addItems([{content:"foo"}],1),expect(a.data.slides[1].items.length).toEqual(e+1)}),it("should add 4 items to the 3rd slide",function(){var e=a.data.slides[2].items.length;a.addItems([{content:"foo"},{content:"foo"},{content:"foo"},{content:"foo"}],2),expect(a.data.slides[2].items.length).toEqual(e+4)})}),describe("addItemsSequentially()",function(){beforeEach(function(){e(document.body).append('<div id="carousel-sequence"></div>')}),afterEach(function(){e("#carousel-sequence").remove()}),it("should add items in sequence",function(){for(var n=new t.Common.Widgets.Carousel(e("#carousel-sequence"),{init:!1,columns:3}),o=1;15>=o;o++){var i={content:"<h2>dyn item "+o+"</h2><p>Dynamic item item item item item </p>"};n.addItemSequentially(i);var a=e.map(n.data.slides,function(e,t){return e.items}).length;expect(a).toEqual(o)}n.init(),expect(n.element.find(".ibm-columns").children().length).toEqual(15)}),it("should raise an error if columns is not specified",function(){var n=new t.Common.Widgets.Carousel(e("#carousel-sequence"),{init:!1});expect(function(){n.addItemSequentially({content:"foo"})}).toThrow()})}),describe("addSlide()",function(){it("should add one slide",function(){var e=a.data.slides.length;a.addSlide({items:[{content:"foo"}]}),expect(a.data.slides.length).toEqual(e+1)})}),describe("addSlides()",function(){it("should add one slide",function(){var e=a.data.slides.length;a.addSlides([{items:[{content:"foo"}]}]),expect(a.data.slides.length).toEqual(e+1)}),it("should add 3 slides",function(){var e=a.data.slides.length;a.addSlides([{items:[{content:"foo"}]},{items:[{content:"foo"}]},{items:[{content:"foo"}]}]),expect(a.data.slides.length).toEqual(e+3)})})}),describe("buildHtml",function(){var t;beforeEach(function(){e(document.body).append('<div id="buildhtml-carousel"></div>'),t=new n(e("#buildhtml-carousel"),{init:!1})}),afterEach(function(){e("#buildhtml-carousel").remove(),t=null}),it("should create one slide",function(){t.addSlide({items:[{content:"aaaaa"},{content:"bbbbb"},{content:"ccccc"}]}),t.buildHtml(),expect(t.element.find(".ibm-columns").length).toEqual(1)}),it("should create a single slide",function(){t.addSlide({items:[{content:"aaaaa"},{content:"bbbbb"},{content:"ccccc"}]}),t.buildHtml(),expect(t.element.find(".ibm-columns").length).toEqual(1)}),it("should create 3 slides",function(){t.addSlides([{items:[{content:"aaaaa"}]},{items:[{content:"aaaaa"}]},{items:[{content:"aaaaa"}]}]),t.buildHtml(),expect(t.element.find(".ibm-columns").length).toEqual(3)}),it("should apply the proper layout classes",function(){t.addSlides([{items:[{content:"aaaaa"}]},{items:[{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"}]},{items:[{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"}]},{items:[{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"},{content:"aaaaa"}]}]),t.buildHtml();var e=t.element.find(".ibm-columns");expect(e.eq(0).find(".ibm-col-1-1").length).toEqual(1),expect(e.eq(1).find(".ibm-col-6-2").length).toEqual(3),expect(e.eq(2).find(".ibm-col-5-1").length).toEqual(5),expect(e.eq(3).find(".ibm-col-6-1").length).toEqual(6)})}),describe("Slide navigation",function(){describe("prev()",function(){}),describe("next()",function(){}),describe("goToSlide()",function(){})}),describe("Transition methods",function(){var t,o,i="ibm-carousel-css-transitions";beforeEach(function(){e(document.body).append('<div id="carousel_with_class" class="'+i+'"></div>'),t=new n(e("#carousel_with_class"),{init:!1,slides:[{items:[{content:"foo"}]}]}),t.init()}),afterEach(function(){e("#carousel_with_class").remove(),e("#carousel_without_class").remove()}),describe("toggleTransitions",function(){it("should add the transition class",function(){expect(t.element.hasClass(i)).toBe(!0),t.toggleTransitions(!0),expect(t.element.hasClass(i)).toBe(!0)}),it("should remove the transition class",function(){expect(t.element.hasClass(i)).toBe(!0),t.toggleTransitions(!1),expect(t.element.hasClass(i)).toBe(!1)}),it("should toggle the transition class",function(){expect(t.element.hasClass(i)).toBe(!0),t.toggleTransitions(),expect(t.element.hasClass(i)).toBe(!1),t.toggleTransitions(),expect(t.element.hasClass(i)).toBe(!0)})}),describe("transitionsEnabled",function(){it("should return true if transition class is present",function(){expect(t.transitionsEnabled()).toBe(!0)}),it("should return false otherwise",function(){t.toggleTransitions(!1),expect(t.transitionsEnabled()).toBe(!1)})})})})}(jQuery,CHICKENFEED);