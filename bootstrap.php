<?php
/**
 * Bootstrap the control.
 *
 * Addon control for the Kirki Toolkit for WordPress.
 * Adds a new colorpicker control to the WordPress Customizer,
 * allowing developers to build colorpickers that automatically suggest accessible link colors
 * depending on the value of a background color and the surrounding-text.
 *
 * @package    wcag-linkcolor
 * @category   Addon
 * @author     Ari Stathopoulos
 * @copyright  Copyright (c) 2019, Ari Stathopoulos
 * @license    https://opensource.org/licenses/MIT
 * @since      2.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'kirki_control_types',
	/**
	 * Registers the control with Kirki.
	 *
	 * @since 1.0
	 * @param array $controls An array of controls registered with the Kirki Framework.
	 * @return array
	 */
	function( $controls ) {
		require_once __DIR__ . '/src/Control/WCAGLinkColor.php';
		$controls['kirki-wcag-lc'] = '\WPLemon\Control\WCAGLinkColor';
		return $controls;
	}
);

add_action(
	'customize_register',
	/**
	 * Registers the control type and make it eligible for
	 * JS templating in the Customizer.
	 *
	 * @since 1.0
	 * @param WP_Customize $wp_customize The Customizer object.
	 * @return void
	 */
	function( $wp_customize ) {
		require_once __DIR__ . '/src/Control/WCAGLinkColor.php';
		$wp_customize->register_control_type( '\WPLemon\Control\WCAGLinkColor' );

		// Add class aliases for backwards compatibility.
		class_alias( '\WPLemon\Control\WCAGLinkColor', 'Kirki_WCAG_Link_Color' );
	},
	0
);

/**
 * Autoload Field for the Kirki v4.0 API.
 *
 * @since 2.0
 */
spl_autoload_register(
	/**
	 * Autoload the class.
	 *
	 * @param string $class The class-name.
	 */
	function( $class ) {
		if ( 'WPLemon\Field\WCAGLinkColor' === $class || '\WPLemon\Field\WCAGLinkColor' === $class ) {
			require_once __DIR__ . '/src/Field/WCAGLinkColor.php';
		}
		if ( 'WPLemon\Control\WCAGLinkColor' === $class || '\WPLemon\Control\WCAGLinkColor' === $class ) {
			require_once __DIR__ . '/src/Control/WCAGLinkColor.php';
		}
	},
	false,
	true
);
