<?php get_header(); ?>

	       <div id="ibm-access-cntr" role="main">
                <!-- <div id="ibm-leadspace-head" class="ibm-container ibm-ribbon"> -->
                <div id="ibm-leadspace-head" class="ibm-container"></div>

                <div id="ibm-pcon">
                    <!-- CONTENT_BEGIN -->
                    <?php $back =$_SERVER['HTTP_REFERER'];
                        if(isset($back) && $back !='') echo "<a class='back_btn' href='{$back}'><i class='step ibm-a-back-link size-48'></i><span>Back</span></a>";
                    ?>
                    <div id="ibm-content">
                        <!-- CONTENT_BODY -->
                        <div id="ibm-content-body">
                            <section id="ibm-content-main">
                                
								<?php if (have_posts()): while (have_posts()) : the_post(); ?>

								<!-- article -->
								<article id="post-<?php the_ID(); ?>" <?php post_class('ibm-columns'); ?>>
								<div class="ibm-col-1-1 large">
								
								
                                    <!-- post title -->
                                    <h1>
                                        <!-- <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a> -->
                                        <?php the_title(); ?>
                                    </h1>
                                    <!-- /post title -->

                                    <!-- post details -->
                                   <h4 class="post-details subtext">
                                    <?php
                                        echo get_post_meta( get_the_ID(), 'subtext', true ); 
                                    ?>
                                        <!-- By <span class="author"><?php the_author(); ?></span> on <span class="date"><?php the_time('F j, Y'); ?></span> -->
                                    </h4>
                                    <!-- /post details -->

                                    <!-- post slider -->
                                    <div class="slider post-slider">
                                        
                                        <?php 
                                            if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
                                                <div>
                                                    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                                                        <?php the_post_thumbnail(array(940,529)); // Declare pixel size you need inside the array ?>
                                                    </a>
                                                </div>
                                        <?php 
                                            endif;
                                        ?>                                  
                                        
                                        <?php 
                                            if( class_exists('Dynamic_Featured_Image') ) {
                                                 global $dynamic_featured_image;
                                                 $featuredImages = $dynamic_featured_image->get_featured_images( $postId );

                                               //Loop through the image to display your image

                                               if( !is_null($featuredImages) ){

                                                    $links = array();

                                                    foreach($featuredImages as $images){
                                                        $thumb = $images['thumb'];
                                                        $fullImage = $images['full'];

# REMOVE LINK FROM IMAGES
#                                                        $links[] = "<a href='{$fullImage}'><img src='{$fullImage}' alt='' height='{$height}' width='{$width}' class='wp-post-image' /></a>";

														$links[] = "<img src='{$fullImage}' alt='' height='{$height}' width='{$width}' class='wp-post-image' />";
                                                    }

                                                    foreach($links as $link){
                                                        echo "<div>";
                                                        echo $link;
                                                        echo "</div>";
                                                    }                                                       
                                                 }
                                            }                                           
                                        ?>                                      
                                    </div>                                  
                                    <!-- /post slider -->
                                    <?php the_content(); ?>
								</div>
                                </article>      
								<!-- /article -->
								<?php endwhile; ?>

								<?php else: ?>

									<!-- article -->
									<article>

										<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

									</article>
									<!-- /article -->

								<?php endif; ?>

								</section>
                        </div>
                        <!-- CONTENT_BODY_END -->
                    </div>
                    <!-- CONTENT_END -->
                </div>
            </div>
<?php get_footer(); ?>
