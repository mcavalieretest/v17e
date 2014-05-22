
<?php get_template_part('header_nofollow'); ?>
<section id="ibm-playbook" role="main">  

	<div id="ibm-leadspace-head" class="ibm-container ibm-alternate-background ibm-ribbon">
		<?php if (have_posts()): while (have_posts()) : the_post(); ?>
			<?php 
			if ( has_post_thumbnail()) : // Check if thumbnail exists 
				$url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
			?>

			<div class="hero_img" style="background-image:url(<?php echo $url ?>)">
				<span><?php echo get_post(get_post_thumbnail_id())->post_excerpt; ?></span>
				<a href="#page-brief" class="arrow"></a>
			</div>

		
			<?php 
			endif;
			?>
	</div>

	<!-- CONTENT_BEGIN -->
		<section id="ibm-pcon">                
		<div id="ibm-content">
		    <!-- CONTENT_BODY -->
		    <div id="ibm-content-body">
		        <div id="ibm-content-main">
		        	 <!-- CONTENT_PAGEBRIEFT_START -->
		        	<div id="page-brief" class="ibm-band page-brief">
			            <div class="ibm-columns">
			                <section class="ibm-col-1-1 large">
			                    <?php the_content(); ?>
			                    <a href="#posters" class="arrow black"></a>
			                </section>
			            </div>
			        </div>
			        <!-- CONTENT_PAGEBRIEFT_END -->

			        <!-- CONTENT_POSTERS_START -->
			        <div id="posters" class="ibm-band posters">
				        <div class="ibm-columns">
			                <section class="ibm-col-1-1">
			                	<h2>Posters</h2>
			                	<p>Informative visualizations of our working methods</p>
			                	<ul>
			                    <?php 
									if( class_exists('Dynamic_Featured_Image') ) {
									     global $dynamic_featured_image;
									     $featuredImages = $dynamic_featured_image->get_featured_images( $postId );

									    //Loop through the image to display your image

									    if( !is_null($featuredImages) ){

									        $links = array();
									        $count = 0;

									        foreach($featuredImages as $images){
									            $thumb = $images['thumb'];
									            $fullImage = $images['full'];
									            $title = $dynamic_featured_image -> get_image_title( $fullImage ); 
									           	$caption = $dynamic_featured_image -> get_image_caption( $fullImage );
									           	$filetype = substr($caption, -4, 4);

									           	if( $count < 4){
													echo "<li><div class='poster'>";
										           	echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' target='_blank'><div style='background-image:url({$fullImage})'><img src='/wp-content/themes/lab/assets/images/playbook/hover_220.png' alt=''  class='wp-post-image' /></div></a>";
										            echo "<span>{$title}</span>"; 
										            echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' target='_blank'>Download ({$filetype})</a>";
										            echo "</div></li>";
										         }
										         $count = $count + 1;
												
									        }
						
									                                                           
									    }
									}                                           
								?> 
								</ul>
								<a href="#templates" class="arrow black"></a>
			                </section>
			            </div>
			        </div>
			        <!-- CONTENT_POSTERS_END -->

			        <div id="templates" class="ibm-band templates">
				        <div class="ibm-columns">
			                <section class="ibm-col-1-1">
			                	<h2>Templates</h2>
			                	<p>Diagrams and worksheets for facilitating work and tracking progress</p>
			                	<ul>
			                	<?php 
									if( class_exists('Dynamic_Featured_Image') ) {
									     global $dynamic_featured_image;
									     $featuredImages = $dynamic_featured_image->get_featured_images( $postId );

									    //Loop through the image to display your image

									    if( !is_null($featuredImages) ){

									        $links = array();
									        $count = 0;

									        foreach($featuredImages as $images){
									            $thumb = $images['thumb'];
									            $fullImage = $images['full'];
									            $title = $dynamic_featured_image -> get_image_title( $fullImage ); 
									           	$caption = $dynamic_featured_image -> get_image_caption( $fullImage );
									           	$filetype = substr($caption, -4, 4);
									           	if( $count > 3 && $count < 13 ){
													echo "<li><div class='template'>";
													if($filetype == '.pdf'){
														echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' target='_blank'><div style='background-image:url({$fullImage})'><img src='/wp-content/themes/lab/assets/images/playbook/hover_122.png' alt=''  class='wp-post-image' /></div></a>";
										            	echo "<span>{$title}</span>";
										            	echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' target='_blank'>Download ({$filetype})</a>";
													} else {
														echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' download='{$caption}'><div style='background-image:url({$fullImage})'><img src='/wp-content/themes/lab/assets/images/playbook/hover_122.png' alt=''  class='wp-post-image' /></div></a>";
										            	echo "<span>{$title}</span>";
										            	echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' download='{$caption}'>Download ({$filetype})</a>";
													}
										           echo "</div></li>";
										       	}

										        $count = $count + 1;
												
									        }
						
									                                                           
									    }
									}                                           
								?> 
			                	</ul>
			                	<a href="#references" class="arrow"></a>
			               	</section>
			            </div>
			        </div>

			        <div id="references" class="ibm-band references">
				        <div class="ibm-columns">
			                <section class="ibm-col-1-1">
			                	<h2>Design Thinking</h2>
			                	<p>Guidelines to the unique version of Design Thinking that works on an enterprise level</p>
			                	<ul class="group">
			                	<?php 
									if( class_exists('Dynamic_Featured_Image') ) {
									     global $dynamic_featured_image;
									     $featuredImages = $dynamic_featured_image->get_featured_images( $postId );

									    //Loop through the image to display your image

									    if( !is_null($featuredImages) ){

									        $links = array();
									        $count = 0;

									        foreach($featuredImages as $images){
									        	
									            $thumb = $images['thumb'];
									            $fullImage = $images['full'];
									            $title = $dynamic_featured_image -> get_image_title( $fullImage ); 
									           	$caption = $dynamic_featured_image -> get_image_caption( $fullImage );
									           	$filetype = substr($caption, -4, 4);
									           	if( $count >12){
													echo "<li><div class='reference'>";
										            echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' target='_blank'><div style='background-image:url({$fullImage})'><img src='/wp-content/themes/lab/assets/images/playbook/hover_218.png' alt=''  class='wp-post-image' /></div></a>";
										            echo "<span>{$title}</span>";
										            echo "<a href='/wp-content/themes/lab/assets/downloads/{$caption}' target='_blank'>Download ({$filetype})</a>";
										            echo "</div></li>";
									        	}
									        	$count = $count + 1;
												
									        }
										                                                           
									    }
									}                                           
								?> 
			                	</ul>
			                	
			               	</section>
			            </div>
			        </div>

		        </div>
		    </div>
		    <!-- CONTENT_BODY_END -->
		</div>                
	</section>
	<!-- CONTENT_END -->

</section>
<!-- Playbook_END -->



                    

<?php endwhile; ?>

<?php else: ?>

<!-- article -->
<article>

	<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

</article>
<!-- /article -->

<?php endif; ?>


<?php get_footer(); ?>