							<?php $articleCount = 0; ?>
							<?php if (have_posts()): while (have_posts()) : the_post(); ?>
								<?php $articleCount += 1; ?>
									<?php if($articleCount == 3){ ?>
									</section>
									<?php get_template_part('sidebar'); ?>
									</div>
									
									<div class="ibm-band" id="mxl-img-band"><div class="ibm-columns"></div></div>
									<div class="ibm-columns">
									<section class="ibm-col-6-4 large">
								<?php } ?>
								<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?>>
									<!-- post title -->
					                <h1>
					                    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
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

								                    <?php //get caption text for first feature image
								                    	$thumb_id = get_post_thumbnail_id(get_the_ID());
														$args = array(
															'p' => $thumb_id,
															'post_type' => 'attachment'
															);
														$thumb_images = get_posts($args);
														foreach ($thumb_images as $thumb_image) {
															$caption = $thumb_image->post_excerpt;

															if(!empty($caption)){
																echo "<span class='caption'>{$caption}</span>";
														  	} 
														 }
								                    ?>
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
                                                        $caption = $dynamic_featured_image -> get_image_caption( $fullImage );
# REMOVE LINK FROM IMAGES
#                                                        $links[] = "<a href='{$fullImage}'><img src='{$fullImage}' alt='' height='{$height}' width='{$width}' class='wp-post-image' /></a>";
                                                        
                                                        #$links[] = "<img src='{$fullImage}' alt='' height='{$height}' width='{$width}' class='wp-post-image' />";
                                                    	echo "<div>";
                                                    	echo "<img src='{$fullImage}' alt='' height='{$height}' width='{$width}' class='wp-post-image' />";
                                                    	
                                                    	if(!empty($caption)){
															echo "<span class='caption'>{$caption}</span>";
													  	} 
                                                    	echo "</div>";

                                                    }

                                          
                                                 }
                                            }                                           
                                        ?>						                
					                </div>					                
					                <!-- /post slider -->
					                <?php the_content(); ?>
								</article>								
							<?php endwhile; ?>

							<?php else: ?>
								<!-- article -->
								<article>
									<h2><?php _e( 'Sorry, nothing to display.' ); ?></h2>
								</article>
								<!-- /article -->
							<?php endif; ?>