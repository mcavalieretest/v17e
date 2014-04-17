            <?php get_header(); ?>

            <!--! LEADSPACE_BEGIN -->
            <section id="ibm-access-cntr" role="main">                
                <div id="ibm-leadspace-head" class="ibm-container ibm-alternate-background ibm-ribbon">
                    <header>
                        <h1 class="mxlabs"><span>IBM</span> MxLabs</h1>
                    </header>
                    <div id="ibm-leadspace-body" class="ibm-container-body">
                        <div class="ibm-columns" id="ibm-lead-1">
                            <div class="ibm-col-1-1">                                
                                <div class="ibm-col-6-3 feature-box">
                                    <h2 class="section-header">Welcome to the IBM Marketing Experience Labs</h2>
                                    <p><span style="opacity: 1">We&rsquo;re here to share our experiences with you—the successes, the failures, and the lessons we learn along the way.</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="ibm-columns" id="ibm-lead-2">
                            <div class="ibm-col-1-1">
                                <div class="ibm-col-6-3 feature-box">
                                    <h2 class="section-header">Moving in with Watson</h2>
                                    <p><span style="opacity: 1">As a monolith a little out of its comfort zone, it’s hard not to feel a kind of kinship with 51 Astor Place.</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="ibm-columns" id="ibm-lead-3">
                            <div class="ibm-col-1-1">
                                <div class="ibm-col-6-3 feature-box">
                                    <h2 class="section-header">Building a Lab in Tokyo</h2>
                                    <p><span style="opacity: 1">At the Marketing Experience Labs in NYC, we are used to a little bit of chaos accompanying new things.</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- LEADSPACE_END -->
            
            <!-- CONTENT_BEGIN -->
            <section id="ibm-pcon">                
                <div id="ibm-content">
                    <!-- CONTENT_BODY -->
                    <div id="ibm-content-body">
                        <div id="ibm-content-main">
                            <div class="ibm-columns">
                                <section class="ibm-col-6-4">
                                    <?php get_template_part('loop'); ?>
                                    <?php get_template_part('pagination'); ?>
                                </section>                                
                                <?php get_template_part('sidebar'); ?>
                            </div>
                        </div>
                    </div>
                    <!-- CONTENT_BODY_END -->
                </div>                
                
                <!-- NAVIGATION_BEGIN -->
                <nav id="ibm-navigation"></nav>
                <!-- NAVIGATION_END -->
            </section>
            <!-- CONTENT_END -->

            <?php get_footer(); ?>