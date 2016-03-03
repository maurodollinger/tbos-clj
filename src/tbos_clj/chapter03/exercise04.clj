(ns tbos-clj.chapter03.exercise04
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  ; Turn off the border for the rectangle.
  (q/no-stroke))

(defn draw []
  (let [w    (float (q/width))
        h    (float (q/height))
        x    (float (q/mouse-x))
        y    (float (q/mouse-y))
        t    (float (/ (q/millis) 1000.0))
        frag (q/load-shader "chapter03/exercise04.frag")]
    ; Set the user-defined uniform.
    (doto frag
      ; u_resolution is a vector of length 2.
      (.set "u_resolution" w h)
      (.set "u_time" t)
      (.set "u_mouse" x y))
    ; Set the shaders
    (q/shader frag)
    ; Draw the rectangle that will employ the shader.
    (q/rect 0 0 w h)))

(q/defsketch exercise04
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [600 600])

