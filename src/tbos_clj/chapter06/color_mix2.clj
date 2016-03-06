(ns tbos-clj.chapter06.color-mix2
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  (q/no-loop)
  ; Turn off the border for the rectangle.
  (q/no-stroke))

(defn draw []
  (let [w    (float (q/width))
        h    (float (q/height))
        frag (q/load-shader "chapter06/color_mix2.frag")]
    ; Pass in the resolution of the sketch.
    (doto frag
      (.set "u_resolution" w h))
    ; Set the shaders
    (q/shader frag)
    ; Draw the rectangle that will employ the shader.
    (q/rect 0 0 w h)))

(q/defsketch color-mix2
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [600 600])

