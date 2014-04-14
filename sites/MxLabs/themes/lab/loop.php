							<?php if (have_posts()): while (have_posts()) : the_post(); ?>
								<article id="post-<?php the_ID(); ?>" <?php post_class('ibm-columns'); ?>>
									<div class="ibm-col-1-1">											
										<!-- post title -->
						                <h1>
						                    <!-- <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a> -->
						                    <?php the_title(); ?>
						                </h1>
						                <!-- /post title -->

						                <!-- post details -->
						                <h4 class="post-details">
						                    By <span class="author"><?php the_author(); ?></span> on <span class="date"><?php the_time('F j, Y'); ?></span>
						                </h4>
						                <!-- /post details -->

						                <!-- post thumbnail -->
						                <?php if ( has_post_thumbnail()) : // Check if thumbnail exists ?>
						                    <!-- <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"> -->
						                        <?php the_post_thumbnail(array(940,529)); // Declare pixel size you need inside the array ?>
						                    <!-- </a> -->
						                <?php endif; ?>
						                <!-- /post thumbnail -->

						                <?php the_content(); ?>
									</div>
								</article>								
							<?php endwhile; ?>

							<?php else: ?>
								<!-- article -->
								<article>
									<h2><?php _e( 'Sorry, nothing to display.' ); ?></h2>
								</article>
								<!-- /article -->
							<?php endif; ?>