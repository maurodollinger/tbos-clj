(ns tbos-clj.chapter07.exercise14
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  ; Turn off the border for the rectangle.
  (q/no-stroke))

(defn draw []
  (let [w    (float (q/width))
        h    (float (q/height))
        t    (float (/ (q/millis) 1000.0))
        frag (q/load-shader "chapter07/exercise16.frag")]
    ; Set the user-defined uniform.
    (doto frag
      (.set "u_time" t)
      (.set "u_resolution" w h))
    ; Set the shaders
    (q/shader frag)
    ; Draw the rectangle that will employ the shader.
    (q/rect 0 0 w h)))

(q/defsketch exercise14
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [600 600])
