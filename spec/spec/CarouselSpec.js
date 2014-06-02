(function($, IBM){
  // jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

  describe("IBM.Common.Widgets.Carousel", function() {
    var Carousel = IBM.Common.Widgets.Carousel,
        carousel;

    beforeEach(function() {
      $(document.body).append('<div id="carousel-1"></div>');
      carousel = new Carousel($("#carousel-1"), {init: false});
    });

    afterEach(function() {
      $("#carousel-1").remove();

      carousel = null;
    })

    it("should not be null", function() {
      expect(carousel).not.toBeNull();
    });

    describe("constructor", function() {
      it("should save slide data", function() {
        $(document.body).append('<div id="constructor-carousel"></div>');

        var c1 = new Carousel($("#constructor-carousel"), {
          init: false, 
          slides: [
            {
              items: [
                {content: "foo"},
                {content: "bar"},
                {content: "baz"}
              ]
            }
          ]
        });

        expect(c1.data).not.toBeUndefined();
        expect(c1.data.slides).not.toBeUndefined();
        expect(c1.data.slides[0].items).not.toBeUndefined();

        $("#constructor-carousel").remove();        
      });
    });

    describe("slide / item methods", function() {
      var c1, c2, c3;

      beforeEach(function() {
        $(document.body).append('<div id="si-methods-1"></div>');
        $(document.body).append('<div id="si-methods-2"></div>');
        $(document.body).append('<div id="si-methods-3"></div>');

          c1 = new Carousel($("#si-methods-1"), {
            init: false, 
            slides: [
              {items: [{content: "foo"}]}
            ]
          });
          c2 = new Carousel($("#si-methods-2"), {
            init: false, 
            slides: [            
              {items: [{content: "foo"}]},
              {items: [{content: "foo"}, {content: "foo"}]}
            ],
          });
          c3 = new Carousel($("#si-methods-3"), {
            init: false, 
            slides: [            
              {items: [{content: "foo"}]},
              {items: [{content: "foo"}, {content: "foo"}]},
              {items: [{content: "foo"}, {content: "foo"}, {content: "foo"}]}
            ]
          });
      });

      afterEach(function() {
        $("#si-methods-1").remove();
        $("#si-methods-2").remove();
        $("#si-methods-3").remove();
      });


      describe("lastSlideIndex()", function() {
        it("should return null if there are no slides")
        it("should return an accurate index", function() {
          expect(c1.lastSlideIndex()).toEqual(0);
          expect(c2.lastSlideIndex()).toEqual(1);
          expect(c3.lastSlideIndex()).toEqual(2);
        });
      });

      describe("addItem()", function() {
        beforeEach(function() {
          expect(c3.data.slides.length).toEqual(3);
          expect(c3.data.slides[0].items.length).toEqual(1);
          expect(c3.data.slides[1].items.length).toEqual(2);
          expect(c3.data.slides[2].items.length).toEqual(3);
        });

        afterEach(function() {
          expect(c3.data.slides.length).toEqual(3);
        });

        it("should add an item to the first slide", function() {
          c3.addItem({content: "foo"}, 0);
          
          expect(c3.data.slides[0].items.length).toEqual(2);
          expect(c3.data.slides[1].items.length).toEqual(2);
          expect(c3.data.slides[2].items.length).toEqual(3);
        });

        it("should add an item to the third slide", function() {
          c3.addItem({content: "foo"}, 2);

          expect(c3.data.slides[0].items.length).toEqual(1);
          expect(c3.data.slides[1].items.length).toEqual(2);
          expect(c3.data.slides[2].items.length).toEqual(4);
        });
      });

      describe("addItems()", function() {
        it("should add 1 item to the 2nd slide", function() {
          var l = c3.data.slides[1].items.length

          c3.addItems([
            {content: "foo"}
          ], 1);

          expect(c3.data.slides[1].items.length).toEqual(l+1);
        });

        it("should add 4 items to the 3rd slide", function() {
          var l = c3.data.slides[2].items.length

          c3.addItems([
            {content: "foo"},
            {content: "foo"},
            {content: "foo"},
            {content: "foo"}
          ], 2);                    

          expect(c3.data.slides[2].items.length).toEqual(l+4);
        });
      });

      describe("addItemsSequentially()", function() {
        beforeEach(function() {
          $(document.body).append('<div id="carousel-sequence"></div>');
        });

        afterEach(function() {
          $("#carousel-sequence").remove();
        });

        it("should add items in sequence", function() {
          var cseq = new IBM.Common.Widgets.Carousel($("#carousel-sequence"), {
            init: false,
            columns: 3
          });

          for( var i=1; i<= 15; i++ ) {
            var item = {content:"<h2>dyn item " + i + "</h2><p>Dynamic item item item item item </p>"};

            cseq.addItemSequentially(item);

            var numItems = $.map(cseq.data.slides, function(el, i) { return el.items; }).length;

            expect(numItems).toEqual(i);
          }

          cseq.init();

          expect(cseq.element.find(".ibm-columns").children().length).toEqual(15);
        });

        it("should raise an error if columns is not specified", function() {
          var cseq = new IBM.Common.Widgets.Carousel($("#carousel-sequence"), {
            init: false
          });          
          
          expect( function(){ 
            cseq.addItemSequentially({content: "foo"}); 
          } ).toThrow();
        });
      });

      describe("addSlide()", function() {
        it("should add one slide", function() {
          var l = c3.data.slides.length;

          c3.addSlide({items: [{content: "foo"}]});
          
          expect(c3.data.slides.length).toEqual(l+1);
        });
      });

      describe("addSlides()", function() {
        it("should add one slide", function() {
          var l = c3.data.slides.length;

          c3.addSlides([
            { items: [{content: "foo"}] }
          ]);
          
          expect(c3.data.slides.length).toEqual(l+1);
        });

        it("should add 3 slides", function() {
          var l = c3.data.slides.length;

          c3.addSlides([
            { items: [{content: "foo"}] },
            { items: [{content: "foo"}] },
            { items: [{content: "foo"}] }
          ]);
          
          expect(c3.data.slides.length).toEqual(l+3);
        });
      });
    });

    describe("buildHtml", function() {
      var c1;

      beforeEach(function() {
        $(document.body).append('<div id="buildhtml-carousel"></div>');

        c1 = new Carousel($("#buildhtml-carousel"), {init: false});
      });

      afterEach(function() {
        $("#buildhtml-carousel").remove();
        c1 = null;
      });

      it("should create one slide", function() {
        c1.addSlide({
          items: [
            {content: "aaaaa"},
            {content: "bbbbb"},
            {content: "ccccc"}
          ]
        });

        c1.buildHtml();

        expect(c1.element.find(".ibm-columns").length).toEqual(1);
      });

      it("should create a single slide", function() {
        c1.addSlide({
          items: [
            {content: "aaaaa"},
            {content: "bbbbb"},
            {content: "ccccc"}
          ]
        });

        c1.buildHtml();

        expect(c1.element.find(".ibm-columns").length).toEqual(1);
      });

      it("should create 3 slides", function() {
        c1.addSlides([
          {items: [{content: "aaaaa"}]},
          {items: [{content: "aaaaa"}]},
          {items: [{content: "aaaaa"}]}
        ]);

        c1.buildHtml();

        expect(c1.element.find(".ibm-columns").length).toEqual(3);
      });

      it("should apply the proper layout classes", function() {
        c1.addSlides([
          {items: [{content: "aaaaa"}]},
          {items: [{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"}]},
          {items: [{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"}]},
          {items: [{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"},{content: "aaaaa"}]}
        ]);

        c1.buildHtml();

        var slides = c1.element.find(".ibm-columns");

        expect(slides.eq(0).find(".ibm-col-1-1").length).toEqual(1);
        expect(slides.eq(1).find(".ibm-col-6-2").length).toEqual(3);
        expect(slides.eq(2).find(".ibm-col-5-1").length).toEqual(5);
        expect(slides.eq(3).find(".ibm-col-6-1").length).toEqual(6);
      });
    });

    describe("Slide navigation", function() {
      describe("prev()", function() {

      });
      describe("next()", function() {
        
      });
      describe("goToSlide()", function() {
        
      });
    });

    describe("Transition methods", function() {
      var carousel_with_class,
          carousel_without_class,
          transitionClass = "ibm-carousel-css-transitions";

      beforeEach(function() {
        $(document.body).append('<div id="carousel_with_class" class="'+transitionClass+'"></div>');

        carousel_with_class = new Carousel($("#carousel_with_class"), {
          init: false, 
          slides: [{items: [{content: "foo"}]}]
        });
        carousel_with_class.init();
      });

      afterEach(function() {
        $("#carousel_with_class").remove();
        $("#carousel_without_class").remove();
      });

      describe("toggleTransitions", function() {
        it("should add the transition class", function() {
          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(true);

          carousel_with_class.toggleTransitions(true);

          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(true);
        });

        it("should remove the transition class", function() {
          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(true);

          carousel_with_class.toggleTransitions(false);

          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(false);
        });

        it("should toggle the transition class", function() {
          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(true);

          carousel_with_class.toggleTransitions();

          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(false);

          carousel_with_class.toggleTransitions();

          expect(carousel_with_class.element.hasClass(transitionClass)).toBe(true);
        });
      });

      describe("transitionsEnabled", function() {
        it ("should return true if transition class is present", function() {
          expect(carousel_with_class.transitionsEnabled()).toBe(true);
        });

        it ("should return false otherwise", function() {
          carousel_with_class.toggleTransitions(false);
          expect(carousel_with_class.transitionsEnabled()).toBe(false);
        });
      });

    });




  });
})(jQuery, CHICKENFEED);