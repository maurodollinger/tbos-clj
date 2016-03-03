(ns tbos-clj.chapter05.power
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  ; Turn off the border for the rectangle.
  (q/no-loop)
  (q/no-stroke))

(defn draw []
  (let [w    (float (q/width))
        h    (float (q/height))
        frag (q/load-shader "chapter05/power.frag")]
    ; Set the user-defined uniform.
    (doto frag
      ; u_resolution is a vector of length 2.
      (.set "u_resolution" w h))
    ; Set the shaders
    (q/shader frag)
    ; Draw the rectangle that will employ the shader.
    (q/rect 0 0 w h)))

(q/defsketch power
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [600 600])

