							<?php if (have_posts()): while (have_posts()) : the_post(); ?>
								<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?>>
									<!-- post title -->
					                <h1>
					                    <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>					                    
					                </h1>
					                <!-- /post title -->

					                <!-- post details -->
					                <h4 class="post-details">
					                    By <span class="author"><?php the_author(); ?></span> on <span class="date"><?php the_time('F j, Y'); ?></span>
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
								</article>								
							<?php endwhile; ?>

							<?php else: ?>
								<!-- article -->
								<article>
									<h2><?php _e( 'Sorry, nothing to display.' ); ?></h2>
								</article>
								<!-- /article -->
							<?php endif; ?>