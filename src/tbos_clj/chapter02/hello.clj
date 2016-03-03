(ns tbos-clj.chapter02.hello
  (:require [quil.core :as q :include-macros true]))

(defn setup []
  (q/no-loop))

(defn draw []
  (let [w    (float (q/width))
        h    (float (q/height))
        ; The vertex shader is actually unnecessary as is does nothing
        ; and if omitted, Processing supplies a default one.
        frag-and-vert (q/load-shader "chapter02/hello.frag" "chapter02/hello.vert")]
    ; Set the shaders
    (q/shader frag-and-vert)
    ; Turn off the border for the rectangle
    (q/no-stroke)
    ; Draw the rectangle that will employ the shader
    (q/rect 0 0 w h)))

(q/defsketch hello
  :setup    setup
  :renderer :p3d
  :draw     draw
  :size     [600 600])
