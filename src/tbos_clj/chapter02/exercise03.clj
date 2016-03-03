(ns tbos-clj.chapter02.exercise03
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  (q/no-loop))

(defn draw []
  (let [w    (float (q/width))
        h    (float (q/height))
        ; The vertex shader is actually unnecessary as is does nothing
        ; and if omitted, Processing supplies a default one.
        frag-and-vert (q/load-shader "chapter02/exercise03.frag")]
    ; Set the shaders
    (q/shader frag-and-vert)
    ; Turn off the border for the rectangle
    (q/no-stroke)
    ; Draw the rectangle that will employ the shader
    (q/rect 0 0 w h)))

(q/defsketch exercise03
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [600 600])
